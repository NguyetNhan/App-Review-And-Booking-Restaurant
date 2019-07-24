/**
 * @format
 */

import { AppRegistry } from 'react-native';
import React, { Component } from 'react';
import { name as appName } from './app.json';

import { createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import AppNavigator from './src/navigators';

import RootSaga from './src/root_saga';
import RootReducer from './src/root_reducer';



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
