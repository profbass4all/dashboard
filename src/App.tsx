
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '../src/components/BodyLayout'
import Crypto from './components/Crypto'
import Compare from './components/Compare'
import CryptoSingle from './components/CryptoSingle'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Crypto />} />
          <Route path='compare' element={<Compare />} />
          <Route path='crypto/:id' element={<CryptoSingle />} />

        </Route>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
