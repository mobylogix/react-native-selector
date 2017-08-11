import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  ActionSheetIOS,
  Platform,
  Modal,
  Text,
  TouchableHighlight,
  View,
  ListView,
} from 'react-native';
import {_} from 'underscore';

export default ReactNativeSelector extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      modalVisible: false,
      dataSource: ds.cloneWithRows([]),
    };

    this.showActionSheet = this.showActionSheet.bind(this);
  }

  componentWillReceiveProps(props) {
    if (props && props.buttons) {
      this.setState({
        dataSource: ds.cloneWithRows(props.buttons),
      });
    }
  }

  openSelector() {
    if (Platform.os == 'ios') {
      this.showActionSheet();
    } else {
      this.setModalVisible(true);
    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
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

  renderRow(data) {
    const {navigate} = this.props;

    return (
      <TouchableHighlight onPress={() => navigate(data.screen)}>
        <Text>{data.title}</Text>
      </TouchableHighlight>
    );
  }

  render() {
    const component = React.cloneElement(this.props.children, {
      openSelector: this.openSelector.bind(this)
    });

    return (
      <div>
        {component}

         <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => this.setModalVisible(false)}
          >
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
            />
          </Modal>
      </div>
    );
  }

}

ReactNativeSelector.propTypes = {
  navigate: PropTypes.func.isRequired,
  buttons: PropTypes.array.isRequired,
};
