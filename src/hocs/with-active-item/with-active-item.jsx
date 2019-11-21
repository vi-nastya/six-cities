import React, {PureComponent} from "react";

const withActiveItem = (Component) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: -1,
      };
    }


    render() {
      // const {activeItem} = this.state;
      const setActiveItem = (newActiveItem) => {
        this.setState({activeItem: newActiveItem});
      };

      return <Component
        {...this.props}
        setActiveItem={setActiveItem}
        // getActiveItem={() => activeItem}
      />;
    }
  }

  WithActiveItem.propTypes = {};

  return WithActiveItem;
};

export default withActiveItem;
