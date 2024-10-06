import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFavorites, removeFavorite } from '../api';

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const response = await getFavorites();
      setFavorites(response.data);
    } catch (error) {
      console.error('Failed to fetch favorites:', error);
    }
  };

  const handleRemoveFavorite = async (id) => {
    try {
      await removeFavorite(id);
      fetchFavorites();
    } catch (error) {
      console.error('Failed to remove favorite:', error);
    }
  };

  return (
    <div>
      <h2>Favorite Restaurants</h2>
      {favorites.map(favorite => (
        <div key={favorite.id}>
          <Link to={`/restaurant/${favorite.restaurant.id}`}>
            <h3>{favorite.restaurant.name}</h3>
          </Link>
          <button onClick={() => handleRemoveFavorite(favorite.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}

export default Favorites;