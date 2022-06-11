export interface Ticker {
    base: string;
    target: string;
    price: string;
    volume: string;
    change: string;
}

export interface CryptoType {
    ticker: Ticker;
    timestamp: number;
    success: boolean;
    error: string;
}