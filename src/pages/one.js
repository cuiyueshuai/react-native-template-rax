/**
 * Created by dpcui on 11/04/2018.
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
  'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
  'Shake or press menu button for dev menu',
});

class Login extends Component {

  static navigationOptions = {
    title: 'RoAny Template'
  };

  toPage = () => {
    const { navigation } = this.props;
    if (navigation) {
      navigation.navigate('TwoPage');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          欢迎来到 RoAny Template!
        </Text>
        <Text style={styles.instructions}>
          进入src目录，开始开发自己的RoAnyApp
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
        <Button
          onPress={this.toPage}
          title="点击跳转"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default Login;
