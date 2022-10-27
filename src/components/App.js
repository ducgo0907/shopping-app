import '../App.css';
import './custom.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './Header';
import Home from '../pages/Home';
import NewProduct from '../pages/NewProduct';
import EditProduct from '../pages/EditProduct';
import ShowProduct from '../pages/ShowProduct';
import ShowProfile from '../pages/ShowProfile';
import Cart from './Cart';

function App() {


  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/new' element={<NewProduct />}/>
          <Route path='/edit' element={<EditProduct />} />
          <Route path='products/show/:productId' element={<ShowProduct/>} />
          <Route path='/user/:userId' element={<ShowProfile />} />
          <Route path='/cart' element={<Cart />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
