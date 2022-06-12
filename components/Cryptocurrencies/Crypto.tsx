import React from "react";
import { cryptos } from "../../constants/cryptos"
import { CryptoType } from "../../types/cryptos";


const Crypto: React.FC<{ data: CryptoType }> = ({ data }) => {


    const name = data.ticker.base.toLowerCase()
    const { price, volume, change } = data.ticker
    let currencySymbol = '$'

    return (
        <div className='crypto'>
            <h2 className='name'>{cryptos[name]}</h2>
            <div>
                <h4 className='price'>{currencySymbol}{price}</h4>
                <div className='volume-change'>
                    <div className='volume__container'>
                        <h5 className='title'>volume:</h5>
                        <h5 className='volume'>{volume}</h5>
                    </div>
                    <div className='change__container'>
                        <h5 className='title'>change:</h5>
                        <h5 className={`change ${parseInt(change) < 0 ? 'loss' : 'gain'}`}>{change}</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Crypto