import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Dealers.css";
import "../assets/style.css";
import positive_icon from "../assets/positive.png";
import neutral_icon from "../assets/neutral.png";
import negative_icon from "../assets/negative.png";
import review_icon from "../assets/reviewbutton.png";
import Header from "../Header/Header";

const Dealer = ({ isLoggedIn }) => {
  const { id } = useParams();


  const [dealer, setDealer] = useState({});
  const [reviews, setReviews] = useState([]);
  const [unreviewed, setUnreviewed] = useState(false);
  const [postReview, setPostReview] = useState(<></>)

  // Fix: define actual state for review form instead of broken useState(<></>)
  const [rating, setRating] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [postReviewLoading, setPostReviewLoading] = useState(false);

  useEffect(() => {
    const fetchDealer = async () => {
      try {
        // TODO: replace with your real endpoint
        const res = await fetch(`/api/dealers/${id}`);
        const data = await res.json();
        setDealer(data);
      } catch (err) {
        console.error("Failed to fetch dealer:", err);
      }
    };

    const fetchReviews = async () => {
      try {
        // TODO: replace with your real endpoint
        const res = await fetch(`/api/dealers/${id}/reviews`);
        const data = await res.json();
        setReviews(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      }
    };

    fetchDealer();
    fetchReviews();
  }, [id]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setPostReviewLoading(true);

    try {
      // TODO: replace with your real endpoint + payload
      const res = await fetch(`/api/dealers/${id}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, reviewText }),
      });

      if (!res.ok) throw new Error("Failed to post review");

      // reload reviews after posting
      const reviewsRes = await fetch(`/api/dealers/${id}/reviews`);
      const reviewsData = await reviewsRes.json();
      setReviews(Array.isArray(reviewsData) ? reviewsData : []);

      setRating("");
      setReviewText("");
      setUnreviewed(false);
    } catch (err) {
      console.error("Failed to submit review:", err);
    } finally {
      setPostReviewLoading(false);
    }
  };

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} />

      <h2>{dealer?.name || "Dealer"}</h2>

      {/* Reviews */}
      <div>
        <h3>Reviews</h3>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((r, idx) => (
            <div key={r.id || r._id || idx}>
              <img src={review_icon} alt="review" style={{ width: 20, marginRight: 8 }} />
              <p>{r.text || r.reviewText || ""}</p>
            </div>
          ))
        )}
      </div>

      {/* Review form (show conditionally if unreviewed true, if that's your logic) */}
      {unreviewed && (
        <form onSubmit={handleSubmitReview}>
          <h3>Write a review</h3>

          <label>
            Rating:
            <select value={rating} onChange={(e) => setRating(e.target.value)}>
              <option value="">Select</option>
              <option value="positive">Positive</option>
              <option value="neutral">Neutral</option>
              <option value="negative">Negative</option>
            </select>
          </label>

          <label>
            Review:
            <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} />
          </label>

          <button type="submit" disabled={postReviewLoading}>
            {postReviewLoading ? "Posting..." : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
};

export default Dealer;
