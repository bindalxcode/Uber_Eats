import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import CustomerSignup from './components/CustomerSignup';
import RestaurantSignup from './components/RestaurantSignup';
import Login from './components/Login';
import CustomerDashboard from './components/CustomerDashboard';
import RestaurantDashboard from './components/RestaurantDashboard';
import RestaurantList from './components/RestaurantList';
import RestaurantDetail from './components/RestaurantDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Favorites from './components/Favorites';
import PrivateRoute from './components/PrivateRoute'; // Ensure this path is correct

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/customer-signup" element={<CustomerSignup />} />
            <Route path="/restaurant-signup" element={<RestaurantSignup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/customer-dashboard" element={<PrivateRoute><CustomerDashboard /></PrivateRoute>} />
            <Route path="/restaurant-dashboard" element={<PrivateRoute><RestaurantDashboard /></PrivateRoute>} />
            <Route path="/restaurants" element={<RestaurantList />} />
            <Route path="/restaurant/:id" element={<RestaurantDetail />} />
            <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
            <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
            <Route path="/favorites" element={<PrivateRoute><Favorites /></PrivateRoute>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;