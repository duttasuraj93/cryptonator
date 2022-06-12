import React from "react";
import styles from '../../styles/Crypto.module.css'
import { cryptos } from "../../constants/cryptos"
import { CryptoType } from "../../types/cryptos";
import { currencySymbols } from "../../constants/currencySymbols";
import { useAppSelector } from "../../hooks/redux";


const Crypto: React.FC<{ data: CryptoType, currency: string }> = ({ data, currency }) => {

    const cryptoslice = useAppSelector((state) => state.cryptoSlice)
    const name = data.ticker.base.toLowerCase()
    const { price, volume, change } = data.ticker
    let currencySymbol = currencySymbols[cryptoslice.currency]

    return (
        <div className={styles.crypto}>
            <h2 className={styles.name}>{cryptos[name]}</h2>
            <div>
                <h4 className={styles.price}>{currencySymbol}{price}</h4>
                <div className={styles.volume_change}>
                    <div className={styles.volume__container}>
                        <h5 className={styles.volume__title}>volume:</h5>
                        <h5 className={styles.volume}>{volume}</h5>
                    </div>
                    <div className={styles.change__container}>
                        <h5 className={styles.change__title}>change:</h5>
                        <h5 className={`${parseFloat(change) < 0 ? styles.loss : styles.gain}`}>{change}</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Crypto