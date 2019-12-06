import React from "react";
import PropTypes from "prop-types";
import Review from "../review/review.jsx";

const ReviewsList = (props) => {
  const {reviewsData} = props;
  return <ul className="reviews__list">
    {reviewsData.map((review, index) => {
      return <Review reviewData={review} key={`review-` + index}/>;
    })}
  </ul>;
};

ReviewsList.propTypes = {
  reviewsData: PropTypes.array.isRequired,
};

export default ReviewsList;
