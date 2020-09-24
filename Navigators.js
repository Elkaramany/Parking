import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import React from 'react';
import Home from './Components/Home';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AllSpaces from './Components/AllSpaces';
import MyListings from './Components/MyListings';
import AddList from './Components/AddList';
import Signup from './Components/Signup';
import Checkout from './Components/Checkout';

const ICON_SIZE = 28;
const ACTIVE_TINT_COLOR = '#338329';

const RootTab = createBottomTabNavigator({
    AllSpaces: {screen: AllSpaces,
      navigationOptions:{
        tabBarIcon:({tintColor}) =>{
            return <Icon name={'format-list-bulleted'} size={ICON_SIZE} color={tintColor} />
        },
    }
    },
    MyListings: {screen: MyListings,
      navigationOptions:{
      tabBarIcon:({tintColor}) =>{
          return <Icon name={'playlist-edit'} size={ICON_SIZE} color={tintColor} />
      },
  }}
  },
  {
  tabBarOptions: {
    labelStyle: { fontSize: 18, marginTop: 5},
    tabStyle: {marginTop: 10},
    activeTintColor: ACTIVE_TINT_COLOR,
  },
  defaultNavigationOptions:{
    header: null,
  }
  });
  
const RootStack = createStackNavigator({
    Home: {screen: Home},
    Signup:{screen:Signup},
    AddList:{screen: AddList},
    Checkout:{screen: Checkout},
    RootTab: {screen: RootTab},
    },
    {
    defaultNavigationOptions:{
        headerShown: false
    },
    });

export default RootStack;