/**
 * @format
 */

import { AppRegistry } from 'react-native';
import React, { Component } from 'react';
import { name as appName } from './app.json';

import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import Home from './src/home/components';
import Search from './src/search/components';
import Map from './src/map/components';
import Notification from './src/notification/components';
import Follow from './src/follow/components';

import RootSaga from './src/root_saga';
import RootReducer from './src/root_reducer';

const RouteConfig = {
        Home: {
                screen: Home
        },
        Search: {
                screen: Search
        },
        Map: {
                screen: Map
        },
        Notification: {
                screen: Notification
        },
        Follow: {
                screen: Follow
        }
};

const BottomTabNavigatorConfig = {
        initialRouteName: 'Home',
        defaultNavigationOptions: ({ navigation }) => ({

        }),
        order: ['Home', 'Search', 'Map', 'Notification', 'Follow'],
        tabBarOptions: {
                activeTintColor: 'black',
                inactiveTintColor: 'gray',
        },
};


const AppNavigator = createBottomTabNavigator(RouteConfig, BottomTabNavigatorConfig);

const sagaMiddleware = createSagaMiddleware();

const store = createStore(RootReducer, applyMiddleware(sagaMiddleware));

const Navigation = createAppContainer(AppNavigator);

sagaMiddleware.run(RootSaga);

export default class App extends Component {
        render () {
                return (
                        <Provider store={store}>
                                <Navigation />
                        </Provider>
                );
        }
}

AppRegistry.registerComponent(appName, () => App);
