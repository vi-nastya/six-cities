import React from "react";
import PropTypes from "prop-types";
import {MIN_COMMENT_LENGTH, MAX_COMMENT_LENGTH, RATING_LABELS, MAX_RATING} from "../../constants";

const ReviewForm = (props) => {
  const {isValid, onInputChange, onFormSubmit, formRef, isSendingReview, reviewSendingError} = props;
  return <form className="reviews__form form" action="#" method="post" ref={formRef} onSubmit={onFormSubmit}>
    <label className="reviews__label form__label" htmlFor="review">Your review</label>
    <div className="reviews__rating-form form__rating">
      {RATING_LABELS.map((title, index) =>
        <React.Fragment key={`rating-radio-${index}`}>
          <input className="form__rating-input visually-hidden"
            name="rating"
            value={`${MAX_RATING - index}`}
            id={`${MAX_RATING - index}-stars`}
            type="radio"
            disabled={isSendingReview}
            onChange={onInputChange}/>
          <label htmlFor={`${MAX_RATING - index}-stars`} className="reviews__rating-label form__rating-label" title={title}>
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>
        </React.Fragment>
      )}
    </div>
    <textarea className="reviews__textarea form__textarea" id="review"
      disabled={isSendingReview}
      minLength={MIN_COMMENT_LENGTH} maxLength={MAX_COMMENT_LENGTH}
      name="review" placeholder="Tell how was your stay, what you like and what can be improved"
      onChange={onInputChange}></textarea>
    <div className="reviews__button-wrapper">
      <p className="reviews__help" style={reviewSendingError ? {border: `3px solid red`} : {}}>
      To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
      </p>
      <button className="reviews__submit form__submit button" type="submit" disabled={!isValid || isSendingReview}>Submit</button>
    </div>
  </form>;
};

ReviewForm.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  isValid: PropTypes.bool.isRequired,
  formRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({current: PropTypes.any})
  ]),
  isSendingReview: PropTypes.bool.isRequired,
  reviewSendingError: PropTypes.bool.isRequired,
};

export default ReviewForm;
