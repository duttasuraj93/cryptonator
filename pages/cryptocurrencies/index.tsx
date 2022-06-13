import type { NextPage } from 'next'
import { useState, useEffect, useRef } from 'react'
import styles from '../../styles/Cryptocurrencies.module.css'
import Crypto from '../../components/Cryptocurrencies/Crypto'
import { CryptoType } from '../../types/cryptos'
import useInterval from '../../hooks/useInterval'
import { GetServerSideProps } from 'next'
import { useAppSelector } from '../../hooks/redux'
import { store } from '../../store'
import { cryptoCode } from '../../constants/cryptos'
import { cryptoHeaders } from '../../constants/cryptos'
import useOnScreen from '../../hooks/useOnScreen'

const Cryptocurrencies: NextPage<{ cryptos: CryptoType[] }> = ({ cryptos }) => {

    const [cryptocurrencies, setCryptocurrencies] = useState<CryptoType[]>(cryptos);
    const [isInWndow, setIsInWindow] = useState<boolean>(true)
    const cryptoslice = useAppSelector((state) => state.cryptoSlice)
    const cryptoElementRef = useRef<HTMLDivElement>(null);
    const isOnScreen = useOnScreen(cryptoElementRef);

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
        const response = await Promise.all(cryptoCode.map(item => fetch(`https://api.cryptonator.com/api/ticker/${item}-${cryptoslice.currency}`), {headers: cryptoHeaders}));

        let data = await Promise.all(response.map(res => res.json()))
        setCryptocurrencies(data)
    }

    useInterval(() => {
        if (isInWndow && isOnScreen) {
            getCryptoData()
        }

    }, 1000 * 500);

    return (
        <div>
            <div className={styles.wrapper}>
                <div ref={cryptoElementRef} className={styles.crypto__container}>
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

    const response = await Promise.all(cryptoCode.map(item => fetch(`https://api.cryptonator.com/api/ticker/${item}-${currency}`), {headers: cryptoHeaders}));

    let data = await Promise.all(response.map(res => res.json()))

    return {
        props: {
            cryptos: data,
        },
    }
}