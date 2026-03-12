import React, { useState, useEffect } from 'react';
import "./Dealers.css";
import "../assets/style.css";
import Header from '../Header/Header';
import review_icon from "../assets/reviewicon.png";

const Dealers = () => {
  const [dealersList, setDealersList] = useState([]);
  const [states, setStates] = useState([]); // Assuming you want to filter by state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Use environment variable for backend URL, fallback to localhost for local dev
  const backend_url = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

  // Fetch all dealers
  const getDealers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${backend_url}/djangoapp/get_dealers`, { method: "GET" });
      const retobj = await res.json();
      if (retobj.status === 200) {
        setDealersList(Array.from(retobj.dealers));
      } else {
        setError("Failed to fetch dealers");
      }
    } catch (err) {
      setError("Error fetching dealers: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch dealers filtered by state
  const filterDealers = async (state) => {
    if (!state) return getDealers();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${backend_url}/djangoapp/get_dealers/${state}`, { method: "GET" });
      const retobj = await res.json();
      if (retobj.status === 200) {
        setDealersList(Array.from(retobj.dealers));
      } else {
        setError("Failed to fetch dealers for state: " + state);
      }
    } catch (err) {
      setError("Error fetching dealers by state: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Optionally, fetch states for filtering (if available from backend)
  // Example: fetch states list on component mount
  // You can remove or replace this if you have a different source for states
  const getStates = async () => {
    try {
      const res = await fetch(`${backend_url}/djangoapp/get_states`, { method: "GET" });
      const retobj = await res.json();
      if (retobj.status === 200) {
        setStates(Array.from(retobj.states));
      }
    } catch {
      // Ignore errors fetching states for now
    }
  };

      setStates(Array.from(new Set(states)))
      setDealersList(all_dealers)
    }
  useEffect(() => {
    getDealers();
    getStates();
  }, []);

  return (
    <div className="dealers-page">
      <Header />
      <h1>Dealers List</h1>

      {/* State filter dropdown */}
      {states.length > 0 && (
        <select onChange={(e) => filterDealers(e.target.value)} defaultValue="">
          <option value="">All States</option>
          {states.map((state) => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      )}

      {/* Loading indicator */}
      {loading && <p>Loading dealers...</p>}

      {/* Error message */}
      {error && <p className="error">{error}</p>}

      {/* Dealers list */}
      {!loading && !error && dealersList.length === 0 && <p>No dealers found.</p>}

      <ul className="dealers-list">
        {dealersList.map((dealer) => (
          <li key={dealer.id} className="dealer-item">
            <h2>{dealer.name}</h2>
            <p>{dealer.address}</p>
            <p>{dealer.city}, {dealer.state} {dealer.zip}</p>
            <p>Phone: {dealer.phone}</p>
            <img src={review_icon} alt="Review Icon" className="review-icon" />
          </li>
        ))}
      </ul>

      <footer>
        <p>© 2026 Your Name or Company</p>
      </footer>
    </div>
  );


export default Dealers;
