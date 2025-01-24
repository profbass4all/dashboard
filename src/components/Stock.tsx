import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { Link } from 'react-router-dom'

// I couldn't complate this page because the api rate limit was too low for a day
const Stock = () => {
    const [stock, setStock] = useState([])
    const [loading, setLoading] = useState<boolean | null>(null)
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState('AA')
    const { darkMode } = useOutletContext<{darkMode: boolean}>()

    // https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbols}&apikey=${apikey}

    // https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=${apikey}
    useEffect(()=>{
        
        async function getStock(){
          const symbols = ['AAPL', 'MSFT', 'GOOGL']
          const apikey = 'D2D9CHMYQVN5UORO'
            try {
                setLoading(true)
                const reponse = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchTerm}&apikey=${apikey}`)
                if(!reponse.ok){
                    throw new Error('An error occurred while fetching')
                }
                const data = await reponse.json()
                console.log(data)
                setStock(data.bestMatches)

            } catch (error: any) {
                setError(error.message)
            } finally{
                setLoading(false)
            }
        }
        getStock()
    }, [])
    
    function handleSearch(e: React.ChangeEvent<HTMLInputElement>): void {
        setSearchTerm(e.target.value.trim());
    }
    
//     const formatter = new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'USD',
//     minimumFractionDigits: 2,
// });

    
    if(loading || !crypto){
        return <p>Loading...</p>
    }
    // if(error){
    //     return <p>Error: {error}</p>
    // }
    

return (
        <>
          
          {/* <input type='text' value={searchTerm}
          
            onChange={handleSearch}  
            placeholder='Search for cryptocurrency'
            className={`text-gray-900 mx-auto rounded-xl mb-8 w-full px-4 py-2 text-lg font-semibold outline-none 
            ${darkMode? 'bg-gray=50': 'bg-gray-300'}`}/>

            {
              stock.map((item, index) => {
                const values: any = Object.values(item[index])
                return <div>
                  {values}
                </div>
              })
            } */}

            <h1>The rate limiting of vantage API is too short such that the time is not enough for me to study their api</h1>
          
        </>
        
        )
}

export default Stock