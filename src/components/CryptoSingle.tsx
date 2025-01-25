import { useParams } from "react-router-dom"
import { Line } from "react-chartjs-2";
import useGetSingleCrypto from '../hooks/useGetSingleCrypto'
import { IoReturnUpBack } from "react-icons/io5";


import {
    Chart,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    CategoryScale
} from 'chart.js';
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useOutletContext } from 'react-router-dom'
import { CryptoProps } from "../types";


Chart.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

interface CurrencyType {
    [key: string]: number
}

interface LoadingAndErrorType {
    loading: boolean
    error: string | null;
}
function CryptoSingle() {
    const { id } = useParams()
    const [currencies, setCurrency] = useState<CurrencyType>({'USD': 1})
    const [loadingAndError, setLoadingAndError] = useState<LoadingAndErrorType>({
        loading: false,
        error: null,
    })
    const [amount, setAmount] = useState<number>(1)
    if(!id){
        return <p>Invalid id</p>
    }
const {prices, loading, error} = useGetSingleCrypto(id)
const { darkMode, crypto} = useOutletContext<CryptoProps>()
const [searchCurrency, setSearchCurrency] = useState<string>('')
const [chosenCurrency, setChosenCurrency] = useState('')
const [currentPrice, setCurrentPrice] = useState<null | number>(null)
const [convertedPrice, setConvertedPrice] = useState<number>(0)

useEffect(() => {
        handleConvert();
    }, [chosenCurrency, amount]);

const apiKey ='6fc2d21e3a1730a2fa7ee699'
useEffect(()=>{
    async function getCurrency(){
        try {
            setLoadingAndError(prev =>(
                {...prev, loading: true}
            ))
            const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`)

            if(!response.ok){
                throw new Error('An error occurred while fetching')
            }
            const data = await response.json()
            console.log('new',data.conversion_rates)
            setCurrency(data.conversion_rates)
        } catch (error: any) {
            setLoadingAndError(prev => (
                {...prev, error: error.message}
            ))
        }finally{
            setLoadingAndError(prev => (
                {...prev, loading: false}
            ))
        }
    }
    getCurrency()
}, [])
    function handleAmount(e: React.ChangeEvent<HTMLInputElement>){
        setAmount(Number(e.target.value))
    }
    function handleCurrencySearch (e: React.ChangeEvent<HTMLInputElement>){
        setSearchCurrency(e.target.value)
    }

    function filterCurrencies(){
        return Object.keys(currencies).filter(key=>{
            return key.toLowerCase().includes(searchCurrency.toLowerCase())
        })
    }
    const filteredCurrencies = filterCurrencies()

    function handleCurrencySearchOutput(e: React.MouseEvent<HTMLParagraphElement>){
        setChosenCurrency(e.currentTarget.id)
        const actualCrypto = crypto.find(crypto => crypto.id === id)
        if(!actualCrypto) return
        setCurrentPrice(actualCrypto.current_price)
    }
    console.log(currentPrice)

    function handleConvert(){
        if(!currentPrice) return
        setConvertedPrice((amount * currentPrice * currencies[chosenCurrency]))
    }
    const filtrationOfCurrencies = filteredCurrencies.map(currencies =>{
        return <p className="py-2 font-500 hover:text-blue-600 hover:underline cursor-pointer transition-all duration-200" key={`${currencies}`} onClick={handleCurrencySearchOutput} id={`${currencies}`}>{currencies}</p>
    })


    function handleClear(){
        setChosenCurrency('')
    }
    if(loading || prices.length == 0){
        return <p>Loading...</p>
        }

    if(error){
        return <p>Error: {error}</p>
        }

    return (
        <div>
            <NavLink to={'/'} className='md:text-3xl px-4 pb-2 pt-2 rounded-2xl'><IoReturnUpBack className="font-bold inline" /> Back to all crypto</NavLink>

            { <h1 className="mt-4 text-center font-bold text-3xl">{id.toUpperCase()}</h1> }
            <section>
                <div className="w-full md:w-3/5 font-bold">        
                    <input type="number" className={`w-2/5 mt-6 remove-arrow ${darkMode? 'bg-gray-800': 'bg-gray-50'} outline-none  pl-4 pt-2 pb-2 text-2xl border-t-2 border-l-2 border-b-2 border-indigo-900 rounded-tl-md rounded-bl-md`} onChange={handleAmount} value={amount}/>


                    <span className={`text-2xl ${darkMode? 'bg-gray-800': 'bg-gray-50'} border-t-2 border-r-2 border-b-2 w-2/5 pl-2 border-indigo-900 font-semibold pt-2 pr-2 pb-2 ml-0 rounded-tr-md rounded-br-md`}>{id.toUpperCase()}</span>
                </div>
                <div className="w-full md:w-3/5 font-bold">

                    <input type="text" onChange={handleCurrencySearch} value={chosenCurrency? chosenCurrency: searchCurrency}  placeholder="Enter a currency"  className={`w-96 mt-6  ${darkMode? 'bg-gray-800': 'bg-gray-50'} outline-none  pl-4 pt-2 pb-2 text-2xl border-2 border-b-2 border-indigo-900 rounded-md`} />

                    {chosenCurrency && <span className= {`${darkMode? 'bg-gray-800': 'bg-gray-50'} px-4 md:ml-2 border-indigo-900 border-b-4  py-2 block md:inline mt-4 `}> {chosenCurrency } {convertedPrice? new Intl.NumberFormat('en-US').format(convertedPrice): '' }</span>}

                    {chosenCurrency && <button className="px-4 py-2 bg-red-500 rounded-xl block mt-4" onClick={handleClear}>clear filter</button>}
                    {
                        searchCurrency && filtrationOfCurrencies
                    }
                    
                </div>
            </section>
            {  
                    <Line
                        data={{
                            labels: prices.map(price=>new Date(price[0]).toLocaleDateString()),
                            datasets: [{
                                label: 'Price in USD',
                                data: prices.map(price=>price[1]),
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                borderColor: 'rgba(75, 192, 192, 1)',
                                borderWidth: 1,
                            }],
                        }}
                        options={{
                            elements:{
                                line: {
                                    tension: 0.5, 
                                },
                            },
                            plugins:{
                                title: {
                                    display: true,
                                    text: 'Crypto Price Over Time'
                                },
                            },
                            responsive: true,
                            scales: {
                                y: {
                                    beginAtZero: true,
                                },
                            },
                        }}
                    />
                
            }
        </div>
    )
}

export default CryptoSingle