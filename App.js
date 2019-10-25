import React from 'react';
import {createAppContainer, createSwitchNavigator } from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from './src/screens/HomeScreen';
import ExploreScreen from './src/screens/ExploreScreen';
import LoginScreen from './src/screens/LoginScreen';

export default class App extends React.Component {
  render() {
    return (
        <AppContainer />
    ); 
  }
}

const bottomTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="home" size={25} color={tintColor} />
        )
      }
    },
    Explore: {
      screen: ExploreScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="search" size={25} color={tintColor} />
        ),
      }
    },
  },
  {
    initialRouteName: 'Home',
    tabBarOptions: {
      activeTintColor: '#eb6e3d'
    }
  }
);

const navigator = createSwitchNavigator({
  Login: LoginScreen,
  App: bottomTabNavigator
}, {
  initialRouteName: 'Login',
  defaultNavigationOptions: { 
    title: 'myTrainer',
    tabBarVisible: false
  }
});

const AppContainer = createAppContainer(navigator);