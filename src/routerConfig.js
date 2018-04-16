/**
 * Created by dpcui on 29/11/2017.
 */

import OnePage from './pages/one';
import TwoPage from './pages/two';

const stackConfig = {
  OnePage: { screen: OnePage },
  TwoPage: { screen: TwoPage }
};

const stackNavigatorConfig = {
  initialRouteName: 'OnePage',
  navigationOptions: {
    headerBackTitle: null,
    headerTintColor: 'white',
    showIcon: true,
    swipeEnabled: false,
    animationEnabled: false,
    headerStyle: {
      backgroundColor: '#38568d',
    }
  },
  mode: 'card',
  headerMode: 'float',
};

export {
  stackConfig,
  stackNavigatorConfig,
};
