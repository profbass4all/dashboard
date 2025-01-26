import { useState } from 'react'
import PaginationButton from './PaginationButton'
import usePagination from '../hooks/usePagination'
import { useOutletContext } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { CryptoProps } from '../types'


const Crypto = () => {
    
    const [searchTerm, setSearchTerm] = useState('')
    const { darkMode, crypto, loading, error} = useOutletContext<CryptoProps>()
    
    function handleSearch(e: React.ChangeEvent<HTMLInputElement>): void {
        setSearchTerm(e.target.value.trim());
    }

    //this function search for the searched crypto
    const foundCrypto = crypto.filter(crypto => {
        return crypto.name.toLowerCase().includes(searchTerm.toLowerCase())
    })
    const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
});

const {
        handlePrev,
        handleNext,
        paginatedPages,
        NumberOfPages,
        pageNumber,
    } = usePagination(foundCrypto || crypto)
    
    if(loading || !crypto){
        return <p>Loading...</p>
    }
    if(error){
        return <p>Error: {error}</p>
    }
    

return (
        <main className='flex-grow'>
        <input type='text' value={searchTerm} onChange={handleSearch}  
            placeholder='Search for cryptocurrency'
            className={`text-gray-900 md:w-2/5 mx-auto rounded-xl mb-8 w-full px-4 py-2 text-lg font-semibold outline-none 
            ${darkMode? 'bg-gray=50': 'bg-gray-300'}`}/>
        
        <div className="overflow-x-auto overflow-y-auto">


            <table className="table-auto whitespace-nowrap w-full h-full">
                <thead>
                    <tr>
                        <th className='pr-4'>Market Cap Rank</th>
                        <th className='py-4'>Image</th>
                        <th className='pr-4 py-4'>Name</th>
                        <th className='pr-4 py-4'>Symbol</th>
                        <th className='pr-4 py-4'>Id</th>
                        <th className='pr-4 py-4'>Current Price</th>
                        <th className='pr-4 py-4'>Price Change 24h</th>
                        <th className='pr-4 py-4'>Market Cap</th>
                        <th className='pr-4 py-4'>Total Volume</th>
                        <th className='pr-4 py-4'>ATH</th>
                        <th className='pr-4 py-4'>High 24h</th>
                        <th className='pr-4 py-4'>Low 24h</th>
                        <th className='pr-4 py-4'>ATL</th>
                    </tr>
                </thead>
                <tbody>
                {paginatedPages.map((coin) => {
                return (
                        <tr key={coin.id} className='hover:bg-violet-400 hover:rounded'>
                            <td className='text-center font-bold'>{coin.market_cap_rank}</td>
                            <td className=''>
                                    <Link to={`crypto/${coin.id}`}>
                                        <img src={coin.image} alt={coin.name} className="w-4 h-4" />
                                    </Link>
                            </td>
                            <td className='py-4 pr-4'>
                                <Link to={`crypto/${coin.id}`}>
                                    {coin.name}
                                </Link>
                            </td>
                            <td className='py-4 pr-4'>
                                <Link to={`crypto/${coin.id}`}>{coin.symbol}</Link>
                            </td>
                            <td className='py-4 pr-4'>
                                <Link to={`crypto/${coin.id}`}>{coin.id}</Link>
                            </td>
                            <td className='py-4 pr-4'><Link to={`crypto/${coin.id}`}>{formatter.format(coin.current_price)}</Link></td>
                            <td className={`py-4 pr-4 ${coin.price_change_percentage_24h > 0 ? 'text-green-400': coin.price_change_percentage_24h < 0 ? 'text-red-400': ''}`}><Link to={`crypto/${coin.id}`}>{coin.price_change_percentage_24h.toFixed(2)}%</Link></td>
                            <td className='py-4 pr-4'><Link to={`crypto/${coin.id}`}>{formatter.format(coin.market_cap)}</Link></td>
                            <td className='py-4 pr-4'><Link to={`crypto/${coin.id}`}>{formatter.format(coin.total_volume)}</Link></td>
                            <td className='py-4 pr-4'><Link to={`crypto/${coin.id}`}>{formatter.format(coin.ath)}</Link></td>
                            <td className='py-4 pr-4'><Link to={`crypto/${coin.id}`}>{formatter.format(coin.high_24h)}</Link></td>
                            <td className='py-4 pr-4'><Link to={`crypto/${coin.id}`}>{formatter.format(coin.low_24h)}</Link></td>
                            <td className='py-4 pr-4'><Link to={`crypto/${coin.id}`}>{formatter.format(coin.atl)}</Link></td>
                        </tr>
                )})}
                </tbody>
            </table>
                

            </div>

            <PaginationButton  
                    handlePrev={handlePrev}
                    handleNext={handleNext}
                    NumberOfPages={NumberOfPages}
                    pageNumber={pageNumber}
                    />
            </main>
        )
}

export default Crypto