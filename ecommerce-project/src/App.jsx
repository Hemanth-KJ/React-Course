import { useState, useEffect} from 'react';
import  axios  from 'axios';
import { Routes, Route } from 'react-router'
import { HomePage } from './pages/home/HomePage'
import { CheckoutPage } from './pages/checkout/CheckoutPage'
import './App.css'
import { OrdersPage } from './pages/orders/OrdersPage'
import { TrackingPage } from './pages/TrackingPage'


function App() {
   const [cart, setCart] =useState([]);
   useEffect(() =>{
    const fetchAppData = async ()=>{
    const response= await axios.get('/api/cart-items?expand=product')
     setCart(response.data);
    };
    
    fetchAppData();
},[]);
 
  return (
  <Routes>
    <Route index /*path="/"*/ element={<HomePage cart={cart} />} />
    <Route path="/checkout" element={<CheckoutPage  cart={cart}/>} />
    <Route path="/orders" element={<OrdersPage cart={cart}/>} />
    <Route path="/tracking" element={<TrackingPage/>} />
  </Routes>
  
  
  )
}

export default App
