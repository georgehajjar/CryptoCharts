import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class AppFooter extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Footer</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: 'white'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
