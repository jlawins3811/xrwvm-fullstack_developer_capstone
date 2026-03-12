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
  const [postReview, setPostReview] = useState(<></>);

  let curr_url = window.location.href;
  let root_url = curr_url.substring(0, curr_url.indexOf("dealer"));
  let params = useParams();
  let id = params.id;
  let dealer_url = root_url + `djangoapp/dealer/${id}`;
  let reviews_url = root_url + `djangoapp/reviews/dealer/${id}`;
  let post_review_url = root_url + `postreview/${id}`;

  // Fetch dealer data
  const get_dealer = async () => {
    try {
      const res = await fetch(dealer_url);
      if (!res.ok) throw new Error("Failed to fetch dealer data");
      const data = await res.json();
      setDealer(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch reviews data
  const get_reviews = async () => {
    try {
      const res = await fetch(reviews_url);
      if (!res.ok) throw new Error("Failed to fetch reviews");
      const data = await res.json();
      setReviews(data);
      setUnreviewed(data.length === 0);
    } catch (error) {
      console.error(error);
    }
  };

  const senti_icon = (sentiment)=>{
    let icon = sentiment === "positive"?positive_icon:sentiment==="negative"?negative_icon:neutral_icon;
    return icon;
  }

  useEffect(() => {
    get_dealer();
    get_reviews();
  }, [id]);

  // Render sentiment icon based on review sentiment
  const renderSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case "positive":
        return <img src={positive_icon} alt="Positive" />;
      case "neutral":
        return <img src={neutral_icon} alt="Neutral" />;
      case "negative":
        return <img src={negative_icon} alt="Negative" />;
      default:
        return null;
    }
  };

  // Example handler for showing post review form (you can implement form as needed)
  const handlePostReviewClick = () => {
    setPostReview(
      <div className="post-review-form">
        {/* Your review form components go here */}
        <p>Review form will be implemented here.</p>
      </div>
    );
  };

  return (
    <div>
      <Header />
      <h2>Dealer: {dealer.full_name || "Loading..."}</h2>
      <div className="dealer-info">
        <p>{dealer.short_name}</p>
        <p>{dealer.city}, {dealer.state}</p>
      </div>
      <div class="reviews_panel">
      {reviews.length === 0 && unreviewed === false ? (
        <text>Loading Reviews....</text>
      ):  unreviewed === true? <div>No reviews yet! </div> :
      reviews.map(review => (
        <div className='review_panel'>
          <img src={senti_icon(review.sentiment)} className="emotion_icon" alt='Sentiment'/>
          <div className='review'>{review.review}</div>
          <div className="reviewer">{review.name} {review.car_make} {review.car_model} {review.car_year}</div>
        </div>
      ))}
    </div>  
  </div>
)
}

      <h3>Reviews</h3>
      {unreviewed ? (
        <p>No reviews yet for this dealer.</p>
      ) : (
        <ul className="reviews-list">
          {reviews.map((review) => (
            <li key={review.id} className="review-item">
              <p><strong>{review.name}</strong> says:</p>
              <p>{review.review}</p>
              <div className="sentiment-icon">
                {renderSentimentIcon(review.sentiment)}
              </div>
            </li>
          ))}
        </ul>
      )}

      <button className="post-review-button" onClick={handlePostReviewClick}>
        <img src={review_icon} alt="Post Review" /> Post a Review
      </button>

      {postReview}
    

export default Dealer;
