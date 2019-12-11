import React, {PureComponent} from "react";
import {SORT_TYPES} from "../../components/sorting/sorting.jsx";

const withSorting = (Component) => {
  class WithSorting extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeSortType: SORT_TYPES[0],
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
    }

  }

  WithSorting.propTypes = {};

  return WithSorting;
};

export default withSorting;
