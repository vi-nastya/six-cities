import React from "react";
import PropTypes from "prop-types";
import {offerPropTypes, cityPropTypes} from "../../props-types-validation";
import {DataActionCreator} from "../../reducer/data-reducer/data-reducer";
import PlacesList from "../places-list/places-list.jsx";
import Map from "../map/map.jsx";
import CitiesList from "../cities-list/cities-list.jsx";
import Sorting from "../sorting/sorting.jsx";
import {connect} from "react-redux";
import {compose} from "recompose";
import withActiveItem from "../../hocs/with-active-item/with-active-item.jsx";
import withSorting from "../../hocs/with-sorting/with-sorting.jsx";
import {getCitiesList, getOffersForCity} from "../../selectors/selectors";
import Header from "../header/header.jsx";
import MainEmpty from "../main-empty/main-empty.jsx";

const SortingWrapped = withSorting(Sorting);

const MainPage = (props) => {
  const {city, offersForCity, citiesList, activeItem, setActiveItem, onCityChange, onSortTypeChange, sortType} = props;
  return <section className="welcome">
    <div style={{display: `none`}}>
      <svg xmlns="http://www.w3.org/2000/svg">
        <symbol id="icon-arrow-select" viewBox="0 0 7 4">
          <path fillRule="evenodd" clipRule="evenodd" d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"></path>
        </symbol>
        <symbol id="icon-bookmark" viewBox="0 0 17 18">
          <path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"></path>
        </symbol>
        <symbol id="icon-star" viewBox="0 0 13 12">
          <path fillRule="evenodd" clipRule="evenodd" d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"></path>
        </symbol>
      </svg>
    </div>

    <div className="page page--gray page--main">
      <Header/>
      {offersForCity.length ?
        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <CitiesList
              activeCity={city}
              onCityChange={(newCity) => onCityChange(newCity)}
              cities={citiesList}
            />
          </div>
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{offersForCity.length} places to stay in {city.name}</b>
                <SortingWrapped onSortTypeChange={(newSortType) => onSortTypeChange(newSortType)} sortType={sortType}/>
                <PlacesList places={offersForCity} setActiveItem={setActiveItem}/>
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map points={offersForCity.map((offer) => [offer.location.latitude, offer.location.longitude])} activePoint={activeItem} city={[city.location.latitude, city.location.longitude]}/>
                </section>
              </div>
            </div>
          </div>
        </main> : <MainEmpty/>}
    </div>
  </section>;
};

MainPage.propTypes = {
  city: cityPropTypes,
  offersForCity: PropTypes.arrayOf(offerPropTypes),
  citiesList: PropTypes.arrayOf(cityPropTypes),
  offers: PropTypes.arrayOf(offerPropTypes),
  activeItem: PropTypes.number.isRequired,
  setActiveItem: PropTypes.func.isRequired,
  onCityChange: PropTypes.func.isRequired,
  onSortTypeChange: PropTypes.func.isRequired,
  sortType: PropTypes.shape({
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }),
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  city: state.data.city,
  offersForCity: getOffersForCity(state),
  citiesList: getCitiesList(state),
  offers: state.data.offers,
  sortType: state.data.sortType,
});

const mapDispatchToProps = (dispatch) => ({
  onCityChange: (city) => {
    dispatch(DataActionCreator.changeCity(city));
  },
  onSortTypeChange: (sortType) => {
    dispatch(DataActionCreator.changeSortType(sortType));
  }
});

export {MainPage};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withActiveItem
)(MainPage);
