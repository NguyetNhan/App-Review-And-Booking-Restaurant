import { createDrawerNavigator, createStackNavigator, createSwitchNavigator, createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import { colorMain, urlServer } from './config';

import { AccountModel } from './models/account';

import Home from './home/containers';
import Search from './search/containers';
import Deal from './deal/components';
import Notification from './notification/containers';
import Follow from './follow/components';
import AuthLoading from './auth_loading/components';
import Login from './login/containers';
import SignUp from './sign_up/containers';
import RegisterRestaurant from './client/register_restaurant/containers';
import ConfirmRestaurant from './admin/confirm_restaurant/containers';
import Overview from './detail_restaurant/overview/containers';
import Menu from './detail_restaurant/menu/containers';
import Review from './detail_restaurant/review/components';
import Chat from './chat/components';
import Order from './order/components';


const RouteBottomTabConfig = {
        Home: {
                screen: Home,
        },
        Chat: {
                screen: Chat,
        },
        Deal: {
                screen: Deal,
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
        activeColor: colorMain,
        inactiveColor: 'gray',
        barStyle: { backgroundColor: 'white' },
        order: ['Deal', 'Chat', 'Home', 'Notification', 'Follow']
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

class DrawerContentClient extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        name: null
                };
        }
        componentDidMount () {
                this.getNameAccount();
        }
        async getNameAccount () {
                const account = await AccountModel.FetchInfoAccountFromDatabaseLocal();
                this.setState({
                        name: account.name
                });
        }
        render () {
                return (
                        <View style={styleDrawerAdminRestaurant.container}>
                                <View style={styleDrawerAdminRestaurant.containerImage}>
                                        <TouchableOpacity onPress={() => {
                                                this.props.navigation.closeDrawer();
                                        }}>
                                                <Icon
                                                        name='close'
                                                        size={50}
                                                        color='white'
                                                        style={{
                                                                marginTop: 20
                                                        }} />
                                        </TouchableOpacity>
                                        <Image source={{ uri: 'https://viknews.com/vi/wp-content/uploads/2019/04/Hot-girl-Tr%C3%A2m-Anh.jpg' }}
                                                style={styleDrawerAdminRestaurant.image}
                                        />
                                        <Text style={styleDrawerAdminRestaurant.textName}>{this.state.name}</Text>
                                </View>
                                <View style={styleDrawerAdminRestaurant.containerAction}>
                                        <View style={styleDrawerAdminRestaurant.line} />
                                        <TouchableOpacity
                                                onPress={() => {
                                                        this.props.navigation.closeDrawer();
                                                        this.props.navigation.navigate('RegisterRestaurant');
                                                }}
                                        >
                                                <Text style={styleDrawerAdminRestaurant.textAction} >Đăng kí cửa hàng</Text>
                                        </TouchableOpacity>
                                        <View style={styleDrawerAdminRestaurant.line} />
                                        <TouchableOpacity
                                                onPress={async () => {
                                                        await AccountModel.DeleteAccountInfoFromDatabaseLocal();
                                                        this.props.navigation.navigate('Auth');
                                                }}
                                        >
                                                <Text style={styleDrawerAdminRestaurant.textAction} >Đăng xuất</Text>
                                        </TouchableOpacity>
                                        <View style={styleDrawerAdminRestaurant.line} />
                                </View>
                        </View>
                );
        }
}

const DrawerNavigatorClient = createDrawerNavigator(
        {
                RegisterRestaurant: {
                        screen: RegisterRestaurant,
                },
                App: BottomTabNavigator,
        },
        {
                initialRouteName: 'App',
                hideStatusBar: true,
                drawerBackgroundColor: 'white',
                overlayColor: 'rgba(255,255,255,.7)',
                contentOptions: {
                        activeTintColor: '#fff',
                        activeBackgroundColor: '#6b52ae',
                },
                contentComponent: DrawerContentClient
        }
);

const MainNavigatorClient = createStackNavigator(
        {
                DrawerNavigatorClient: {
                        screen: DrawerNavigatorClient,
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
                }
        }, {
                initialRouteName: 'DrawerNavigatorClient'
        }
);


class DrawerContentAdminRestaurant extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        name: null,
                        account: null
                };
        }
        componentDidMount () {
                this.getNameAccount();
        }
        async getNameAccount () {
                const account = await AccountModel.FetchInfoAccountFromDatabaseLocal();
                this.setState({
                        name: account.name,
                        account: account
                });
        }
        render () {
                return (
                        <View style={styleDrawerAdminRestaurant.container}>
                                <View style={styleDrawerAdminRestaurant.containerImage}>
                                        <TouchableOpacity onPress={() => {
                                                this.props.navigation.closeDrawer();
                                        }}>
                                                <Icon
                                                        name='close'
                                                        size={50}
                                                        color='white'
                                                        style={{
                                                                marginTop: 20
                                                        }} />
                                        </TouchableOpacity>
                                        <Image source={{ uri: 'https://viknews.com/vi/wp-content/uploads/2019/04/Hot-girl-Tr%C3%A2m-Anh.jpg' }}
                                                style={styleDrawerAdminRestaurant.image}
                                        />
                                        <Text style={styleDrawerAdminRestaurant.textName}>{this.state.name}</Text>
                                </View>
                                <View style={styleDrawerAdminRestaurant.containerAction}>
                                        <View style={styleDrawerAdminRestaurant.line} />
                                        <TouchableOpacity onPress={async () => {
                                                this.props.navigation.closeDrawer();
                                                const idAccount = this.state.account.id;
                                                try {
                                                        const result = await fetch(`${urlServer}/restaurant/idAdminRestaurant/${idAccount}`, {
                                                                method: 'GET',
                                                                headers: {
                                                                        Accept: 'application/json',
                                                                        'Content-Type': 'application/json',
                                                                },
                                                        }).then(data => data.json());
                                                        var id = {
                                                                idRestaurant: result.data._id,
                                                                idAdmin: this.state.account.id
                                                        };
                                                        this.props.navigation.navigate('DetailRestaurant', {
                                                                idRestaurant: id
                                                        });
                                                } catch (err) {
                                                        console.log('err: ', err);
                                                }
                                        }}>
                                                <Text style={styleDrawerAdminRestaurant.textAction} >Cửa hàng</Text>
                                        </TouchableOpacity>
                                        <View style={styleDrawerAdminRestaurant.line} />
                                        <TouchableOpacity
                                                onPress={async () => {
                                                        await AccountModel.DeleteAccountInfoFromDatabaseLocal();
                                                        this.props.navigation.navigate('Auth');
                                                }}
                                        >
                                                <Text style={styleDrawerAdminRestaurant.textAction} >Đăng xuất</Text>
                                        </TouchableOpacity>
                                        <View style={styleDrawerAdminRestaurant.line} />
                                </View>
                        </View>
                );
        }
}

const DrawerNavigatorAdminRestaurant = createDrawerNavigator(
        {
                App: BottomTabNavigator,
        },
        {
                initialRouteName: 'App',
                hideStatusBar: true,
                drawerBackgroundColor: 'white',
                overlayColor: 'rgba(255,255,255,.7)',
                contentOptions: {
                        activeTintColor: '#fff',
                        activeBackgroundColor: '#6b52ae',
                },
                contentComponent: DrawerContentAdminRestaurant
        }
);

const MainNavigatorAdminRestaurant = createStackNavigator(
        {
                DrawerNavigatorAdminRestaurant: {
                        screen: DrawerNavigatorAdminRestaurant,
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
                }
        }, {
                initialRouteName: 'DrawerNavigatorAdminRestaurant'
        }
);

class DrawerContentAdmin extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        name: null
                };
        }
        componentDidMount () {
                this.getNameAccount();
        }
        async getNameAccount () {
                const account = await AccountModel.FetchInfoAccountFromDatabaseLocal();
                this.setState({
                        name: account.name
                });
        }
        render () {
                return (
                        <View style={styleDrawerAdminRestaurant.container}>
                                <View style={styleDrawerAdminRestaurant.containerImage}>
                                        <TouchableOpacity onPress={() => {
                                                this.props.navigation.closeDrawer();
                                        }}>
                                                <Icon
                                                        name='close'
                                                        size={50}
                                                        color='white'
                                                        style={{
                                                                marginTop: 20
                                                        }} />
                                        </TouchableOpacity>
                                        <Image source={{ uri: 'https://viknews.com/vi/wp-content/uploads/2019/04/Hot-girl-Tr%C3%A2m-Anh.jpg' }}
                                                style={styleDrawerAdminRestaurant.image}
                                        />
                                        <Text style={styleDrawerAdminRestaurant.textName}>{this.state.name}</Text>
                                </View>

                                <View style={styleDrawerAdminRestaurant.containerAction}>
                                        <View style={styleDrawerAdminRestaurant.line} />
                                        <TouchableOpacity
                                                onPress={() => {
                                                        this.props.navigation.closeDrawer();
                                                        this.props.navigation.navigate('ConfirmRestaurant');
                                                }}
                                        >
                                                <Text style={styleDrawerAdminRestaurant.textAction} >Xác nhận nhà hàng</Text>
                                        </TouchableOpacity>
                                        <View style={styleDrawerAdminRestaurant.line} />
                                        <TouchableOpacity
                                                onPress={async () => {
                                                        await AccountModel.DeleteAccountInfoFromDatabaseLocal();
                                                        this.props.navigation.navigate('Auth');
                                                }}
                                        >
                                                <Text style={styleDrawerAdminRestaurant.textAction} >Đăng xuất</Text>
                                        </TouchableOpacity>
                                        <View style={styleDrawerAdminRestaurant.line} />
                                </View>
                        </View>
                );
        }
}

const DrawerNavigatorAdmin = createDrawerNavigator(
        {
                ConfirmRestaurant: {
                        screen: ConfirmRestaurant
                },
                App: BottomTabNavigator,
        },
        {
                initialRouteName: 'App',
                hideStatusBar: true,
                drawerBackgroundColor: 'white',
                overlayColor: 'rgba(255,255,255,.7)',
                contentOptions: {
                        activeTintColor: '#fff',
                        activeBackgroundColor: '#6b52ae',
                },
                contentComponent: DrawerContentAdmin
        }
);

const MainNavigatorAdmin = createStackNavigator(
        {
                DrawerNavigatorAdmin: {
                        screen: DrawerNavigatorAdmin,
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
                }
        }, {
                initialRouteName: 'DrawerNavigatorAdmin'
        }
);

const styleDrawerAdminRestaurant = StyleSheet.create({
        container: {
                flex: 1,
                elevation: 10,
        },
        containerImage: {
                width: '100%',
                height: 300,
                alignItems: 'center',
                backgroundColor: '#22D499',
                borderBottomLeftRadius: 50,
                borderBottomRightRadius: 50,
                paddingBottom: 10,
                marginBottom: 10,
                justifyContent: 'space-around'
        },
        image: {
                width: 120,
                height: 120,
                borderRadius: 60,
                borderWidth: 1,
                borderColor: 'white'
        },
        containerName: {
                width: '100%',
                alignItems: 'center'
        },
        textName: {
                fontSize: 20,
                color: 'white',
                fontFamily: 'UVN-Baisau-Bold'
        },
        textAddress: {
                fontSize: 15,
                color: 'gray',
                fontFamily: 'OpenSans-Regulars'
        },
        containerAction: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
        },
        textAction: {
                color: 'black',
                fontFamily: 'UVN-Baisau-Bold',
                margin: 15
        },
        line: {
                backgroundColor: 'rgba(0,0,0,0.3)',
                height: 1,
                width: 200
        }
});

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

