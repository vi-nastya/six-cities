import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {MIN_COMMENT_LENGTH, MAX_COMMENT_LENGTH} from "../../constants";

const withReviewSubmit = (Component) => {
  class WithReviewSubmit extends PureComponent {
    constructor(props) {
      super(props);

      this._formRef = React.createRef();

      this.state = {
        review: ``,
        rating: ``,
        isValid: false,
      };

      this._onInputChange = this._onInputChange.bind(this);
      this._validateForm = this._validateForm.bind(this);
      this._resetForm = this._resetForm.bind(this);
      this._handleFormSubmit = this._handleFormSubmit.bind(this);
    }

    _onInputChange(evt) {
      const fieldName = evt.target.name;
      const fieldValue = evt.target.value;
      this.setState(
          {[fieldName]: fieldValue},
          () => this._validateForm()
      );
    }

    _validateForm() {
      if ((this.state.rating !== ``) && (this.state.review.length >= MIN_COMMENT_LENGTH) && (this.state.review.length <= MAX_COMMENT_LENGTH)) {
        this.setState({isValid: true});
      } else {
        this.setState({isValid: false});
      }
    }

    _resetForm() {
      this.setState({
        rating: ``,
        review: ``,
        isValid: false
      });

      this._formRef.current.reset();
    }

    _handleFormSubmit(evt) {
      evt.preventDefault();
      const {onFormSubmit} = this.props;

      const newCommentData = {
        rating: this.state.rating,
        comment: this.state.review,
      };

      onFormSubmit(newCommentData, this._resetForm);
    }

    render() {
      return <Component
        {...this.props}
        isValid={this.state.isValid}
        onInputChange={this._onInputChange}
        formRef={this._formRef}
        onFormSubmit={this._handleFormSubmit}
      />;
    }
  }

  WithReviewSubmit.propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
  };

  return WithReviewSubmit;
};

export default withReviewSubmit;
