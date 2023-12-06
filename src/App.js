/* eslint-disable react/jsx-no-target-blank */

import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CatchAllRoute from './pages/Builder'
import Address from './pages/Address'
import Deals from './pages/Deals'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Gallery from './pages/Gallery'
import BrandStory from './pages/BrandStory'
import Login from './pages/Login'
import Register from './pages/Register'
import Highlights from './pages/Highlights'
function App() {
 

  return (
    <BrowserRouter>
    <Routes>
      {/* <Route path='/' element={<div>Landing</div>}/>
      <Route path='/' element={<div>Contact us</div>}/> */}

      <Route path='/address' element={<Address/>}/>
      <Route path='/' element={<CatchAllRoute/>}/>
      <Route path='/deals' element={<Deals/>}/>
      <Route path='/galleries' element={<Gallery/>}/>
      <Route path='/category/:cat/subcategory/:subcat' element={<Products />} />
      <Route path='/category/:cat/subcategory/:subcat/products/:productId' element={<ProductDetails />} />
      <Route path='/brandstory/:story' element={<BrandStory />} />   
      <Route path='/loginpage' element={<Login/>}/>  
      <Route path='/register-page' element={<Register/>}/>  
      <Route path='/highlight' element={<Highlights/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App

