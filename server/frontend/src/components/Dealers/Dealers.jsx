import React, { useState, useEffect } from 'react';
import "./Dealers.css";
import "../assets/style.css";
import Header from '../Header/Header';
import review_icon from "../assets/reviewicon.png";

const Dealers = ({ isLoggedIn }) => {
  const [dealersList, setDealersList] = useState([]);
  const [filteredDealers, setFilteredDealers] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");

  // Use relative URL for fetching dealers
  const dealer_url = "/djangoapp/get_dealers";

  const getDealers = async () => {
    try {
      const res = await fetch(dealer_url);
      if (!res.ok) throw new Error("Failed to fetch dealers");
      const retobj = await res.json();
      if (retobj.status === 200) {
        setDealersList(retobj.dealers);
        setFilteredDealers(retobj.dealers);
        // Extract unique states for dropdown
        const uniqueStates = [...new Set(retobj.dealers.map(d => d.state))].sort();
        setStates(uniqueStates);
      } else {
        setDealersList([]);
        setFilteredDealers([]);
        setStates([]);
      }
    } catch (error) {
      console.error(error);
      setDealersList([]);
      setFilteredDealers([]);
      setStates([]);
    }
  };

  useEffect(() => {
    getDealers();
  }, []);

  // Filter dealers by state
  const filterDealers = (state) => {
    setSelectedState(state);
    if (state === "All" || state === "") {
      setFilteredDealers(dealersList);
    } else {
      const filtered = dealersList.filter(dealer => dealer.state === state);
      setFilteredDealers(filtered);
    }
  };

  return (
    <div className="dealers-container">
      <Header />
      <table className="table dealers-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Dealer Name</th>
            <th>City</th>
            <th>Address</th>
            <th>Zip</th>
            <th>
              <select
                name="state"
                id="state"
                value={selectedState}
                onChange={(e) => filterDealers(e.target.value)}
              >
                <option value="" disabled hidden>State</option>
                <option value="All">All States</option>
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </th>
            {isLoggedIn && <th>Review Dealer</th>}
          </tr>
        </thead>
        <tbody>
          {filteredDealers.map(dealer => (
            <tr key={dealer.id}>
              <td>{dealer.id}</td>
              <td><a href={`/dealer/${dealer.id}`}>{dealer.full_name}</a></td>
              <td>{dealer.city}</td>
              <td>{dealer.address}</td>
              <td>{dealer.zip}</td>
              <td>{dealer.state}</td>
              {isLoggedIn && (
                <td>
                  <a href={`/postreview/${dealer.id}`}>
                    <img src={review_icon} className="review_icon" alt="Post Review" />
                  </a>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

<table className="table">
  <thead>
    <tr>
      <th>ID</th>
      <th>Dealer Name</th>
      <th>City</th>
      <th>Address</th>
      <th>Zip</th>
      <th>
        <select
          name="state"
          id="state"
          value={selectedState}
          onChange={(e) => filterDealers(e.target.value)}
        >
          <option value="" disabled hidden>
            State
          </option>
          <option value="All">All States</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </th>
      {isLoggedIn && <th>Review Dealer</th>}
    </tr>
  </thead>
  <tbody>
    {dealersList.map((dealer) => (
      <tr key={dealer.id}>
        <td>{dealer.id}</td>
        <td>
          <a href={`/dealer/${dealer.id}`}>{dealer.full_name}</a>
        </td>
        <td>{dealer.city}</td>
        <td>{dealer.address}</td>
        <td>{dealer.zip}</td>
        <td>{dealer.state}</td>
        {isLoggedIn && (
          <td>
            <a href={`/postreview/${dealer.id}`}>
              <img
                src={review_icon}
                className="review_icon"
                alt="Post Review"
              />
            </a>
          </td>
        )}
      </tr>
    ))}
  </tbody>
</table>

export default Dealers
