import React, { Component } from 'react';
// import { View, Text, AsyncStorage } from 'react-native';
import AppLoading from 'expo-app-loading';
import Slides from '../components/Slides';
import { MMKV } from 'react-native-mmkv'

export const storage = new MMKV()

const SLIDE_DATA = [
  { text: 'Welcome to JobApp', color: '#03A9F4' },
  { text: 'Use this to get a job', color: '#009688' },
  { text: 'Set your location, then swipe away', color: '#03A9F4' }
];

class WelcomeScreen extends Component {
  state = { token: null }

  async componentDidMount() {
    let token = await storage.getString('fb_token');

    if (token) {
      this.props.navigation.navigate('map');
      this.setState({ token });
    } else {
      this.setState({ token: false });
    }
  }

  onSlidesComplete = () => {
    this.props.navigation.navigate('auth');
  }

  render() {
    if (this.state.token === null) {
      return <AppLoading />;
    }

    return (
      <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />
    );
  }
}

export default WelcomeScreen;
