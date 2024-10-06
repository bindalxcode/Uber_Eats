import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCart, updateCartItem, removeCartItem } from '../api';

function Cart() {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await getCart();
      setCart(response.data);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    }
  };

  const handleUpdateQuantity = async (itemId, quantity) => {
    try {
      await updateCartItem(itemId, quantity);
      fetchCart();
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await removeCartItem(itemId);
      fetchCart();
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  if (!cart) return <div>Loading...</div>;

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.items.map(item => (
        <div key={item.id}>
          <h3>{item.dish.name}</h3>
          <p>Price: ${item.dish.price}</p>
          <input 
            type="number" 
            value={item.quantity} 
            onChange={(e) => handleUpdateQuantity(item.id, e.target.value)} 
            min="1" 
          />
          <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
        </div>
      ))}
      <p>Total: ${cart.total}</p>
      <Link to="/checkout">Proceed to Checkout</Link>
    </div>
  );
}

export default Cart;