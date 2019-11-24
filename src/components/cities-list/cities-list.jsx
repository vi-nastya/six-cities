import React from "react";
import PropTypes from "prop-types";

const CitiesList = (props) => {
  const {cities, activeCity, changeCityHandler} = props;

  return <section className="locations container">
    <ul className="locations__list tabs__list">
      {cities.map((city) => {
        return <li key={`city-` + city} className="locations__item" onClick={() => changeCityHandler(city)}>
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
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export {CitiesList};

export default CitiesList;
