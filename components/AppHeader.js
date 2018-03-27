import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';

export default class AppHeader extends React.Component {
  render() {
    return (
      <View>
        <StatusBar barStyle="light-content"/>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>cryptocharts</Text>
        </View>
        <View style={styles.headerBorder}/>
        <View style={styles.box}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 25,
    height: 75,
    alignItems: 'center',
    backgroundColor: 'black',
  },
  header: {
    fontFamily: 'Futura',
    fontSize: 30,
    color: '#F36A2E',
    fontWeight: 'normal',
  },
  headerBorder: {
    borderBottomStartRadius: 1,
    borderBottomEndRadius: 1,
    borderBottomWidth: 2,
    borderColor: '#F36A2E',
  },
  box: {
    height: 10,
    backgroundColor: 'black'
  }
});
