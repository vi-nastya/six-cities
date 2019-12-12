import React from "react";
import PropTypes from "prop-types";
import Review from "../review/review.jsx";

const MAX_REVIEWS_NUMBER = 10;

const ReviewsList = (props) => {
  const {reviewsData} = props;
  return <ul className="reviews__list">
    {reviewsData
    .sort((review1, review2) => review1.date < review2.date ? 1 : -1)
    .slice(0, MAX_REVIEWS_NUMBER)
    .map((review, index) => {
      return <Review reviewData={review} key={`review-` + index}/>;
    })}
  </ul>;
};

ReviewsList.propTypes = {
  reviewsData: PropTypes.array.isRequired,
};

export default ReviewsList;
