import React from 'react';
import {createAppContainer } from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from '../screens/HomeScreen'
import ExploreScreen from '../screens/ExploreScreen';

export default class Signedin extends React.Component {
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


const AppContainer = createAppContainer(bottomTabNavigator);