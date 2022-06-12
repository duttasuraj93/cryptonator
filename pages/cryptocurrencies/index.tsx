import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import styles from '../../styles/Cryptocurrencies.module.css'
import Crypto from '../../components/Cryptocurrencies/Crypto'
import { CryptoType } from '../../types/cryptos'
import { CurrencyType } from '../../types/currencies'
import useInterval from '../../hooks/useInterval'
import { GetServerSideProps } from 'next'


const Cryptocurrencies: NextPage<{ cryptos: CryptoType[] }> = ({ cryptos }) => {

    const [cryptocurrencies, setCryptocurrencies] = useState<CryptoType[]>(cryptos);
    const [currency, setCurrency] = useState<CurrencyType>('usd');
    const [isInWndow, setIsInWindow] = useState<boolean>(true)

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
        <div className={styles.wrapper}>
            <div className={styles.crypto__container}>
                {cryptocurrencies.map((item, index) => <Crypto key={index} data={item} currency={currency} />)}
            </div>
        </div>
    )
}

export default Cryptocurrencies


export const getServerSideProps: GetServerSideProps = async (context) => {
    const response = await fetch('http://localhost:3001/cryptos')
    const data = await response.json()

    return {
        props: {
            cryptos: data,
        },
    }
}