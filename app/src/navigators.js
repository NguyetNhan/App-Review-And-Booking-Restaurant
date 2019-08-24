import { createDrawerNavigator, createStackNavigator, createSwitchNavigator, createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import { colorMain } from './config';

import Realm from 'realm';
import { AccountModel } from './models/account';

import Home from './home/containers';
import Search from './search/components';
import Map from './map/components';
import Notification from './notification/components';
import Follow from './follow/components';
import AuthLoading from './auth_loading/components';
import Login from './login/containers';
import SignUp from './sign_up/containers';
import RegisterRestaurant from './client/register_restaurant/containers';
import ConfirmRestaurant from './admin/confirm_restaurant/containers';
import Overview from './detail_restaurant/overview/components';
import Menu from './detail_restaurant/menu/components';
import Review from './detail_restaurant/review/components';


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
        activeColor: colorMain,
        inactiveColor: 'gray',
        barStyle: { backgroundColor: 'white' },
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
                var realm = await Realm.open({ schema: [AccountModel.AccountSchema] });
                var account = await realm.objects(AccountModel.Account);
                for (let item of account) {
                        this.setState({
                                name: item.name
                        });
                }
                realm.close();
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
                                </View>
                                <View style={styleDrawerAdminRestaurant.containerName}>
                                        <Text style={styleDrawerAdminRestaurant.textName}>{this.state.name}</Text>
                                        <Text style={styleDrawerAdminRestaurant.textAddress}>Nam, Ho Chi Minh</Text>
                                </View>
                                <View style={styleDrawerAdminRestaurant.containerAction}>
                                        <View style={styleDrawerAdminRestaurant.line} />
                                        <TouchableOpacity
                                                onPress={() => {
                                                        this.props.navigation.navigate('RegisterRestaurant');
                                                }}
                                        >
                                                <Text style={styleDrawerAdminRestaurant.textAction} >Đăng kí cửa hàng</Text>
                                        </TouchableOpacity>
                                        <View style={styleDrawerAdminRestaurant.line} />
                                        <TouchableOpacity
                                                onPress={async () => {
                                                        try {
                                                                var realm = await Realm.open({ schema: [AccountModel.AccountSchema] });
                                                                var account = await realm.objects(AccountModel.Account);
                                                                await realm.write(async () => {
                                                                        await realm.delete(account);
                                                                });
                                                                realm.close();
                                                                this.props.navigation.navigate('Auth');
                                                        } catch (err) {
                                                                console.log('err: ', err);
                                                        }
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
                }
        }, {
                initialRouteName: 'DrawerNavigatorClient'
        }
);


class DrawerContentAdminRestaurant extends Component {
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
                var realm = await Realm.open({ schema: [AccountModel.AccountSchema] });
                var account = await realm.objects(AccountModel.Account);
                for (let item of account) {
                        this.setState({
                                name: item.name
                        });
                }
                realm.close();
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
                                </View>
                                <View style={styleDrawerAdminRestaurant.containerName}>
                                        <Text style={styleDrawerAdminRestaurant.textName}>{this.state.name}</Text>
                                        <Text style={styleDrawerAdminRestaurant.textAddress}>Nam, Ho Chi Minh</Text>
                                </View>
                                <View style={styleDrawerAdminRestaurant.containerAction}>
                                        <View style={styleDrawerAdminRestaurant.line} />
                                        <TouchableOpacity>
                                                <Text style={styleDrawerAdminRestaurant.textAction} >Cửa hàng</Text>
                                        </TouchableOpacity>
                                        <View style={styleDrawerAdminRestaurant.line} />
                                        <TouchableOpacity>
                                                <Text style={styleDrawerAdminRestaurant.textAction} >Giao dịch</Text>
                                        </TouchableOpacity>
                                        <View style={styleDrawerAdminRestaurant.line} />
                                        <TouchableOpacity
                                                onPress={async () => {
                                                        try {
                                                                var realm = await Realm.open({ schema: [AccountModel.AccountSchema] });
                                                                var account = await realm.objects(AccountModel.Account);
                                                                await realm.write(async () => {
                                                                        await realm.delete(account);
                                                                });
                                                                realm.close();
                                                                this.props.navigation.navigate('Auth');
                                                        } catch (err) {
                                                                console.log('err: ', err);
                                                        }
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
                var realm = await Realm.open({ schema: [AccountSchema] });
                var account = await realm.objects('Account');
                for (let item of account) {
                        this.setState({
                                name: item.name
                        });
                }
                realm.close();
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
                                </View>
                                <View style={styleDrawerAdminRestaurant.containerName}>
                                        <Text style={styleDrawerAdminRestaurant.textName}>{this.state.name}</Text>
                                        <Text style={styleDrawerAdminRestaurant.textAddress}>Nam, Ho Chi Minh</Text>
                                </View>
                                <View style={styleDrawerAdminRestaurant.containerAction}>
                                        <View style={styleDrawerAdminRestaurant.line} />
                                        <TouchableOpacity
                                                onPress={() => {
                                                        this.props.navigation.navigate('ConfirmRestaurant');
                                                }}
                                        >
                                                <Text style={styleDrawerAdminRestaurant.textAction} >Xác nhận nhà hàng</Text>
                                        </TouchableOpacity>
                                        <View style={styleDrawerAdminRestaurant.line} />
                                        <TouchableOpacity
                                                onPress={async () => {
                                                        try {
                                                                const realm = await Realm.open({ schema: [AccountModel.AccountSchema] });
                                                                const account = await realm.objects(AccountModel.Account);
                                                                await realm.write(async () => {
                                                                        await realm.delete(account);
                                                                });
                                                                realm.close();
                                                                this.props.navigation.navigate('Auth');
                                                        } catch (err) {
                                                                console.log('err: ', err);
                                                        }
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
                height: 200,
                alignItems: 'center',
                backgroundColor: '#22D499',
                borderBottomLeftRadius: 115,
                borderBottomRightRadius: 115,
                justifyContent: 'space-between',
                paddingBottom: 10,
                marginBottom: 10
        },
        image: {
                width: 100,
                height: 100,
                borderRadius: 50,
                borderWidth: 1,
                borderColor: 'white'
        },
        containerName: {
                width: '100%',
                alignItems: 'center'
        },
        textName: {
                fontSize: 20,
                color: 'black',
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

