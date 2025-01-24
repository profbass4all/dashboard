import { useParams, useNavigate, replace } from "react-router-dom"
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

Chart.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);


function CryptoSingle() {
    const { id } = useParams()
    const navigate = useNavigate()
    if(!id){
        return <p>Invalid id</p>
    }
const {prices, loading, error} = useGetSingleCrypto(id)
    
if(loading || prices.length == 0){
        return <p>Loading...</p>
    }

    if(error){
        return <p>Error: {error}</p>
    }
        

    return (
        <div>
            <NavLink to={'/'} className='text-3xl bg-violet-900 px-4 pb-2 pt-2 rounded-2xl'><IoReturnUpBack className="text-gray-900 font-bold inline" />...Back to all crypto</NavLink>

            { <h1 className="mt-4 text-center font-bold text-3xl">{id.toUpperCase()}</h1> }
            
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