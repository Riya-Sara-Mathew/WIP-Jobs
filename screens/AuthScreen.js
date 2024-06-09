import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import {facebookLogin} from "../actions";

class AuthScreen extends Component {
  componentDidMount() {
    this.props.facebookLogin();
  }

  componentDidUpdate() {
    this.onAuthComplete(this.props);
  }

  onAuthComplete(props) {
    if (props.token) {
      this.props.navigation.navigate('map');
    }
  }

  render() {
    return (
        <View />
    );
  }
}

function mapStateToProps({ auth }) {
  return { token: auth.token, facebookLogin: facebookLogin };
}

export default connect(mapStateToProps, actions)(AuthScreen);
