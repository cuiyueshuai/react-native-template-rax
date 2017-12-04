/**
 * Created by dpcui on 29/11/2017.
 */

import Login from './pages/login';
import Home from './pages/home';

const stackConfig = {
  Login: { screen: Login },
  Home: { screen: Home }
};

const stackNavigatorConfig = {
  initialRouteName: 'Login',
  navigationOptions: {
    headerBackTitle: null,
    headerTintColor: 'white',
    showIcon: true,
    swipeEnabled: false,
    animationEnabled: false,
    headerStyle: {
      backgroundColor: '#AEAEAE'
    }
  },
  mode: 'card',
  paths: 'rax/: Login',
  headerMode: 'float',
  transitionConfig: () => {},
  onTransitionStart: () => {},
  onTransitionEnd: () => {}
};

export {
  stackConfig,
  stackNavigatorConfig,
};
