import React, { useState, useEffect } from "react";
import "./Dealers.css";
import "../assets/style.css";
import Header from "../Header/Header";
import review_icon from "../assets/reviewicon.png";

const Dealers = ({ isLoggedIn }) => {
  const [dealersList, setDealersList] = useState([]);
  const [filteredDealers, setFilteredDealers] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");

  useEffect(() => {
    const fetchDealers = async () => {
      try {
        const res = await fetch(
          "https://jlathegodsso-8000.theiadockernext-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/dealerslist"
        );
        const data = await res.json();

        // Normalize state property to lowercase
        const normalizedDealers = data.map(d => ({
          ...d,
          state: (d.state || d.State || "").toLowerCase()
        }));

        setDealersList(normalizedDealers);
        setFilteredDealers(normalizedDealers);
      } catch (err) {
        console.error("Failed to fetch dealers:", err);
      }
    };

    const fetchStates = async () => {
      try {
        // Replace with actual states API endpoint
        const res = await fetch("https://example.com/stateslist");
        const data = await res.json();
        setStates(data);
      } catch (err) {
        console.error("Failed to fetch states:", err);
      }
    };

    fetchDealers();
    fetchStates();
  }, []);

  useEffect(() => {
    if (!selectedState) {
      setFilteredDealers(dealersList);
      return;
    }

    const next = dealersList.filter(
      (d) => d.state === selectedState.toLowerCase()
    );

    setFilteredDealers(next);
  }, [selectedState, dealersList]);

  return (
    <div className="dealers-page">
      <Header isLoggedIn={isLoggedIn} />

      <div className="dealers-controls">
        <label htmlFor="stateSelect">State:</label>
        <select
          id="stateSelect"
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
        >
          <option value="">All States</option>
          {states.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="dealers-list">
        {filteredDealers.map((dealer, index) => (
          <div key={dealer.id || index} className="dealer-card">
            <h3>{dealer.name || "Unnamed Dealer"}</h3>
            <p>{dealer.state || "Unknown State"}</p>

            <img src={review_icon} alt="Reviews" className="review-icon" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dealers;
