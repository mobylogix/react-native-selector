import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  ActionSheetIOS,
  Platform,
} from 'react-native';
import {_} from 'underscore';

export default ReactNativeSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };

    this.showActionSheet = this.showActionSheet.bind(this);
  }

  openSelector() {
    if (Platform.os == 'ios') {
      this.showActionSheet();
    } else {

    }
  }

  showActionSheet() {
    const { navigate, buttons } = this.props;

    const BUTTONS = _.pluck(buttons, 'title');
    const CANCEL_INDEX = BUTTONS.indexOf("Cancel") || BUTTONS.indexOf("Close") || BUTTONS.indexOf("No") || BUTTONS.indexOf("Done") || BUTTONS.indexOf("Next");

    ActionSheetIOS.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: CANCEL_INDEX,
    },
    (buttonIndex) => {
        let route = buttons[buttonIndex];
        navigate(route.screen);
    });
  }

  render() {
    const component = React.cloneElement(this.props.children, {
      openSelector: this.openSelector.bind(this)
    });

    return (
      <div>
        {component}
      </div>
    );
  }

}

ReactNativeSelector.propTypes = {
  navigate: PropTypes.func.isRequired,
  buttons: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};
