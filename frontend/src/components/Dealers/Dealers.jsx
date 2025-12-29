import React, { useState, useEffect } from 'react';
import "./Dealers.css";
import "../assets/style.css";
import Header from '../Header/Header';
import review_icon from "../assets/reviewicon.png";

const Dealers = () => {
    const [dealers, setDealers] = useState([]);
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
  

  // Backend API endpoints
  const dealer_url = "/djangoapp/get_dealers"; // to get all dealers
  const dealer_url_by_state_base = "/djangoapp/get_dealers/"; // to filter by state

  // Fetch all dealers
  const getDealers = async () => {
    try {
      const res = await fetch(dealer_url, {
        method: "GET",
      });
      const data = await res.json();
      if (res.ok && data.status === 200) {
        setDealersList(data.dealers);
        // Optionally extract states from dealers for filtering
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
    fetch(`${backendUrl}/get_dealers/`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setDealers(data))
      .catch(error => console.error('Error fetching dealers:', error));
  }, [backendUrl]);

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

export default Dealers;
