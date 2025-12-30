import React, { useState, useEffect } from 'react';
import "./Dealers.css";
import "../assets/style.css";
import Header from '../Header/Header';
import review_icon from "../assets/reviewicon.png";

const Dealers = () => {
    const [dealers, setDealers] = useState([]);
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
  

  // Backend API endpoints
  
  const dealer_url_by_state_base = "/djangoapp/get_dealers/"; // to filter by state
  const backendURL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";
  const dealer_url = `${backendURL}/get_dealers/`;
  
  const getDealers = async () => {
    try {
      const res = await fetch(dealer_url, {
        method: "GET",
      });
      const data = await res.json();
      if (res.ok && data.status === 200) {
        setDealersList(data.dealers);
        // Extract unique states for filtering if needed
        const uniqueStates = [...new Set(data.dealers.map(dealer => dealer.state))];
        setStates(uniqueStates);
      } else {
        console.error("Failed to fetch dealers:", data);
      }
    } catch (error) {
      console.error("Error fetching dealers:", error);
    }
  };

  // Filter dealers by state
  const filterDealers = async (state) => {
    try {
      const res = await fetch(dealer_url_by_state_base + state, {
        method: "GET",
      });
      const data = await res.json();
      if (res.ok && data.status === 200) {
        setDealersList(data.dealers);
      } else {
        console.error("Failed to filter dealers:", data);
      }
    } catch (error) {
      console.error("Error filtering dealers:", error);
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

      {/* Dealers Table */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>State</th>
            <th>Address</th>
            <th>Reviews</th>
          </tr>
        </thead>
        <tbody>
          {dealersList.map(dealer => (
            <tr key={dealer.id}>
              <td>{dealer.name}</td>
              <td>{dealer.state}</td>
              <td>{dealer.address}</td>
              <td>
                <a href={`/dealer/${dealer.id}`}>
                  <img src={review_icon} alt="reviews" />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
