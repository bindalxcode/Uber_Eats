import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRestaurantDetails, addToCart } from '../api';

function RestaurantDetail() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    fetchRestaurantDetails();
  }, [id]);

  const fetchRestaurantDetails = async () => {
    try {
      const response = await getRestaurantDetails(id);
      setRestaurant(response.data);
    } catch (error) {
      console.error('Failed to fetch restaurant details:', error);
    }
  };

  const handleAddToCart = async (dishId) => {
    try {
      await addToCart(dishId, 1);
      alert('Added to cart!');
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  if (!restaurant) return <div>Loading...</div>;

  return (
    <div>
      <h2>{restaurant.name}</h2>
      <p>{restaurant.description}</p>
      <h3>Menu</h3>
      {restaurant.dishes.map(dish => (
        <div key={dish.id}>
          <h4>{dish.name}</h4>
          <p>{dish.description}</p>
          <p>Price: ${dish.price}</p>
          <button onClick={() => handleAddToCart(dish.id)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

export default RestaurantDetail;