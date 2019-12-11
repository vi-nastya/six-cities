import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Operation} from "../../reducer";
import {getFavoritePlaces} from "../../selectors/selectors";

const FavoritesList = (props) => {
  const {favoritesData} = props;
  // need PureComponent, fetch data in componentDidMount
  return <div></div>;
};

FavoritesList.propTypes = {
  favoritesData: PropTypes.array.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, ownProps, {
    favoritesData: getFavoritePlaces(state),
  });
};

const mapDispatchToProps = (dispatch) => ({
  onLoadFavorites: () => {
    dispatch(Operation.loadFavorites());
  }
});

export {FavoritesList};

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesList);
