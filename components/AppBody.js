import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default class AppBody extends React.PureComponent {
  state = {
    coins: [],
    loaded: false
  }

  getCoins = () => {
    return fetch('https://www.cryptocompare.com/api/data/coinlist/')
    .then((responce) => responce.json())
    .then(async (responceJson) => {
      const ticker = await Object.keys(responceJson.Data);

      for (var i = 0; i < ticker.length; i++) {
        var name = await responceJson.Data[ticker[i]].CoinName;
        var price = await this.fetch_api(ticker[i]);
        this.state.coins.push({'name': name, 'ticker': ticker[i], 'price': price});
        if(i == 15) {
          this.setState({loaded:true});
        }
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  fetch_api(coin) {
    var url = "https://min-api.cryptocompare.com/data/pricemulti?fsyms=" + coin.toString() + "&tsyms=CAD";
    return fetch(url)
    .then((responce) => responce.json())
    .then(async (responceJson) => {
      const value = await responceJson[Object.keys(responceJson)[0]]["CAD"];
      if(value == "undefined") {
        return
      }
      else {
        return value;
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  componentDidMount() {
    this.getCoins()
  }

  render() {
    if(this.state.loaded) {
      // console.log('Entered render')
      // console.log(JSON.stringify(this.state.coins))
      return (
        <View style={styles.container}>
          <FlatList
            style={{ flex: 1 }}
            data={this.state.coins}
            renderItem={({item}) =>
            <View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Text style={styles.nameText}> {item.name} </Text>
                <Text style={styles.priceText}> ${item.price} </Text>
              </View>
              <View style={{flex:1}}>
                <Text style={styles.tickerText}> {item.ticker} </Text>
              </View>
              <View style={styles.border}/>
            </View>}

          />
        </View>
      );
    }
    else {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Loading...</Text>
          <Text style={styles.text}>This may take some time!</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    height: 30,
    color: 'white',
    fontSize: 15,
  },
  nameText: {
    flex: 1,
    color: 'white',
    fontSize: 22,
    textAlign: 'left',
  },
  tickerText: {
    //backgroundColor: 'blue',
    color: 'white',
    fontSize: 15,
  },
  priceText: {
    //backgroundColor: 'red',
    color: 'white',
    fontSize: 30,
  },
  border: {
    marginTop: 15,
    marginBottom: 15,
    borderBottomStartRadius: 1,
    borderBottomEndRadius: 1,
    borderBottomWidth: 0.3,
    borderColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'stretch',
  },
});
