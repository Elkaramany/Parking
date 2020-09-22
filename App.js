import React from 'react';
import { createAppContainer} from 'react-navigation';
import { StyleSheet, View, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Provider} from 'react-redux';
import RootStack from './Navigators';
import {createStore, compose, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import reducers from './reducers';
import {PersistGate} from 'redux-persist/lib/integration/react';
import firebase from 'firebase';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: entireScreenWidth / 380});

const AppContainer = createAppContainer(RootStack);

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: []
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(persistedReducer, {},
  compose(
      applyMiddleware(ReduxThunk)) 
  );

export default class App extends React.Component{
  //firebase
  componentDidMount(){
    if(!firebase.apps.length){
      var firebaseConfig = {
        apiKey: "AIzaSyAkHUgqe91bR3W6kS_cMzYPl1n8ZIHgKqk",
        authDomain: "park-5a7e6.firebaseapp.com",
        databaseURL: "https://park-5a7e6.firebaseio.com",
        projectId: "park-5a7e6",
        storageBucket: "park-5a7e6.appspot.com",
        messagingSenderId: "982131558597",
        appId: "1:982131558597:web:91807e3094649fc1ad88ac"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
  }
}

  render(){
  const persistor = persistStore(store);
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <PersistGate persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </View>
    </Provider>
  );}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});