import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import "./Dealers.css";
import "../assets/style.css";
import positive_icon from "../assets/positive.png";
import neutral_icon from "../assets/neutral.png";
import negative_icon from "../assets/negative.png";
import review_icon from "../assets/reviewbutton.png";
import Header from '../Header/Header';

const Dealer = () => {
    const [dealer, setDealer] = useState({});
    const [reviews, setReviews] = useState([]);
    const [unreviewed, setUnreviewed] = useState(false);
  
    const params = useParams();
    const id = params.id;
  // Assuming backend URLs are relative to root URL
 
  const root_url = window.location.origin + "/";
  const dealer_url = `${root_url}djangoapp/dealer/${id}`;
  const reviews_url = `${root_url}djangoapp/reviews/dealer/${id}`;
  const post_review_url = `/postreview/${id}`;

  // Fetch dealer details
  const getDealer = useCallback(async () => {
    try {
      const res = await fetch(dealer_url);
      if (res.ok) {
        const data = await res.json();
        setDealer(data);
      } else {
        console.error("Failed to fetch dealer data");
      }
    } catch (error) {
      console.error("Error fetching dealer:", error);
    }
  }, [dealer_url]);

  // Fetch dealer reviews
  const getReviews = useCallback(async () => {
    try {
      const res = await fetch(reviews_url);
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      } else {
        console.error("Failed to fetch reviews");
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  }, [reviews_url]);


  useEffect(() => {
    getDealer();
    getReviews();
  }, [getDealer, getReviews]);

  if (!dealer || Object.keys(dealer).length === 0) return <div>Loading dealer details...</div>;


  // Helper function to select review sentiment icon
  const getSentimentIcon = (sentiment) => {
    switch (sentiment.toLowerCase()) {
      case 'positive':
        return positive_icon;
      case 'neutral':
        return neutral_icon;
      case 'negative':
        return negative_icon;
      default:
        return neutral_icon;
    }
  };

  return (
    <div>
      <Header />
      <h2>{dealer.name}</h2>
      {/* Render dealer info here */}
      <h3>Reviews</h3>
      {unreviewed && <p>No reviews yet for this dealer.</p>}

      <ul>
      {reviews.length === 0 && <li>No reviews available.</li>}
        {reviews.map((review) => (
          <li key={review.id}>
            {review.comment}
            {/* Add sentiment icons or other review details as needed */}
          </li>
        ))}
      </ul>

      <Link to={post_review_url}>
        <img src={review_icon} alt="Add Review" />
        Add a Review
      </Link>
    </div>
  );
};

export default Dealer;
