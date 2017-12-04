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
import { StackNavigator, NavigationActions, addNavigationHelpers } from 'react-navigation';
import DictStyle from './constants/styleDict';
import { stackConfig, stackNavigatorConfig } from './routerConfig';
import Loading from './components/loading/loadingView';

const AppNavigator = StackNavigator(stackConfig, stackNavigatorConfig);// eslint-disable-line

class RouterManager extends Component {
  constructor(props) {
    super(props);
    this.resetRouteTo = this.resetRouteTo.bind(this);
    this.resetActiveRouteTo = this.resetActiveRouteTo.bind(this);
    this.backTo = this.backTo.bind(this);
    this.setParamsWrapper = this.setParamsWrapper.bind(this);
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
    const { navigationState } = this.props;

    if (navigationState.index > 0) {
      const previousRoute = navigationState.routes[navigationState.index - 1];
      this.backTo(previousRoute.routeName);
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

  resetRouteTo(route, params) {
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch(
        NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: route, params })],
        })
      );
    }
  }

  resetActiveRouteTo(routeArray, activeIndex) {
    const { dispatch } = this.props;
    if (dispatch) {
      const actionsArray = [];
      for (let i = 0; i < routeArray.length; i++) {
        actionsArray.push(NavigationActions.navigate({ routeName: routeArray[i] }));
      }

      const resetAction = NavigationActions.reset({
        index: activeIndex,
        actions: actionsArray,
      });
      dispatch(resetAction);
    }
  }

  backTo(routeName) {
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch(
        NavigationActions.back({
          routeName: routeName
        })
      );
    }
  }

  setParamsWrapper(params, routeName) {
    const { dispatch } = this.props;
    if (dispatch) {
      const setParamsAction = NavigationActions.setParams({
        params: params,
        routeName: routeName
      });
      dispatch(setParamsAction);
    }
  }

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
            resetRouteTo: (route, params) => this.resetRouteTo(route, params),
            resetActiveRouteTo: (routeArray, activeIndex) => this.resetActiveRouteTo(routeArray, activeIndex),
            backTo: (key) => this.backTo(key),
            setParamsWrapper: (params, key) => this.setParamsWrapper(params, key)
          })}
          screenProps={screenProps}
        />
        <Loading
          isVisible={screenProps.showLoading}
          mode="alipay"
          overlayColor="#f2f2f2"
          opacity={0.5}
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
