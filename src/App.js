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
import Home from './pages/Home'
import Campaign from './pages/Campaigns'
import DealsDetails from './pages/DealsDetails'
import BrandStoryDetails from './pages/BrandStoryDetails'
import HighlightDetails from './pages/HighlightDetails'
import CampaignDetails from './pages/CampaignDetails'
import Events from './pages/Events'
import Categories from './pages/Categories'
function App() {
 

  return (
    <BrowserRouter>
    <Routes>
    

      <Route path='/:brandName/address/:addressId' element={<Address/>}/>
      <Route path='/:brandName' element={<Home/>}/>
      <Route path='/event/:eventId' element={<Events/>}/>
      <Route path='/:brandName/deals' element={<Deals/>}/>
      <Route path='/:brandName/galleries' element={<Gallery/>}/>
      <Route path='/:brandName/category/:cat/subcategory/:subcat' element={<Products />} />
      <Route path='/:brandName/category/:cat/subcategory/:subcat/products/:productId' element={<ProductDetails />} />
      <Route path='/:brandName/cat/:cat' element={<Categories />} />
      <Route path='/:brandName/brandstory/:story' element={<BrandStory />} />   
      <Route path='/loginpage' element={<Login/>}/>  
      <Route path='/register-page' element={<Register/>}/>  
      <Route path='/:brandName/highlight' element={<Highlights/>} />
      <Route path='/:brandName/campaigns/:campaign' element={<Campaign/>} />
      <Route path='/:brandName/campaigns/:campaign/selectedcampaign/:campaignId' element={<CampaignDetails/>} />
      <Route path='/:brandName/deals/:dealId' element={<DealsDetails/>} />
      <Route path='/:brandName/highlights/:highlightId' element={<HighlightDetails/>} />
      <Route path='/:brandName/brandstory/:story/:storyId' element={<BrandStoryDetails/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App

