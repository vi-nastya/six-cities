import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer";

const CitiesList = (props) => {
  const {offers, activeCity, changeCityHandler} = props;
  const cities = [...new Set(offers.map((offer) => offer.city))];

  return <section className="locations container">
    <ul className="locations__list tabs__list">
      {cities.map((city) => {
        return <li key={`city-` + city} className="locations__item" onClick={() => changeCityHandler(offers, city)}>
          <a className={`locations__item-link tabs__item ${city === activeCity && `tabs__item--active`}`} href="#">
            <span>{city}</span>
          </a>
        </li>;
      })}
    </ul>
  </section>;

};

CitiesList.propTypes = {
  activeCity: PropTypes.string.isRequired,
  changeCityHandler: PropTypes.func.isRequired,
  offers: PropTypes.arrayOf(PropTypes.object).isRequired // TODO: add shape
};

const mapStateToProps = (state) => Object.assign({}, {
  activeCity: state.city,
  offers: state.offers
});

const mapDispatchToProps = (dispatch) => ({
  changeCityHandler: (offers, city) => {
    dispatch(ActionCreator.changeCity(city));
    dispatch(ActionCreator.getOffers(offers, city));
  }
});

export {CitiesList};

export default connect(mapStateToProps, mapDispatchToProps)(CitiesList);
