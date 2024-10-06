import React from 'react';
import { Link, useNavigate} from 'react-router-dom';

function Navbar() {
  const history = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    history.push('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">UberEats</Link>
      <div className="navbar-nav">
        {isLoggedIn ? (
          <>
            <Link className="nav-item nav-link" to="/restaurants">Restaurants</Link>
            <Link className="nav-item nav-link" to="/cart">Cart</Link>
            <Link className="nav-item nav-link" to="/favorites">Favorites</Link>
            <button className="nav-item nav-link btn btn-link" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link className="nav-item nav-link" to="/customer-signup">Customer Signup</Link>
            <Link className="nav-item nav-link" to="/restaurant-signup">Restaurant Signup</Link>
            <Link className="nav-item nav-link" to="/login">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;