import { useState, useEffect } from "react"
type Price = number[]





function useGetSingleCrypto(id: string) {
    const [prices, setPrices] = useState<[Price] | []>([])
    const [loading, setLoading] = useState<boolean | null>(null)
    const [error, setError] = useState<string | null>(null)
    useEffect(()=>{
            
            async function getPrices(){
                try {
                    setLoading(true)
                    
                    const reponse = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=10&interval=daily`)
                    if(!reponse.ok){
                        throw new Error('An error occurred while fetching')
                    }
                    const data = await reponse.json()
    
                    setPrices(data.prices)
    
                } catch (error: any) {
                    setError(error.message)
                } finally{
                    setLoading(false)
                }
            }
            getPrices()
        }, [id])

        
    return (
        {prices, loading, error}
    )
}

export default useGetSingleCrypto