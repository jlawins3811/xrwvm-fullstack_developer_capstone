import React, { useState, useEffect } from 'react';
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
  const getDealer = async () => {
    try {
      const res = await fetch(dealer_url);
      if (res.ok) {
        const data = await res.json();
        setDealer(data);
      } else {
        console.error("Failed to fetch dealer details");
      }
    } catch (error) {
      console.error("Error fetching dealer:", error);
    }
  };

  // Fetch dealer reviews
  const getReviews = async () => {
    try {
      const res = await fetch(reviews_url);
      if (res.ok) {
        const data = await res.json();
        if (data.length === 0) {
          setUnreviewed(true);
        } else {
          setReviews(data);
          setUnreviewed(false);
        }
      } else {
        console.error("Failed to fetch reviews");
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    getDealer();
    getReviews();
  }, [id]);

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
      <p>{dealer.address}</p>
      <p>{dealer.city}, {dealer.state} {dealer.zip}</p>

      <h3>Reviews</h3>
      {unreviewed && <p>No reviews yet for this dealer.</p>}

      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <img src={getSentimentIcon(review.sentiment)} alt={review.sentiment} style={{width: '20px', marginRight: '8px'}} />
            <strong>{review.user_name}</strong>: {review.review}
            <br />
            <small>{new Date(review.purchase_date).toLocaleDateString()}</small>
          </li>
        ))}
      </ul>

      <Link to={post_review_url}>
        <img src={review_icon} alt="Post Review" />
        <span>Post a Review</span>
      </Link>
    </div>
  );
};

export default Dealer;
