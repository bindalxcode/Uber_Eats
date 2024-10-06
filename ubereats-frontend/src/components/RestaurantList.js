import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRestaurants } from '../api';

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await getRestaurants();
      setRestaurants(response.data);
    } catch (error) {
      console.error('Failed to fetch restaurants:', error);
    }
  };

  return (
    <div>
      <h2>Restaurants</h2>
      {restaurants.map(restaurant => (
        <div key={restaurant.id}>
          <Link to={`/restaurant/${restaurant.id}`}>
            <h3>{restaurant.name}</h3>
          </Link>
          <p>{restaurant.description}</p>
        </div>
      ))}
    </div>
  );
}

export default RestaurantList;