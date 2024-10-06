import React, { useState, useEffect } from 'react';
import { getRestaurantProfile, updateRestaurantProfile, getDishes, addDish, updateDish, getOrders, updateOrderStatus } from '../api';

function RestaurantDashboard() {
  const [profile, setProfile] = useState(null);
  const [dishes, setDishes] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newDish, setNewDish] = useState({ name: '', description: '', price: '', category: '' });

  useEffect(() => {
    fetchProfile();
    fetchDishes();
    fetchOrders();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await getRestaurantProfile();
      setProfile(response.data);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await updateRestaurantProfile(profile);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const fetchDishes = async () => {
    try {
      const response = await getDishes();
      setDishes(response.data);
    } catch (error) {
      console.error('Failed to fetch dishes:', error);
    }
  };

  const handleAddDish = async (e) => {
    e.preventDefault();
    try {
      await addDish(newDish);
      setNewDish({ name: '', description: '', price: '', category: '' });
      fetchDishes();
    } catch (error) {
      console.error('Failed to add dish:', error);
    }
  };

  const handleUpdateDish = async (id, updatedDish) => {
    try {
      await updateDish(id, updatedDish);
      fetchDishes();
    } catch (error) {
      console.error('Failed to update dish:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await getOrders();
      setOrders(response.data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  };

  const handleUpdateOrderStatus = async (id, status) => {
    try {
      await updateOrderStatus(id, status);
      fetchOrders();
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <h2>Restaurant Dashboard</h2>
      
      {/* Profile Section */}
      <form onSubmit={handleUpdateProfile}>
        <h3>Profile</h3>
        <input type="text" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} placeholder="Name" />
        <textarea value={profile.description} onChange={(e) => setProfile({ ...profile, description: e.target.value })} placeholder="Description" />
        <input type="text" value={profile.location} onChange={(e) => setProfile({ ...profile, location: e.target.value })} placeholder="Location" />
        <input type="text" value={profile.timings} onChange={(e) => setProfile({ ...profile, timings: e.target.value })} placeholder="Timings" />
        <button type="submit">Update Profile</button>
      </form>

      {/* Dishes Section */}
      <div>
        <h3>Dishes</h3>
        {dishes.map(dish => (
          <div key={dish.id}>
            <input type="text" value={dish.name} onChange={(e) => handleUpdateDish(dish.id, { ...dish, name: e.target.value })} />
            <button onClick={() => handleUpdateDish(dish.id)}>Update</button>
          </div>
        ))}
        <form onSubmit={handleAddDish}>
          <input type="text" value={newDish.name} onChange={(e) => setNewDish({ ...newDish, name: e.target.value })} placeholder="New Dish Name" />
          <textarea value={newDish.description} onChange={(e) => setNewDish({ ...newDish, description: e.target.value })} placeholder="Description" />
          <input type="number" value={newDish.price} onChange={(e) => setNewDish({ ...newDish, price: e.target.value })} placeholder="Price" />
          <input type="text" value={newDish.category} onChange={(e) => setNewDish({ ...newDish, category: e.target.value })} placeholder="Category" />
          <button type="submit">Add Dish</button>
        </form>
      </div>

      {/* Orders Section */}
      <div>
        <h3>Orders</h3>
        {orders.map(order => (
          <div key={order.id}>
            <p>Order #{order.id}: {order.status}</p>
            <button onClick={() => handleUpdateOrderStatus(order.id, 'preparing')}>Preparing</button>
            <button onClick={() => handleUpdateOrderStatus(order.id, 'delivered')}>Delivered</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RestaurantDashboard;