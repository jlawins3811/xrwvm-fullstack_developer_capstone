import React, { useState, useEffect } from 'react';
import "./Dealers.css";
import "../assets/style.css";
import Header from '../Header/Header';
import review_icon from "../assets/reviewicon.png";

const Dealers = () => {
  const [dealersList, setDealersList] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");

  const dealer_url = "/djangoapp/get_dealers";
  const dealer_url_by_state = "/djangoapp/get_dealers/";

  // Fetch all dealers
  const getDealers = async () => {
    try {
      const res = await fetch(dealer_url);
      const data = await res.json();
      if (res.status === 200) {
        setDealersList(data.dealers || data);
        // Extract unique states for filtering dropdown
        const uniqueStates = [...new Set((data.dealers || data).map(dealer => dealer.state))];
        setStates(uniqueStates);
      }
    } catch (error) {
      console.error("Error fetching dealers:", error);
    }
  };

  // Fetch dealers filtered by state
  const filterDealers = async (state) => {
    try {
      if (!state) {
        getDealers();
        return;
      }
      const res = await fetch(`${dealer_url_by_state}${state}`);
      const data = await res.json();
      if (res.status === 200) {
        setDealersList(data.dealers || data);
      }
    } catch (error) {
      console.error("Error filtering dealers:", error);
    }
  };

  useEffect(() => {
    getDealers();
  }, []);

  const handleStateChange = (event) => {
    const state = event.target.value;
    setSelectedState(state);
    filterDealers(state);
  };

  return (
    <div>
      <Header />
      <h1>Dealers List</h1>

      <label htmlFor="state-select">Filter by State:</label>
      <select id="state-select" value={selectedState} onChange={handleStateChange}>
        <option value="">All States</option>
        {states.map((state) => (
          <option key={state} value={state}>{state}</option>
        ))}
      </select>

      <table className="dealers-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>City</th>
            <th>State</th>
            <th>Address</th>
            <th>Zip</th>
          </tr>
        </thead>
        <tbody>
          {dealersList.map((dealer) => (
            <tr key={dealer.id}>
              <td>{dealer.full_name || dealer.name}</td>
              <td>{dealer.city}</td>
              <td>{dealer.state}</td>
              <td>{dealer.address}</td>
              <td>{dealer.zip}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dealers;
