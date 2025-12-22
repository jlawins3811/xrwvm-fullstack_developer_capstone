import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div style={{ margin: '2rem' }}>
    <h1>Welcome to the Car Dealerships Portal</h1>
    <nav>
      <Link to="/">Home</Link> | <Link to="/dealers">Dealers</Link> | <Link to="/login">Login</Link>
    </nav>
    <p>Find Trusted Car Dealerships Near You</p>
    <p>Explore reviews, browse dealer information, and share your experiences.</p>
    <p>Use the navigation links above to get started.</p>
  </div>
);

export default Home;