import { createDrawerNavigator, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';


import Home from './home/components';
import Search from './search/components';
import Map from './map/components';
import Notification from './notification/components';
import Follow from './follow/components';
import AuthLoading from './auth_loading/components';
import Login from './login/containers';
import SignUp from './sign_up/containers';



const RouteBottomTabConfig = {
        Home: {
                screen: Home,
        },
        Search: {
                screen: Search,
        },
        Map: {
                screen: Map,
        },
        Notification: {
                screen: Notification,
        },
        Follow: {
                screen: Follow,
        }
};


const BottomTabNavigatorConfig = {
        initialRouteName: 'Home',
        activeColor: '#3faf28',
        inactiveColor: 'gray',
        barStyle: { backgroundColor: 'white' },
};

const BottomTabNavigator = createMaterialBottomTabNavigator(RouteBottomTabConfig, BottomTabNavigatorConfig);


const AuthStack = createStackNavigator({
        Login: {
                screen: Login,
                navigationOptions: {
                        header: null,
                },
        },
        SignUp: {
                screen: SignUp,
                navigationOptions: {
                        header: null,
                },
        }
},
        {
                initialRouteName: 'Login'
        });

export default AppNavigator = createSwitchNavigator(
        {
                AuthLoading: {
                        screen: AuthLoading
                },
                App: {
                        screen: BottomTabNavigator
                },
                Auth: {
                        screen: AuthStack
                }
        },
        {
                initialRouteName: 'App',
        }
);

