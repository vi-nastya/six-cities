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

      this._handleToggleSortList = this._handleToggleSortList.bind(this);
      this._handleSortTypeClick = this._handleSortTypeClick.bind(this);
    }

    _handleToggleSortList() {
      this.setState({isOpen: this.state.isOpen ? false : true});
    }

    _handleSortTypeClick(evt) {
      const clickedTypeText = evt.target.textContent;
      const newSortType = SORT_TYPES.find((sortType) => sortType.text === clickedTypeText);
      this.setState({isOpen: false, activeSortType: newSortType});
      this.props.onSortTypeChange(newSortType);
    }

    render() {
      return <Component
        {...this.props}
        isOpen={this.state.isOpen}
        activeSortType={this.state.activeSortType}
        onSortToggle={this._handleToggleSortList}
        onSortChange = {this._handleSortTypeClick}
      />;
    }
  }

  WithSorting.propTypes = {
    onSortTypeChange: PropTypes.func.isRequired,
    sortType: PropTypes.shape({
      name: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }),
  };

  return WithSorting;
};

export default withSorting;
