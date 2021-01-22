import React, { Component } from 'react'
import { View, Text, TabBarIOS } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser } from '../redux/actions/index'

import FeedScreen from './main/Feed'

const Tab = createMaterialBottomTabNavigator();

export class Main extends Component {

    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <Tab.Navigator>
                <Tab.Screen name="Feed" component={FeedScreen} 
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={26} />
                        )
                    }}/>
                {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
            </Tab.Navigator>
        )
    }
}

const mapStatesToProps = (store) => ({
    currentUser: store.userState.currentUser
})

const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser}, dispatch);

export default connect(null, mapDispatchProps)(Main);
