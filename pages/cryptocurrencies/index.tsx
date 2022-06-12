import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import styles from '../../styles/Cryptocurrencies.module.css'
import Crypto from '../../components/Cryptocurrencies/Crypto'
import { CryptoType } from '../../types/cryptos'
import useInterval from '../../hooks/useInterval'
import { GetServerSideProps } from 'next'
import { useAppSelector, useAppDispatch } from '../../hooks/redux'
import { store } from '../../store'


const Cryptocurrencies: NextPage<{ cryptos: CryptoType[] }> = ({ cryptos }) => {

    const [cryptocurrencies, setCryptocurrencies] = useState<CryptoType[]>(cryptos);
    const [isInWndow, setIsInWindow] = useState<boolean>(true)
    const cryptoslice = useAppSelector((state) => state.cryptoSlice)

    useEffect(() => {
        const checkVisibility = () => {
            if (document.visibilityState === 'visible') {
                setIsInWindow(true)
            } else {
                setIsInWindow(false)
            }
        }

        document.addEventListener("visibilitychange", checkVisibility);

        return () => {
            document.removeEventListener('visibilitychange', checkVisibility);
        };

    }, [])

    const getCryptoData = async () => {
        const response = await fetch('http://localhost:3001/cryptos2')
        const data = await response.json()
        setCryptocurrencies(data)
    }

    useInterval(() => {
        if (isInWndow) {
            getCryptoData()
        }

    }, 1000 * 60);

    return (
        <div>
            <div className={styles.wrapper}>
                <div className={styles.crypto__container}>
                    {cryptocurrencies.map((item, index) => <Crypto key={index} data={item} currency={cryptoslice.currency} />)}
                </div>
            </div>
        </div>
    )
}

export default Cryptocurrencies


export const getServerSideProps: GetServerSideProps = async (context) => {
    const reduxState = store.getState()
    const currency = reduxState.cryptoSlice.currency
    const response = await fetch(`http://localhost:3001/cryptos-${currency}`)
    const data = await response.json()

    return {
        props: {
            cryptos: data,
        },
    }
}