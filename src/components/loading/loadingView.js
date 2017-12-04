/**
 * Created by cui on 9/4/16.
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  ActivityIndicator
} from 'react-native';

class Loading extends PureComponent {

  static propTypes = {
    mode: PropTypes.oneOf(['native', 'alipay']),
    isVisible: PropTypes.bool.isRequired,
    color: PropTypes.string,
    size: PropTypes.oneOf(['small', 'large']),
    overlayColor: PropTypes.string,
    panelColor: PropTypes.string,
    opacity: PropTypes.number
  };

  static defaultProps = {
    mode: 'native',
    isVisible: false,
    color: '#000',
    size: 'large',
    overlayColor: 'rgba(0, 0, 0, 0)',
    panelColor: 'rgba(200, 200, 200, 0.3)',
    opacity: 1,
  };

  _renderSpinner = () => {
    const spinnerStyle = {
      width: 150,
      height: 100,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: this.props.panelColor
    };

    switch (this.props.mode) {
      case 'alipay':
        return (
          <View
            style={spinnerStyle}
          />
        );
      default:
        return (
          <View style={spinnerStyle}>
            <ActivityIndicator color={this.props.color} size={this.props.size} />
          </View>
        );
    }
  };

  render() {
    if (this.props.isVisible) {
      return (
        <View
          ref="Loading"
          style={[{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: this.props.overlayColor,
            opacity: this.props.opacity,
          }]}
          underlayColor={this.props.overlayColor}
          activeOpacity={1}
          {...this.props}
        >
          {this._renderSpinner()}
        </View>
      );
    }

    return (
      <View />
    );
  }
}

export default Loading;
