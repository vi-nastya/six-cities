import React, {PureComponent} from "react";
import PropTypes from "prop-types";

const MIN_COMMENT_LENGTH = 50;
const MAX_COMMENT_LENGTH = 300;

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
      this._formSubmitHandler = this._formSubmitHandler.bind(this);
    }


    render() {
      return <Component
        {...this.props}
        isValid={this.state.isValid}
        onInputChange={this._onInputChange}
        formRef={this._formRef}
        onFormSubmit={this._formSubmitHandler}
      />;
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

    _formSubmitHandler(evt) {
      evt.preventDefault();
      const {onFormSubmit} = this.props;

      const newCommentData = {
        rating: this.state.rating,
        comment: this.state.review,
      };

      onFormSubmit(newCommentData, this._resetForm);
    }

  }

  WithReviewSubmit.propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
  };

  return WithReviewSubmit;
};

export default withReviewSubmit;
