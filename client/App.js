import React, { Component } from 'react';

import { View, Text } from 'react-native';
import * as firebase from 'firebase'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Landing from './components/auth/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers';
import thunk from 'redux-thunk';
import Main from './components/Main';
import AddScreen from './components/main/Add';
import SaveScreen from './components/main/Save';
import CommentScreen from './components/main/Comment';

const Stack = createStackNavigator();

const store = createStore(rootReducer, applyMiddleware(thunk));

const firebaseConfig = {
  apiKey: "AIzaSyDai3DyJTI4vE_o1H0eaPWkdb_ol5fX-cM",
  authDomain: "ins-clone-9885.firebaseapp.com",
  projectId: "ins-clone-9885",
  storageBucket: "ins-clone-9885.appspot.com",
  messagingSenderId: "916140630060",
  appId: "1:916140630060:web:a79f1dc8ba81478454f189",
  measurementId: "G-NYCW2L36Q9"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }

  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center'}}>
          <Text>Loading</Text>
        </View>
      )
    }
    
    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Login" component={Login} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    
    if (loggedIn) {
      return (
        <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Main">
              <Stack.Screen name="Main" component={Main} />
              <Stack.Screen name="AddScreen" component={AddScreen} navigation={this.props.navigation} />
              <Stack.Screen name="Save" component={SaveScreen} navigation={this.props.navigation} />
              <Stack.Screen name="Comment" component={CommentScreen} navigation={this.props.navigation} />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      )
    }
  }
}

export default App

