import React, { useState } from 'react';
import { placeOrder } from '../api';

function Checkout() {
  const [address, setAddress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await placeOrder(address);
      alert('Order placed successfully!');
      // Redirect or clear cart as needed
    } catch (error) {
      console.error('Failed to place order:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea 
        value={address} 
        onChange={(e) => setAddress(e.target.value)} 
        placeholder="Delivery Address" 
        required 
        className="form-control mb-3"
      />
      <button type="submit" className="btn btn-primary">Place Order</button>
    </form>
  );
}

export default Checkout;