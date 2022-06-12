import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Cryptocurrencies from '../../pages/cryptocurrencies'
import { Provider } from 'react-redux'
import { store } from '../../store'
const cryptoData = require('../../db.json'); 

describe('Cryptocurrencies', () => {
    it('renders crypto page', async () => {
        
        render(
            <Provider store={store}>
                <Cryptocurrencies cryptos={cryptoData.cryptos} />
            </Provider>
        )

        const bitcoin = await screen.findByText('Bitcoin')
        expect(bitcoin).toBeInTheDocument()

        const dogecoin = await screen.findByText('Dogecoin')
        expect(dogecoin).toBeInTheDocument()

        const ether = await screen.findByText('Ether')
        expect(ether).toBeInTheDocument()

    })
})