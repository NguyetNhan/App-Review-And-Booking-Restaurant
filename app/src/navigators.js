import { createStackNavigator, createSwitchNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { colorMain } from './config';

import Home from './home/containers';
import Search from './search/containers';
import Notification from './notification/containers';
import Profile from './profile/components';
import AuthLoading from './auth_loading/components';
import Login from './login/containers';
import SignUp from './sign_up/containers';
import RegisterRestaurant from './client/register_restaurant/containers';
import ConfirmRestaurant from './admin/confirm_restaurant/containers';
import Overview from './detail_restaurant/overview/containers';
import Menu from './detail_restaurant/menu/containers';
import Review from './detail_restaurant/review/containers';
import Chat from './chat/containers';
import Order from './order/containers';
import Map from './map/containers';
import Deal from './deal/containers';
import DetailDeal from './detail_deal/containers';
import ScanQrOrder from './admin_restaurant/scan_qr_order/containers';
import AddReview from './client/add_review/containers';
import Person from './person/components';
import DetailChat from './detail_chat/containers';


const RouteBottomTabConfig = {
        Home: {
                screen: Home,
        },
        Chat: {
                screen: Chat,
        },
        Map: {
                screen: Map,
        },
        Notification: {
                screen: Notification,
        },
        Profile: {
                screen: Profile,
        }
};

const BottomTabNavigatorConfig = {
        initialRouteName: 'Home',
        activeColor: colorMain,
        inactiveColor: 'black',
        barStyle: { backgroundColor: 'white' },
        order: ['Home', 'Chat', 'Map', 'Notification', 'Profile']
};

const BottomTabNavigator = createMaterialBottomTabNavigator(RouteBottomTabConfig, BottomTabNavigatorConfig);

const DetailRestaurant = createMaterialTopTabNavigator(
        {
                Overview: {
                        screen: Overview
                },
                Menu: {
                        screen: Menu
                },
                Review: {
                        screen: Review
                }
        }, {
        initialRouteName: 'Overview',
        tabBarOptions: {
                inactiveTintColor: 'gray',
                activeTintColor: colorMain,
                labelStyle: {
                        fontFamily: 'OpenSans-Bold',
                        textTransform: 'capitalize'
                },
                style: {
                        backgroundColor: 'white'
                },
        },
        tabBarPosition: 'bottom',
}
);


const MainNavigatorClient = createStackNavigator(
        {
                App: {
                        screen: BottomTabNavigator,
                        navigationOptions: {
                                header: null,
                        },
                },
                DetailRestaurant: {
                        screen: DetailRestaurant,
                        navigationOptions: {
                                header: null,
                        },
                },
                Search: {
                        screen: Search,
                        navigationOptions: {
                                header: null,
                        },
                },
                Order: {
                        screen: Order,
                        navigationOptions: {
                                header: null,
                        },
                },
                Deal: {
                        screen: Deal,
                        navigationOptions: {
                                header: null,
                        },
                },
                DetailDeal: {
                        screen: DetailDeal,
                        navigationOptions: {
                                header: null,
                        },
                },
                AddReview: {
                        screen: AddReview,
                        navigationOptions: {
                                header: null,
                        },
                },
                RegisterRestaurant: {
                        screen: RegisterRestaurant,
                        navigationOptions: {
                                header: null,
                        },
                },
                Person: {
                        screen: Person,
                        navigationOptions: {
                                header: null,
                        },
                },
                DetailChat: {
                        screen: DetailChat,
                        navigationOptions: {
                                header: null,
                        },
                },
        }, {
        initialRouteName: 'App'
}
);



const MainNavigatorAdminRestaurant = createStackNavigator(
        {
                App: {
                        screen: BottomTabNavigator,
                        navigationOptions: {
                                header: null,
                        },
                },
                DetailRestaurant: {
                        screen: DetailRestaurant,
                        navigationOptions: {
                                header: null,
                        },
                },
                Search: {
                        screen: Search,
                        navigationOptions: {
                                header: null,
                        },
                },
                Order: {
                        screen: Order,
                        navigationOptions: {
                                header: null,
                        },
                },
                Deal: {
                        screen: Deal,
                        navigationOptions: {
                                header: null,
                        },
                },
                DetailDeal: {
                        screen: DetailDeal,
                        navigationOptions: {
                                header: null,
                        },
                },
                ScanQrOrder: {
                        screen: ScanQrOrder,
                        navigationOptions: {
                                header: null,
                        },
                },
                Person: {
                        screen: Person,
                        navigationOptions: {
                                header: null,
                        },
                },
                DetailChat: {
                        screen: DetailChat,
                        navigationOptions: {
                                header: null,
                        },
                },
        }, {
        initialRouteName: 'App'
}
);


const MainNavigatorAdmin = createStackNavigator(
        {
                App: {
                        screen: BottomTabNavigator,
                        navigationOptions: {
                                header: null,
                        },
                },
                ConfirmRestaurant: {
                        screen: ConfirmRestaurant,
                        navigationOptions: {
                                header: null,
                        },
                },
                DetailRestaurant: {
                        screen: DetailRestaurant,
                        navigationOptions: {
                                header: null,
                        },
                },
                Search: {
                        screen: Search,
                        navigationOptions: {
                                header: null,
                        },
                },
                Order: {
                        screen: Order,
                        navigationOptions: {
                                header: null,
                        },
                },
                Person: {
                        screen: Person,
                        navigationOptions: {
                                header: null,
                        },
                },
                DetailChat: {
                        screen: DetailChat,
                        navigationOptions: {
                                header: null,
                        },
                },
        }, {
        initialRouteName: 'App'
}
);


const AuthStack = createStackNavigator(
        {
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
        }
);

export default AppNavigator = createSwitchNavigator(
        {
                AuthLoading: {
                        screen: AuthLoading
                },
                AppAdminRestaurant: {
                        screen: MainNavigatorAdminRestaurant
                },
                AppAdmin: {
                        screen: MainNavigatorAdmin
                },
                Auth: {
                        screen: AuthStack
                },
                Client: {
                        screen: MainNavigatorClient
                }
        },
        {
                initialRouteName: 'AuthLoading',
        }
);

