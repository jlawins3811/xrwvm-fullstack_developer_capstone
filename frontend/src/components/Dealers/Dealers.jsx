import React, { useState, useEffect } from 'react';
import "./Dealers.css";
import "../assets/style.css";
import Header from '../Header/Header';
import review_icon from "../assets/reviewicon.png";
import { Link } from 'react-router-dom';

const Dealers = () => {
  const [dealers, setDealers] = useState([]);
  const [filteredDealers, setFilteredDealers] = useState([]);
  const [states, setStates] = useState([]);

  // Backend URL from environment or default
  const backendURL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";
  const dealer_url = `${backendURL}/get_dealers/`;

  // Fetch dealers from backend
  const getDealers = async () => {
    try {
      const res = await fetch(dealer_url);
      const data = await res.json();
      if (res.ok && data.status === 200) {
        setDealers(data.dealers);
        setFilteredDealers(data.dealers);

        // Extract unique states from dealer data
        const uniqueStates = [...new Set(data.dealers.map(dealer => dealer.state))];
        setStates(uniqueStates);
      } else {
        console.error('Backend returned error:', data);
      }
    } catch (error) {
      console.error('Error fetching dealers:', error);
    }
  };

  useEffect(() => {
    fetch(`${backendURL}/get_dealers/`)
      .then(response => response.json())
      .then(data => {
        if (data.status === 200) {
          setDealers(data.dealers);
          setFilteredDealers(data.dealers);

          // Extract unique states from dealers
          const uniqueStates = [...new Set(data.dealers.map(d => d.state))];
          setStates(uniqueStates);
        } else {
          console.error('Backend returned error:', data);
        }
      })
      .catch(error => console.error('Error fetching dealers:', error));
  }, [backendURL]);


  // Filter dealers by selected state
  const filterDealers = (state) => {
    if (!state) {
      setFilteredDealers(dealers);
    } else {
      const filtered = dealers.filter(dealer => dealer.state === state);
      setFilteredDealers(filtered);
    }
  };

  useEffect(() => {
    fetch(`${backendURL}/get_dealers/`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data.status === 200) {
          setDealers(data.dealers);
        } else {
          console.error('Backend returned error:', data);
        }
      })
      .catch(error => console.error('Error fetching dealers:', error));
  }, [backendURL]);


  return (
    <div>
      <Header />
      <h2>Dealers List</h2>

      {/* State filter dropdown */}
      <select onChange={(e) => filterDealers(e.target.value)} defaultValue="">
        <option value="">All States</option>
        {states.map(state => (
          <option key={state} value={state}>{state}</option>
        ))}
      </select>

      <ul>
        {filteredDealers.map(dealer => (
          <li key={dealer.id}>
            <Link to={`/dealer/${dealer.id}`}>{dealer.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
return (
    <div className="dealers-container">
      <h2>Dealers List</h2>
      <table className="dealers-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>City</th>
            <th>State</th>
            <th>Zip</th>
          </tr>
        </thead>
        <tbody>
          {dealers.map(dealer => (
            <tr key={dealer.id}>
              <td data-label="Name">{dealer.name}</td>
              <td data-label="City">{dealer.city}</td>
              <td data-label="State">{dealer.state}</td>
              <td data-label="Zip">{dealer.zip}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

export default Dealers;
