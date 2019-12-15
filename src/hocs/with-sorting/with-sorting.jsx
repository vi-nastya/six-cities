import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {SORT_TYPES} from "../../constants";

const withSorting = (Component) => {
  class WithSorting extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeSortType: this.props.sortType,
        isOpen: false,
      };

      this._toggleSortListHandler = this._toggleSortListHandler.bind(this);
      this._sortTypeClickHandler = this._sortTypeClickHandler.bind(this);
    }


    render() {
      return <Component
        {...this.props}
        isOpen={this.state.isOpen}
        activeSortType={this.state.activeSortType}
        toggleSortListHandler={this._toggleSortListHandler}
        sortTypeClickHandler = {this._sortTypeClickHandler}
      />;
    }

    _toggleSortListHandler() {
      this.setState({isOpen: this.state.isOpen ? false : true});
    }

    _sortTypeClickHandler(evt) {
      const clickedTypeText = evt.target.textContent;
      const newSortType = SORT_TYPES.find((sortType) => sortType.text === clickedTypeText);
      this.setState({isOpen: false, activeSortType: newSortType});
      this.props.changeSortingHandler(newSortType);
    }

  }

  WithSorting.propTypes = {
    changeSortingHandler: PropTypes.func.isRequired,
    sortType: PropTypes.shape({
      name: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }),
  };

  return WithSorting;
};

export default withSorting;
