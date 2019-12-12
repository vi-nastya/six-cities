import React from "react";
import PropTypes from "prop-types";

const MIN_COMMENT_LENGTH = 50;
const MAX_COMMENT_LENGTH = 300;

const RATING_LABELS = [`perfect`, `good`, `not bad`, `badly`, `terribly`];

const ReviewForm = (props) => {
  const {isValid, onInputChange, onFormSubmit, formRef} = props;
  return <form className="reviews__form form" action="#" method="post" ref={formRef} onSubmit={onFormSubmit}>
    <label className="reviews__label form__label" htmlFor="review">Your review</label>
    <div className="reviews__rating-form form__rating">
      {RATING_LABELS.map((title, index) =>
        <React.Fragment key={`rating-radio-${index}`}>
          <input className="form__rating-input visually-hidden"
            name="rating" value={`${5 - index}`} id={`${5 - index}-stars`} type="radio" onChange={onInputChange}/>
          <label htmlFor={`${5 - index}-stars`} className="reviews__rating-label form__rating-label" title={title}>
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>
        </React.Fragment>
      )}
    </div>
    <textarea className="reviews__textarea form__textarea" id="review"
      minLength={MIN_COMMENT_LENGTH} maxLength={MAX_COMMENT_LENGTH}
      name="review" placeholder="Tell how was your stay, what you like and what can be improved"
      onChange={onInputChange}></textarea>
    <div className="reviews__button-wrapper">
      <p className="reviews__help">
      To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
      </p>
      <button className="reviews__submit form__submit button" type="submit" disabled={!isValid}>Submit</button>
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
};

export default ReviewForm;
