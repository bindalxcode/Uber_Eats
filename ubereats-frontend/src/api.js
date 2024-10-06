import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Token ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const signup = (userData) => api.post('users/signup/', userData);
export const login = (credentials) => api.post('auth/login/', credentials);
export const getCustomerProfile = () => api.get('customers/me/');
export const updateCustomerProfile = (data) => api.put('customers/me/', data);
export const getRestaurantProfile = () => api.get('restaurants/me/');
export const updateRestaurantProfile = (data) => api.put('restaurants/me/', data);
export const getRestaurants = () => api.get('restaurants/');
export const getRestaurantDetails = (id) => api.get(`restaurants/${id}/`);
export const getDishes = (restaurantId) => api.get(`restaurants/${restaurantId}/dishes/`);
export const addDish = (data) => api.post('dishes/', data);
export const updateDish = (id, data) => api.put(`dishes/${id}/`, data);
export const getOrders = () => api.get('orders/');
export const updateOrderStatus = (id, status) => api.post(`orders/${id}/update_status/`, { status });
export const addToCart = (dishId, quantity) => api.post('cart/add_item/', { dish: dishId, quantity });
export const getCart = () => api.get('cart/');
export const updateCartItem = (itemId, quantity) => api.put(`cart/items/${itemId}/`, { quantity });
export const removeCartItem = (itemId) => api.delete(`cart/items/${itemId}/`);
export const placeOrder = (address) => api.post('orders/', { delivery_address: address });
export const getFavorites = () => api.get('favorites/');
export const addFavorite = (restaurantId) => api.post('favorites/', { restaurant: restaurantId });
export const removeFavorite = (id) => api.delete(`favorites/${id}/`);

export default api;
