import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CurrencyType } from '../../types/currencies'


interface CryptoSliceType {
    currency: CurrencyType
}

const initialState: CryptoSliceType = {
  currency: 'usd'
}

export const cryptoSlice = createSlice({
  name: 'CRYPTO',
  initialState: initialState,
  reducers: {
    setCurrency: (state: any, action: PayloadAction<CryptoSliceType>) => state = action.payload
  }
})


export const { setCurrency } = cryptoSlice.actions

export default cryptoSlice.reducer