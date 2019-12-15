import React from "react";
import PropTypes from "prop-types";
import {SORT_TYPES} from "../../constants";

const Sorting = (props) => {
  const {isOpen, activeSortType, toggleSortListHandler, sortTypeClickHandler} = props;
  return <form className="places__sorting" action="#" method="get">
    <span className="places__sorting-caption">Sort by </span>
    <span className="places__sorting-type" tabIndex="0" onClick={toggleSortListHandler}>
      {activeSortType.text}
      <svg className="places__sorting-arrow" width="7" height="4">
        <use xlinkHref="#icon-arrow-select"></use>
      </svg>
    </span>
    <ul className={`places__options places__options--custom ${isOpen ? `places__options--opened` : ``}`} onClick={sortTypeClickHandler}>
      {SORT_TYPES.map((sortType, index) =>
        <li key={`sort-type-${index}`}
          className={`places__option ${sortType.name === activeSortType ? `places__option--active` : ``}`}
          tabIndex="0">
          {sortType.text}
        </li>
      )}
    </ul>
  </form>;
};


Sorting.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  activeSortType: PropTypes.shape({
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }),
  toggleSortListHandler: PropTypes.func.isRequired,
  sortTypeClickHandler: PropTypes.func.isRequired,
};

export default Sorting;
