import React from "react";
import PropTypes from "prop-types";
import {reviewPropTypes} from "../../props-types-validation";
import Review from "../review/review.jsx";
import _ from "lodash";

const MAX_REVIEWS_NUMBER = 10;

const ReviewsList = (props) => {
  const {reviewsData} = props;
  return <ul className="reviews__list">
    {_.cloneDeep(reviewsData)
    .sort((review1, review2) => review1.date < review2.date ? 1 : -1)
    .slice(0, MAX_REVIEWS_NUMBER)
    .map((review, index) => {
      return <Review reviewData={review} key={`review-` + index}/>;
    })}
  </ul>;
};

ReviewsList.propTypes = {
  reviewsData: PropTypes.arrayOf(reviewPropTypes).isRequired,
};

export default ReviewsList;
