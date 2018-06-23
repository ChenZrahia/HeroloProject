import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import InitRout from './src/InitRout';

export default class App extends Component {
  render() {
    return (
      <InitRout />
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
});