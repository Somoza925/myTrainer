import React, {useState} from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from './src/screens/HomeScreen';
import CalendarScreen from './src/screens/CalendarScreen'
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/components/Signup';
import ChatNavigator from './src/navigators/ChatNavigator';

export default class App extends React.Component {
	
	render() {
		return (
			<AppContainer 
			/>
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
		Calendar: {
			screen: CalendarScreen,
			navigationOptions: {
				tabBarIcon: ({ tintColor }) => (
					<Icon name="calendar" size={25} color={tintColor} />
				)
			}
		},
		Chat: {
			screen: ChatNavigator,
			navigationOptions: {
				tabBarIcon: ({ tintColor }) => (
					<Icon name="wechat" size={25} color={tintColor} />
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
	Signup: SignupScreen,
	App: bottomTabNavigator
}, {
	initialRouteName: 'App', 
	// initialRouteName: 'App',
	defaultNavigationOptions: {
		title: 'myTrainer',
		tabBarVisible: false
	}
});


const AppContainer = createAppContainer(navigator);