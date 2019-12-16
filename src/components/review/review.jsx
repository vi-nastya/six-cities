import React from "react";
import {reviewPropTypes} from "../../props-types-validation";
import {RATING_PERCENT} from "../../constants";

const formatDate = (date) => {
  const currentDate = new Date(date);
  const currentMonth = currentDate.toLocaleString(`en-us`, {month: `long`});
  const currentYear = currentDate.getFullYear();
  return `${currentMonth} ${currentYear}`;
};

const Review = (props) => {
  const {reviewData} = props;
  return <li className="reviews__item">
    <div className="reviews__user user">
      <div className="reviews__avatar-wrapper user__avatar-wrapper">
        <img className="reviews__avatar user__avatar" src={reviewData.user.avatarUrl} width="54" height="54" alt="Reviews avatar"/>
      </div>
      <span className="reviews__user-name">{reviewData.user.name}</span>
    </div>
    <div className="reviews__info">
      <div className="reviews__rating rating">
        <div className="reviews__stars rating__stars">
          <span style={{width: `${Math.round(reviewData.rating) * RATING_PERCENT}%`}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <p className="reviews__text">
        {reviewData.comment}
      </p>
      <time className="reviews__time" dateTime="2019-04-24">{formatDate(reviewData.date)}</time>
    </div>
  </li>;
};

Review.propTypes = {
  reviewData: reviewPropTypes.isRequired,
};


export default Review;
