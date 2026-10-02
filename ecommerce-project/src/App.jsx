import { useState, useEffect} from 'react';
import  axios  from 'axios';
import { Routes, Route } from 'react-router'
import { HomePage } from './pages/home/HomePage'
import { CheckoutPage } from './pages/checkout/CheckoutPage'
import './App.css'
import { OrdersPage } from './pages/orders/OrdersPage'
import { TrackingPage } from './pages/tracking/TrackingPage'


function App() {
   const [cart, setCart] =useState([]);
    
   const loadCart = async ()=>{
    const response= await axios.get('/api/cart-items?expand=product')
     setCart(response.data);
    };

   useEffect(() => {
    let cancelled = false;

    axios.get('/api/cart-items?expand=product').then(response => {
      if (!cancelled) {
        setCart(response.data);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);
 
  return (
  <Routes>
    <Route index /*path="/"*/ element={<HomePage cart={cart} loadCart={loadCart}/>} />
    <Route path="/checkout" element={<CheckoutPage  cart={cart}/>} />
    <Route path="/orders" element={<OrdersPage cart={cart}/>} />
    <Route path="/tracking" element={<TrackingPage cart={cart} />} />
  </Routes>
  
  
  )
}

export default App
