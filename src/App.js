
import './App.css'
import { BrowserRouter , Routes, Route } from 'react-router-dom'

function App() {
 

  return (
    <>
 <BrowserRouter>
 <Routes>
  <Route path='/' element={<div>Landing</div>} />
  <Route path='/address' element={<div>address</div>} />
 </Routes>
 </BrowserRouter>
    </>
  )
}

export default App
