import { createStore } from 'redux'

function coins(state = initial, action) {
  switch (action.type) {
    case 'TOGGLE':
      state.finished = !state.finished;
      break;
    case 'ADD_COIN':
      state.coins.push(action.text);
      break;
    case 'REMOVE_COIN':
      //state.coins.indexOf(action.text).then((index) => state.coins.splice(index))
      break;
    case 'ADD_FAV':
      state.coins.push(action.text);
      break;
    case 'REMOVE_FAV':
      //state.fav.indexOf(action.text).then((index) => state.fav.splice(index, 1))
      break;

    default:
      console.log(state);
      return state
  }
}

function getCoins() {
  return fetch('https://www.cryptocompare.com/api/data/coinlist/')
  .then((responce) => responce.json())
  .then((responceJson) => {
    return Object.keys(responceJson.Data);
  })
  .catch((error) => {
    console.error(error);
  });
}

function getPrices(coins) {
  var i;
  for (i = 0; i < 10; i++){
    fetch_api(i, coins)
  }
  store.dispatch({
    type: 'TOGGLE'
  })
}

function fetch_api(i, coins) {
  var url = "https://min-api.cryptocompare.com/data/pricemulti?fsyms=" + coins[i].toString() + "&tsyms=CAD";
  return fetch(url)
  .then((responce) => responce.json())
  .then((responceJson) => {
    data = [Object.keys(responceJson)[0], responceJson[Object.keys(responceJson)[0]]["CAD"]]
    if(data[0] == "Response"){
      return
    }
    store.dispatch({
      type: 'ADD_COIN',
      text: data
    })
  })
  .catch((error) => {
    console.error(error);
  });
}

const initial = {
  coins: [],
  finished: false,
  fav: []
}

let store = createStore(coins, initial)

console.log(store.getState())
getCoins().then((data) => getPrices(data));

export default store;
