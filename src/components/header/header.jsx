import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

const Header = (props) => {
  const userEmail = props.userEmail;
  return <header className="header">
    <div className="container">
      <div className="header__wrapper">
        <div className="header__left">
          <Link className="header__logo-link" to="/">
            <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
          </Link>
        </div>
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item user">
              {userEmail ? (
                <Link to="/favorites" className="header__nav-link header__nav-link--profile" href="#">
                  <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                  <span className="header__user-name user__name">{userEmail}</span>
                </Link>
              ) : (
                <Link to="/login" className="header__login">Sign in</Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>;
};

Header.propTypes = {
  userEmail: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  userEmail: state.user ? state.user.email : ``,
});


export {Header};

export default connect(mapStateToProps)(Header);
