import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator, Dimensions, Alert, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { urlServer, colorMain, background, backgroundStatusBar } from '../../config';
import { AccountModel } from '../../models/account';
const { width, height } = Dimensions.get('window');

export default class Profile extends Component {
        static navigationOptions = ({ navigation }) => {
                return {
                        tabBarLabel: 'Cá Nhân',
                        tabBarIcon: ({ tintColor }) => (<Icon name='user' size={25} color={tintColor} />)
                }
        }
        constructor (props) {
                super(props);
                this.state = {
                        account: null,
                        isLoading: true
                }
        }

        async fetchInfoAccountFromLocal () {
                const account = await AccountModel.FetchInfoAccountFromDatabaseLocal();
                try {
                        if (account.error) {
                                Alert.alert(
                                        'Thông Báo Lỗi',
                                        'Bạn chưa đăng nhập !',
                                        [
                                                { text: 'OK' },
                                        ],
                                        { cancelable: false },
                                );
                                this.props.navigation.navigate('Auth');
                        } else {
                                this.setState({
                                        account: account.data,
                                        isLoading: false
                                })
                        }
                } catch (error) {
                        Alert.alert(
                                'Thông Báo Lỗi',
                                'Bạn chưa đăng nhập !',
                                [
                                        { text: 'OK' },
                                ],
                                { cancelable: false },
                        );
                        this.props.navigation.navigate('Auth');
                }

        }

        onClickAvatar () {
                this.props.navigation.navigate('Person');
        }

        componentDidMount () {
                this.fetchInfoAccountFromLocal();
        }

        async  onClickMyRestaurant () {
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
                                IdConfigDetailRestaurant: id,
                                GoBack: 'Person'
                        });
                } catch (err) {
                        Alert.alert(
                                'Thông Báo',
                                err.message,
                                [
                                        { text: 'OK' },
                                ],
                                { cancelable: false },
                        );
                }
        }

        async   onLogout () {
                await AccountModel.DeleteAccountInfoFromDatabaseLocal();
                this.props.navigation.navigate('Auth');
        }

        render () {
                if (this.state.isLoading)
                        return (
                                <View style={styles.containerLoading}>
                                        <ActivityIndicator animating={true} size={30} color={colorMain} />
                                </View>
                        )
                else
                        return (
                                <View style={styles.container}>
                                        <StatusBar
                                                backgroundColor={backgroundStatusBar}
                                                barStyle='light-content'
                                        />
                                        <View
                                                onTouchStart={() => this.props.navigation.navigate('Search')}
                                                style={styles.containerSearch}>
                                                <Icon name='search' size={25} color='white' />
                                                <Text style={styles.textTitleSearch}>tìm kiếm nhà hàng, bạn bè...</Text>
                                        </View>
                                        <View style={styles.header}>
                                                <TouchableOpacity
                                                        onPress={() => {
                                                                //  this.onClickAvatar();
                                                        }}
                                                        style={styles.containerButtonPerson}>
                                                        {
                                                                this.state.account.avatar === 'null' ?
                                                                        <Image source={require('../../assets/images/avatar_user.png')}
                                                                                style={styles.imageAvatar}
                                                                        />
                                                                        :
                                                                        <Image source={{ uri: `${urlServer}${this.state.account.avatar}` }}
                                                                                style={styles.imageAvatar}
                                                                        />
                                                        }
                                                        <View style={styles.containerName}>
                                                                <Text style={styles.textName} numberOfLines={1} ellipsizeMode='tail' >{this.state.account.name}</Text>
                                                                <Text style={styles.textBottomName}><Text style={styles.textScore}>{this.state.account.score}</Text> điểm tích lũy</Text>
                                                        </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                        onPress={() => {
                                                                this.onLogout()
                                                        }}
                                                >
                                                        <AntDesign name='logout' size={25} color='black' />
                                                </TouchableOpacity>
                                        </View>
                                        {
                                                this.state.account.authorities === 'client' ?
                                                        <View style={styles.containerNavigator}>
                                                                <TouchableOpacity
                                                                        onPress={() => {
                                                                                this.props.navigation.navigate('Deal');
                                                                        }}
                                                                        style={styles.itemNavigator}>
                                                                        <View style={styles.containerIconNavigator}>
                                                                                <MaterialCommunityIcons name='bookmark-multiple-outline' size={30} color='black' />
                                                                        </View>
                                                                        <View style={styles.containerTextNavigator}>
                                                                                <Text style={styles.textNavigator}
                                                                                        numberOfLines={2}
                                                                                        ellipsizeMode='tail'
                                                                                >đơn hàng của tôi</Text>
                                                                        </View>
                                                                </TouchableOpacity>
                                                                <TouchableOpacity style={styles.itemNavigator}>
                                                                        <View style={styles.containerIconNavigator}>
                                                                                <MaterialCommunityIcons name='account-supervisor' size={30} color='black' />
                                                                        </View>
                                                                        <View style={styles.containerTextNavigator}>
                                                                                <Text style={styles.textNavigator}
                                                                                        numberOfLines={2}
                                                                                        ellipsizeMode='tail'
                                                                                >bạn bè</Text>
                                                                        </View>
                                                                </TouchableOpacity>
                                                                <TouchableOpacity style={styles.itemNavigator}>
                                                                        <View style={styles.containerIconNavigator}>
                                                                                <MaterialCommunityIcons name='home' size={30} color='black' />
                                                                        </View>
                                                                        <View style={styles.containerTextNavigator}>
                                                                                <Text style={styles.textNavigator}
                                                                                        numberOfLines={2}
                                                                                        ellipsizeMode='tail'
                                                                                >nhà hàng, coffee theo dõi</Text>
                                                                        </View>
                                                                </TouchableOpacity>
                                                                <TouchableOpacity
                                                                        onPress={() => {
                                                                                this.props.navigation.navigate('RegisterRestaurant');
                                                                        }}
                                                                        style={styles.itemNavigator}>
                                                                        <View style={styles.containerIconNavigator}>
                                                                                <FontAwesome name='registered' size={30} color='black' />
                                                                        </View>
                                                                        <View style={styles.containerTextNavigator}>
                                                                                <Text style={styles.textNavigator}
                                                                                        numberOfLines={2}
                                                                                        ellipsizeMode='tail'
                                                                                >đăng kí nhà hàng của bạn</Text>
                                                                        </View>
                                                                </TouchableOpacity>
                                                        </View>
                                                        :
                                                        this.state.account.authorities === 'admin-restaurant' ?
                                                                <View style={styles.containerNavigator}>
                                                                        <TouchableOpacity
                                                                                onPress={() => {
                                                                                        this.props.navigation.navigate('Deal');
                                                                                }}
                                                                                style={styles.itemNavigator}>
                                                                                <View style={styles.containerIconNavigator}>
                                                                                        <MaterialCommunityIcons name='bookmark-multiple-outline' size={30} color='black' />
                                                                                </View>
                                                                                <View style={styles.containerTextNavigator}>
                                                                                        <Text style={styles.textNavigator}
                                                                                                numberOfLines={2}
                                                                                                ellipsizeMode='tail'
                                                                                        >đơn hàng của tôi</Text>
                                                                                </View>
                                                                        </TouchableOpacity>
                                                                        <TouchableOpacity
                                                                                onPress={() => {
                                                                                        this.onClickMyRestaurant();
                                                                                }}
                                                                                style={styles.itemNavigator}>
                                                                                <View style={styles.containerIconNavigator}>
                                                                                        <MaterialCommunityIcons name='home' size={30} color='black' />
                                                                                </View>
                                                                                <View style={styles.containerTextNavigator}>
                                                                                        <Text style={styles.textNavigator}
                                                                                                numberOfLines={2}
                                                                                                ellipsizeMode='tail'
                                                                                        >nhà hàng của tôi</Text>
                                                                                </View>
                                                                        </TouchableOpacity>
                                                                        <TouchableOpacity
                                                                                onPress={() => {
                                                                                        this.props.navigation.navigate('ScanQrOrder');
                                                                                }}
                                                                                style={styles.itemNavigator}>
                                                                                <View style={styles.containerIconNavigator}>
                                                                                        <MaterialCommunityIcons name='qrcode-scan' size={30} color='black' />
                                                                                </View>
                                                                                <View style={styles.containerTextNavigator}>
                                                                                        <Text style={styles.textNavigator}
                                                                                                numberOfLines={2}
                                                                                                ellipsizeMode='tail'
                                                                                        >quét mã QR</Text>
                                                                                </View>
                                                                        </TouchableOpacity>
                                                                </View>
                                                                :
                                                                <View style={styles.containerNavigator}>
                                                                        <TouchableOpacity
                                                                                onPress={() => {
                                                                                        this.props.navigation.navigate('ConfirmRestaurant');
                                                                                }}
                                                                                style={styles.itemNavigator}>
                                                                                <View style={styles.containerIconNavigator}>
                                                                                        <MaterialCommunityIcons name='file-document-edit-outline' size={30} color='black' />
                                                                                </View>
                                                                                <View style={styles.containerTextNavigator}>
                                                                                        <Text style={styles.textNavigator}
                                                                                                numberOfLines={2}
                                                                                                ellipsizeMode='tail'
                                                                                        >nhà hàng đăng kí</Text>
                                                                                </View>
                                                                        </TouchableOpacity>
                                                                </View>
                                        }
                                </View>
                        );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
                backgroundColor: background
        },
        containerLoading: {
                alignItems: 'center'
        },
        containerSearch: {
                flexDirection: 'row',
                height: 55,
                backgroundColor: colorMain,
                paddingHorizontal: 20,
                alignItems: 'center',
                justifyContent: 'center'
        },
        textTitleSearch: {
                fontFamily: 'UVN-Baisau-Regular',
                textTransform: 'capitalize',
                color: 'white',
                flex: 1,
                marginLeft: 10,
                fontSize: 16
        },
        header: {
                flexDirection: 'row',
                paddingHorizontal: 20,
                paddingVertical: 20,
                backgroundColor: 'white',
                marginBottom: 10,
                alignItems: 'center'
        },
        containerButtonPerson: {
                flexDirection: 'row',
                flex: 1
        },
        imageAvatar: {
                width: 40,
                height: 40,
                borderRadius: 20
        },
        containerName: {
                marginLeft: 10,
                flex: 1
        },
        textName: {
                fontFamily: 'UVN-Baisau-Bold',
        },
        textScore: {
                fontFamily: 'UVN-Baisau-Bold',
                color: colorMain
        },
        textBottomName: {
                fontFamily: 'UVN-Baisau-Regular',
                fontSize: 12
        },
        containerNavigator: {
                flexDirection: 'row',
                backgroundColor: 'white'
        },
        itemNavigator: {
                width: width / 4,
                height: width / 4
        },
        containerIconNavigator: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'flex-end'
        },
        containerTextNavigator: {
                flex: 1,
                alignItems: 'center'
        },
        textNavigator: {
                textAlign: 'center',
                fontFamily: 'UVN-Baisau-Regular',
                textTransform: 'capitalize',
                fontSize: 12,
                width: (width / 4) - 8
        }
})