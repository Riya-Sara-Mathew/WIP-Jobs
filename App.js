import React from 'react';
import { Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import * as Notifications from 'expo-notifications';
import registerForNotifications from './services/push_notifications';
import store from './store';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import SettingsScreen from './screens/SettingsScreen';
import ReviewScreen from './screens/ReviewScreen';

const TabNavigator = createBottomTabNavigator();
const StackNavigator = createStackNavigator();

export default class App extends React.Component {
    componentDidMount() {
        registerForNotifications();
        Notifications.addNotificationReceivedListener((notification) => {
            const { request: { content: { body } } } = notification;
            Alert.alert(
                'New Push Notification',
                body,
                [{ text: 'Ok.' }]
            );
        });
    }

    render() {
        const MainNavigator = () => (
            <TabNavigator.Navigator>
                <TabNavigator.Screen name="welcome" component={WelcomeScreen} />
                <TabNavigator.Screen name="auth" component={AuthScreen} />
                <TabNavigator.Screen name="main" component={MainTab} />
            </TabNavigator.Navigator>
        );

        const MainTab = () => (
            <TabNavigator.Navigator tabBarOptions={{ labelStyle: { fontSize: 12 } }}>
                <TabNavigator.Screen name="map" component={MapScreen} />
                <TabNavigator.Screen name="deck" component={DeckScreen} />
                <TabNavigator.Screen name="review" component={ReviewStack} />
            </TabNavigator.Navigator>
        );

        const ReviewStack = () => (
            <StackNavigator.Navigator>
                <StackNavigator.Screen name="review" component={ReviewScreen} />
                <StackNavigator.Screen name="settings" component={SettingsScreen} />
            </StackNavigator.Navigator>
        );

        return (
            <Provider store={store}>
                <MainNavigator />
            </Provider>
        );
    }
}