import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [dealers, setDealers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const backendURL = process.env.REACT_APP_BACKEND_URL || 'https://your-backend-url';

    fetch(`${backendURL}/get_dealers/`)
      .then((res) => res.json())
      .then((data) => {
        setDealers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching dealers:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ margin: '2rem' }}>
      <h1>Welcome to the Car Dealerships Portal</h1>
      <nav>
        <Link to="/">Home</Link> | <Link to="/dealers">Dealers</Link> | <Link to="/login">Login</Link>
      </nav>
      <p>Find Trusted Car Dealerships Near You</p>
      <p>Explore reviews, browse dealer information, and share your experiences.</p>
      <p>Use the navigation links above to get started.</p>

      <h2>Dealers List</h2>
      {loading ? (
        <p>Loading dealers preview...</p>
      ) : (
        <div>
          <h2>Dealers Preview</h2>
          {dealers.length === 0 ? (
            <p>No dealers available.</p>
          ) : (
            <ul>
              {dealers.slice(0, 5).map((dealer) => (
                <li key={dealer.id}>
                  <Link to={`/dealer/${dealer.id}`}>{dealer.full_name}</Link> — {dealer.city}, {dealer.state}
                </li>
              ))}
            </ul>
          )}
          <p>
            <Link to="/dealers">View All Dealers</Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;