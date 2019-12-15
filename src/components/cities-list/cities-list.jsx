import React from "react";
import PropTypes from "prop-types";
import {cityPropTypes} from "../../props-types-validation";

const CitiesList = (props) => {
  const {cities, activeCity, onCityChange} = props;

  return <section className="locations container">
    <ul className="locations__list tabs__list">
      {cities.map((city) => {
        return <li key={`city-` + city.name} className="locations__item" onClick={() => onCityChange(city)}>
          <a className={`locations__item-link tabs__item ${city.name === activeCity.name && `tabs__item--active`}`} href="#">
            <span>{city.name}</span>
          </a>
        </li>;
      })}
    </ul>
  </section>;

};

CitiesList.propTypes = {
  activeCity: cityPropTypes,
  onCityChange: PropTypes.func.isRequired,
  cities: PropTypes.arrayOf(cityPropTypes).isRequired,
};

export {CitiesList};

export default CitiesList;
