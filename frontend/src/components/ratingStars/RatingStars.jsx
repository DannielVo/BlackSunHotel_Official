import React from "react";
import "./ratingStars.css";

const RatingStars = ({ rating }) => {
  let fullStars = 0;
  let hasHalfStar = 0;
  let emptyStars = 5;

  fullStars = Math.floor(rating);
  hasHalfStar = rating % 1 >= 0.25 && rating % 1 < 0.75;
  emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div class="rating-stars">
      {[...Array(fullStars)].map((_, i) => (
        <i key={`full-${i}`} className="bx bxs-star"></i>
      ))}
      {hasHalfStar && <i className="bx bxs-star-half"></i>}
      {[...Array(emptyStars)].map((_, i) => (
        <i key={`empty-${i}`} className="bx bx-star"></i>
      ))}
    </div>
  );
};

export default RatingStars;
