import { ReactNode } from "react";

export interface HeaderChildren {
    children: ReactNode;
}

export interface PaginateButtonType {
    handlePrev: ()=> void
    handleNext: ()=> void
    NumberOfPages: number
    pageNumber: number
}

export interface Crypt {
    name: string
    symbol: string
    current_price: number
    price_change_percentage_24h: number
    market_cap: number
    total_volume: number
    ath: number
    id: string
    image: string
    market_cap_rank: number
    high_24h: number
    low_24h: number
    atl: number
}

export interface CryptoProps {
    darkMode: boolean 
    crypto: Crypt[]  
    loading: boolean | null
    error: string | null
}