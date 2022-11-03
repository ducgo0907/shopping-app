import '../App.css';
import './custom.css'
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './Header';
import Home from '../pages/Home';
import NewProduct from '../pages/NewProduct';
import EditProduct from '../pages/EditProduct';
import ShowProduct from '../pages/ShowProduct';
import ShowProfile from '../pages/ShowProfile';
import Cart from './Cart';
import axios from 'axios';
import ListShop from '../pages/ListShop';
import NewShop from '../pages/NewShop';
import ShowShop from '../pages/ShowShop';

function App() {
  const [products, setProducts] = useState([])


  const searchProduct = (event, key) => {
    event.preventDefault();
    let authen_token = JSON.parse(localStorage.getItem("authen_token")).auth_token
    axios.get("http://localhost:3000/search", { params: { key: key }, headers: { Authorization: authen_token } })
      .then(response => {
        console.log(response.data)
        setProducts(response.data)
      })
  }

  return (
    <>
      <Router>
        <Header searchProduct={searchProduct} />
        <Routes>
          <Route path='/' element={<Home searchProducts={products} />} />
          <Route path='/new' element={<NewProduct />} />
          <Route path='/edit' element={<EditProduct />} />
          <Route path='products/show/:productId' element={<ShowProduct />} />
          <Route path='/user/:userId' element={<ShowProfile />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/shops/' element={<ListShop />} />
          <Route path='/shops/create' element={<NewShop />} />
          <Route path="/shops/:shopId" element={<ShowShop />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
