import { useState } from "react"
import useGetSingleCrypto from '../hooks/useGetSingleCrypto'
import { Line } from "react-chartjs-2";

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

Chart.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);


interface OptionsTypes {
    optionA: string
    optionB: string
}
function Compare() {
    const [options, setOptions] = useState<OptionsTypes>({optionA: "dogecoin", optionB: "hedera-hashgraph"})
    const { prices: priceA } = useGetSingleCrypto(options.optionA|| 'dogecoin' )
    const { prices: priceB } = useGetSingleCrypto(options.optionB || 'hedera-hashgraph')
    
//this function sets the state of the options
    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
    
        setOptions(prev=>{

        return {...prev, [e.target.name]: e.target.value}
    
        })
    }


    return (
        <>

            <h1 className="text-bold text-2xl mb-4">Compare the trends of two crypto</h1>
        
            <p>Enter the Id's of two crypto currencies below as gotten from the dashboard</p>

            <div className="md:flex md:justify-start gap-4 my-6">
                <div className="">
                    <input className={`w-full outline-none pl-4 bg-slate-300 rounded-xl py-1 text-gray-600 font-bold tracking-4 text-base my-4`} type="text" onChange={handleChange} name="optionA"/>

                    <p className="font-bold">Option A: <span className="text-xl text-violet-300">{options.optionA}</span></p>

                </div>
                <div>

                    <input className={`w-full outline-none pl-4 bg-slate-300 rounded-xl py-1 text-gray-600 font-bold tracking-4 text-base my-4`} type="text" onChange={handleChange} name="optionB"/>

                    <p className="font-bold">Option B: <span className="text-xl text-violet-300">{options.optionB}</span></p>

                </div>
            </div>

            {
                <Line
                    data={{
                                    labels: priceA.map(price=>new Date(price[0]).toLocaleDateString()),
                                    datasets: [{
                                        label: `Price of ${options.optionA} in USD`,
                                        data: priceA.map(price=>price[1]),
                                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                        borderColor: 'rgba(75, 192, 192, 1)',
                                        borderWidth: 1,
                                    },
                                    {
                                        label: `Price of ${options.optionB} in USD`,
                                        data: priceB.map(price=>price[1]),
                                        backgroundColor: 'rgba(76, 230, 14, 0.2)',
                                        borderColor: 'rgb(207, 38, 142)',
                                        borderWidth: 1,
                                    }
                                    ],
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
    </>  
)}

export default Compare