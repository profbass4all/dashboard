import Header from "./Header"
import Footer from "./Footer"
import { Outlet, NavLink } from "react-router-dom"
import { useState, useEffect } from "react"
import {Crypt} from '../types'
import { MdDarkMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";

function HeaderLayout() {
    const [darkMode, setDarkMode] = useState<boolean>(false)
    const [crypto, setCrypto] = useState<Crypt[] >([])
    const [loading, setLoading] = useState<boolean | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(()=>{
            
            async function getCrypto(){
                try {
                    setLoading(true)
                    const reponse = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd')

                    if(!reponse.ok){
                        throw new Error('An error occurred while fetching')
                    }
                    const data = await reponse.json()
    
                    setCrypto(data)
    
                } catch (error: any) {
                    setError(error.message)
                } finally{
                    setLoading(false)
                }
            }
            getCrypto()
        }, [])

    const handleDarkMode: ()=> void = () => {
        setDarkMode(!darkMode)
    }

    const backgroundColor = darkMode? 'bg-gray-800': 'bg-gray-50'
    const fontColor = darkMode? 'text-gray-200': 'text-zinc-950'
    
    const activeStyles ={
        backgroundColor: '#a78bfa'
    }
    const nonActiveStyles = {
        backgroundColor: ''
    }
    return (
    <>
        <div className={`${backgroundColor} ${fontColor} min-h-screen flex flex-col md:mx-auto`}>

            <div className="w-11/12 h-full mx-auto">

                    <Header>
                    <nav className="h-24 flex items-center justify-between md:justify-start md:gap-6 text-base font-bold">

                        <NavLink to="." style={({ isActive }) => isActive? activeStyles: nonActiveStyles } className={`${'hover:bg-violet-400 rounded-xl px-2 py-1' }`}>Crypto</NavLink>

                        <NavLink to="compare" style={({ isActive }) => isActive? activeStyles: nonActiveStyles } className={`${'hover:bg-violet-400 rounded-xl px-2 py-1' }`}>Compare</NavLink>
            {/* //toggling the mode to either dark or light */}
                        {   darkMode? 
                                <MdOutlineDarkMode onClick={handleDarkMode} className="text-2xl"/>:
                                <MdDarkMode onClick={handleDarkMode} className="text-2xl" />
                        }
                
                    </nav>

                </Header>


                { <Outlet context={{darkMode, crypto, loading, error}}/> }


                
            </div>
            
            <Footer />

        </div>
    </>
    )
}

export default HeaderLayout