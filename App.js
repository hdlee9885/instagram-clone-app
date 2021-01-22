import { StatusBar } from 'expo-status-bar';
import React from 'react';

import * as firebase from 'firebase'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Landing from './components/auth/Landing';
import Register from './components/auth/Register';

const Stack = createStackNavigator();

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
  firebase.initializeApp(firebaseConfig)
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

