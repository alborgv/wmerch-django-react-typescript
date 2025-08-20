import React from "react";

import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from 'pages/Home';
import Message from 'components/Payment/Message';
import Product from 'components/Payment/Product';
import Checkout from 'components/Payment/Checkout';
import Catalogo from 'pages/Catalogo';
import BuyProduct from 'pages/BuyProduct'; 
import TermsOfSale from 'pages/TermsOfSale';
import TermsInt from 'pages/TermsInt';
import TermsOfUse from 'pages/TermsOfUse';
import Contact from 'pages/Contact';
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/collections' element={<Catalogo />} />
            <Route path='/collections/:id' element={<BuyProduct />} />
            <Route path='/success' element={<Message />} />
            <Route path="/:product_id" element={<Product />} />
            <Route path="checkout/:prod_id" element={<Checkout />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/terms-of-sale' element={<TermsOfSale />} />
            <Route path='/international-shipping-terms-and-conditions' element={<TermsInt />} />
            <Route path='/terms-of-use' element={<TermsOfUse />} />
          </Routes>
      </BrowserRouter>
      <Toaster
        position='bottom-right'
        toastOptions={{
          duration: 5000,
          style: {
            background: "transparent",
            boxShadow: "none"
          }
        }}
      />
    </>
  )
}

export default App
