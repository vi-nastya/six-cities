import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {offerPropTypes, reviewPropTypes} from "../../props-types-validation";
import Header from "../header/header.jsx";
import ReviewForm from "../review-form/review-form.jsx";
import ReviewsList from "../reviews-list/reviews-list.jsx";
import PlaceCard from "../place-card/place-card.jsx";
import {connect} from "react-redux";
import {DataOperation} from "../../reducer/data-reducer/data-reducer";
import {getOfferById, getNearbyPlaces, getOffersForCity} from "../../selectors/selectors";
import withReviewSubmit from "../../hocs/with-review-submit/with-review-submit.jsx";
import Map from "../map/map.jsx";
import {RATING_PERCENT, PlaceCardType} from "../../constants";

const ReviewFormWrapped = withReviewSubmit(ReviewForm);
class PlaceDetails extends PureComponent {
  constructor(props) {
    super(props);
    this._handleFavoriteChange = this._handleFavoriteChange.bind(this);
  }

  componentDidMount() {
    const {match, onLoadComments} = this.props;
    onLoadComments(match.params.id);
  }

  componentDidUpdate(prevProps) {
    const {match, onLoadComments} = this.props;
    if (prevProps.match.params.id !== match.params.id) {
      onLoadComments(match.params.id);
      window.scrollTo(0, 0);
    }
  }

  _handleFavoriteChange() {
    const {isAuthorizationRequired, placeData, onFavoriteChange, history} = this.props;
    if (isAuthorizationRequired) {
      history.push(`/login`);
    } else {
      onFavoriteChange(placeData, () => history.push(`/login`));
    }
  }

  render() {
    const {placeData,
      reviews,
      nearbyPlaces,
      isAuthorizationRequired,
      onFormSubmit,
      isSendingReview,
      reviewSendingError} = this.props;
    if (!placeData) {
      return <h2>Loading</h2>;
    }
    return <div>
      <div style={{display: `none`}}>
        <svg xmlns="http://www.w3.org/2000/svg">
          <symbol id="icon-arrow-select" viewBox="0 0 7 4">
            <path fillRule="evenodd" clipRule="evenodd" d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"></path>
          </symbol>
          <symbol id="icon-bookmark" viewBox="0 0 17 18">
            <path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"></path></symbol>
          <symbol id="icon-star" viewBox="0 0 13 12"><path fillRule="evenodd" clipRule="evenodd" d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"></path>
          </symbol>
        </svg>
      </div>

      <div className="page">
        <Header/>
        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">
                {placeData.images.map((image, index) => {
                  return <div className="property__image-wrapper" key={`offer-image-` + index}>
                    <img className="property__image" src={image} alt="Photo studio"/>
                  </div>;
                })}
              </div>
            </div>
            <div className="property__container container">
              <div className="property__wrapper">
                <div className="property__mark">
                  {placeData.isPremium ? <span>Premium</span> : ``}
                </div>
                <div className="property__name-wrapper">
                  <h1 className="property__name">
                    {placeData.title}
                  </h1>
                  <button className={`property__bookmark-button button ${placeData.isFavorite ? `property__bookmark-button--active` : ``}`}
                    type="button" onClick={this._handleFavoriteChange}>
                    <svg className="property__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="property__rating rating">
                  <div className="property__stars rating__stars">
                    <span style={{width: `${Math.round(placeData.rating) * RATING_PERCENT}%`}}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="property__rating-value rating__value">{placeData.rating}</span>
                </div>
                <ul className="property__features">
                  <li className="property__feature property__feature--entire">
                    {placeData.type}
                  </li>
                  <li className="property__feature property__feature--bedrooms">
                    {placeData.bedrooms} Bedrooms
                  </li>
                  <li className="property__feature property__feature--adults">
                  Max {placeData.maxAdults} adults
                  </li>
                </ul>
                <div className="property__price">
                  <b className="property__price-value">&euro;{placeData.price}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>
                <div className="property__inside">
                  <h2 className="property__inside-title">What&apos;s inside</h2>
                  <ul className="property__inside-list">
                    {placeData.goods.map((item, index) => {
                      return <li className="property__inside-item" key={`inside-item-` + index}>
                        {item}
                      </li>;
                    })}
                  </ul>
                </div>
                <div className="property__host">
                  <h2 className="property__host-title">Meet the host</h2>
                  <div className="property__host-user user">
                    <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                      <img className="property__avatar user__avatar" src={`/${placeData.host.avatarUrl}`} width="74" height="74" alt="Host avatar"/>
                    </div>
                    <span className="property__user-name">
                      {placeData.host.name}
                    </span>
                    {placeData.host.isPro ? <span className="property__user-status">Pro</span> : ``}
                  </div>
                  <div className="property__description">
                    <p className="property__text">
                      {placeData.description}
                    </p>
                  </div>
                </div>
                <section className="property__reviews reviews">
                  <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
                  {reviews.length > 0 ? <ReviewsList reviewsData={reviews}/> : ``}
                  {!isAuthorizationRequired && <ReviewFormWrapped
                    onFormSubmit={(commentData, resetForm) => onFormSubmit(placeData.id, commentData, resetForm)}
                    isSendingReview={isSendingReview}
                    reviewSendingError={reviewSendingError}
                  />}
                </section>
              </div>
            </div>
            <section className="property__map map">
              <Map points={[placeData].concat(nearbyPlaces).map((offer) => [offer.location.latitude, offer.location.longitude])} activePoint={0} city={[placeData.city.location.latitude, placeData.city.location.longitude]}/>
            </section>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <div className="near-places__list places__list">
                {nearbyPlaces.map((place, index) => <PlaceCard place={place}
                  cardType={PlaceCardType.NEARBY}
                  key={`nearby-place-${index}`}/>)}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>;
  }
}


PlaceDetails.propTypes = {
  placeData: offerPropTypes,
  onFavoriteChange: PropTypes.func.isRequired,
  onLoadComments: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  reviews: PropTypes.arrayOf(reviewPropTypes),
  nearbyPlaces: PropTypes.arrayOf(offerPropTypes),
  isAuthorizationRequired: PropTypes.bool.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  isSendingReview: PropTypes.bool.isRequired,
  reviewSendingError: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, ownProps, {
    placeData: getOfferById(state, ownProps.match.params.id),
    reviews: state.data.comments,
    nearbyPlaces: getNearbyPlaces(getOffersForCity(state), ownProps.match.params.id),
    isAuthorizationRequired: state.user.isAuthorizationRequired,
    isSendingReview: state.data.isSendingReview,
    reviewSendingError: state.data.reviewSendingError,
  });
};

const mapDispatchToProps = (dispatch) => ({
  onFavoriteChange: (placeData, onLoginError) => {
    dispatch(DataOperation.updateFavoriteStatus(placeData, onLoginError));
  },
  onLoadComments: (offerId) => {
    dispatch(DataOperation.loadComments(offerId));
  },
  onFormSubmit: (offerId, commentData, resetForm) => {
    dispatch(DataOperation.addComment(offerId, commentData, resetForm));
  },
});

export {PlaceDetails};

export default connect(mapStateToProps, mapDispatchToProps)(PlaceDetails);
