/**
 * Created by dpcui on 30/11/2017.
 */

import React, { Component } from 'react';
import {
  View,
  StatusBar,
  Platform,
  BackHandler,
  ToastAndroid,
} from 'react-native';
import { connect } from 'react-redux';
import dismissKeyboard from 'react-native-dismiss-keyboard';
import { StackNavigator, addNavigationHelpers, NavigationActions } from 'react-navigation';
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers';
import DictStyle from './constants/globalStyle';
import { stackConfig, stackNavigatorConfig } from './routerConfig';

const AppNavigator = StackNavigator(stackConfig, stackNavigatorConfig);// eslint-disable-line
const addListener = createReduxBoundAddListener('app');

class RouterManager extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }

  onBackAndroid = () => {
    const { navigationState, dispatch } = this.props;

    if (navigationState.index > 0) {
      dispatch(NavigationActions.back());
      return true;
    } else { // eslint-disable-line
      if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
        return false;
      }

      this.lastBackPressed = Date.now();
      ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
      return true;
    }
  };

  render() {
    const { dispatch, navigationState, screenProps } = this.props;
    return (
      <View
        style={{ flex: 1, backgroundColor: DictStyle.colorSet.pageBackground }}
        onStartShouldSetResponder={() => dismissKeyboard()}
      >
        <StatusBar barStyle="light-content" />
        <AppNavigator
          navigation={addNavigationHelpers({
            dispatch,
            state: navigationState,
            addListener,
          })}
          screenProps={screenProps}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const newNavigationState = state.navReducer;
  return {
    navigationState: newNavigationState,
    screenProps: newNavigationState.screenProps
  };
};

export default connect(mapStateToProps)(RouterManager);
