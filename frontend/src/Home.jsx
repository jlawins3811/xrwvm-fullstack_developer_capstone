import React, { useEffect, useState } from 'react';

const Home = () => {
  const [dealers, setDealers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const backendURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

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
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <h1>Welcome to the Car Dealerships Portal</h1>
      <nav>
        <a href="/">Home</a> | <a href="/dealers">Dealers</a> | <a href="/login">Login</a>
      </nav>
      <p>Find Trusted Car Dealerships Near You</p>
      <p>Explore reviews, browse dealer information, and share your experiences.</p>
      <p>Use the navigation links above to get started.</p>

      <h2>Dealers List</h2>
      {loading ? (
        <p>Loading dealers...</p>
      ) : dealers.length > 0 ? (
        <ul>
          {dealers.map((dealer) => (
            <li key={dealer.id}>
              <strong>{dealer.full_name}</strong> — {dealer.city}, {dealer.state}
            </li>
          ))}
        </ul>
      ) : (
        <p>No dealers found.</p>
      )}
    </div>
  );
};

export default Home;