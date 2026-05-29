import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
  const [postReview, setPostReview] = useState(<></>)

  const { id } = useParams();

  // Use relative URLs here
  const dealer_url = `/djangoapp/dealer/${id}`;
  const reviews_url = `/djangoapp/reviews/dealer/${id}`;
  const post_review_url = `/postreview/${id}`;

  const getDealer = async () => {
    try {
      const res = await fetch(dealer_url);
      if (!res.ok) throw new Error("Failed to fetch dealer");
      const data = await res.json();
      setDealer(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getReviews = async () => {
    try {
      const res = await fetch(reviews_url);
      if (!res.ok) throw new Error("Failed to fetch reviews");
      const data = await res.json();
      setReviews(data.reviews || []);
      if (!data.reviews || data.reviews.length === 0) {
        setUnreviewed(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const senti_icon = (sentiment)=>{
    let icon = sentiment === "positive"?positive_icon:sentiment==="negative"?negative_icon:neutral_icon;
    return icon;
  }

  useEffect(() => {
    getDealer();
    getReviews();
  }, [id]);

  return (
    <div className="dealer-container">
      <Header />
      <h2>{dealer.full_name}</h2>
      <p>{dealer.address}</p>
      <p>{dealer.city}, {dealer.state} {dealer.zip}</p>

      <h3>Reviews</h3>
      {unreviewed && <p>No reviews yet. Be the first to review!</p>}
      <ul>
        {reviews.map(review => (
          <li key={review.id}>
            <p>{review.review_text}</p>
            <img 
              src={
                review.sentiment === "positive" ? positive_icon :
                review.sentiment === "neutral" ? neutral_icon :
                negative_icon
              } 
              alt={review.sentiment} 
              className="sentiment-icon"
            />
          </li>
        ))}
      </ul>

      <a href={post_review_url}>
        <img src={review_icon} alt="Post Review" className="review-button" />
      </a>
    </div>
  );
};

export default Dealer;
