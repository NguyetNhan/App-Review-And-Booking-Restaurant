import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
const { width, height } = Dimensions.get('window');
import { urlServer, colorMain } from '../../config';
import Icon from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AccountModel } from '../../models/account';

export default class Header extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        account: props.account,
                        type: props.type,
                        accountClient: null,
                        isFriended: null
                };
        }

        async fetchAccountClientFromLocal () {
                const result = await AccountModel.FetchInfoAccountFromDatabaseLocal();
                if (result.error) {
                        Alert.alert('Thông Báo Lỗi',
                                result.message);
                        return null;
                } else {
                        this.setState({
                                accountClient: result.data
                        });
                        return result.data.id;
                }
        }

        async   componentDidMount () {
                if (this.state.type === 'visit') {
                        const idAccountClient = await this.fetchAccountClientFromLocal();
                        this.props.onCheckIsFriend(idAccountClient, this.state.account._id);
                }
        }

        static getDerivedStateFromProps (nextProps, prevState) {
                if (nextProps.isFriended !== prevState.isFriended && nextProps.isFriended !== undefined) {
                        prevState.isFriended = nextProps.isFriended;
                }
                if (nextProps.message !== undefined) {
                        Alert.alert(
                                'Thông Báo',
                                nextProps.message,
                                [
                                        {
                                                text: 'OK',
                                                onPress: () => nextProps.onResetPropsMessageHeader()
                                        },
                                ],
                                { cancelable: false },
                        );
                }
                return null;
        }

        componentWillUnmount () {
                this.props.onResetPropsHeader();
        }
        render () {
                return (
                        <View style={styles.container}>
                                <View style={styles.containerHeader}>
                                        {
                                                this.state.account.avatar === null ?
                                                        <Image
                                                                source={{ uri: 'https://znews-photo.zadn.vn/w660/Uploaded/lce_qdhuc/2019_03_24/trantran.jpg' }}
                                                                style={styles.image}
                                                        /> :
                                                        <Image
                                                                source={{ uri: `${urlServer}${this.state.account.avatar}` }}
                                                                style={styles.image}
                                                        />
                                        }
                                        <TouchableOpacity
                                                style={styles.buttonBack}
                                                onPress={() => {
                                                        this.props.onClickButtonBack();
                                                }}
                                        >
                                                <Icon name='arrow-left' size={25} color='white' />
                                        </TouchableOpacity>
                                        <View style={{
                                                height: 50,
                                                width: width,
                                        }}>
                                                {
                                                        this.state.type === 'host' ?
                                                                <View style={styles.containerValue}>
                                                                        <View style={styles.containerName}>
                                                                                <Text style={styles.name}>{this.state.account.name}</Text>
                                                                                <View style={styles.containerOptions}>
                                                                                        <View style={styles.options}>
                                                                                                <Text style={styles.score}>{this.state.account.score}</Text>
                                                                                                <Text style={styles.titleOptions}>điểm</Text>
                                                                                        </View>
                                                                                        <View style={styles.options}>
                                                                                                <Text style={styles.numberFriend}>90000</Text>
                                                                                                <Text style={styles.titleOptions}>bạn bè</Text>
                                                                                        </View>
                                                                                </View>
                                                                        </View>
                                                                </View> :
                                                                <View style={styles.containerValue}>
                                                                        <View style={styles.containerName}>
                                                                                <Text style={styles.name}>{this.state.account.name}</Text>
                                                                                <View style={styles.containerOptions}>
                                                                                        {
                                                                                                this.state.isFriended === null ?
                                                                                                        <View style={styles.options}>
                                                                                                                <TouchableOpacity
                                                                                                                        onPress={() => {
                                                                                                                                this.props.onAddFriend(this.state.accountClient.id, this.state.account._id);
                                                                                                                        }}
                                                                                                                >
                                                                                                                        <FontAwesome5 name='user-plus' size={20} color='gray' />
                                                                                                                </TouchableOpacity>
                                                                                                                <Text style={styles.titleOptions}>kết bạn</Text>
                                                                                                        </View> :
                                                                                                        this.state.isFriended === 'waiting' ?
                                                                                                                <View style={styles.options}>
                                                                                                                        <TouchableOpacity>
                                                                                                                                <FontAwesome5 name='user-clock' size={20} color='#2977e5' />
                                                                                                                        </TouchableOpacity>
                                                                                                                        <Text style={styles.titleOptions}>đã gửi</Text>
                                                                                                                </View> :
                                                                                                                <View style={styles.options}>
                                                                                                                        <TouchableOpacity>
                                                                                                                                <FontAwesome5 name='user-check' size={20} color='#2977e5' />
                                                                                                                        </TouchableOpacity>
                                                                                                                        <Text style={styles.titleOptions}>bạn bè</Text>
                                                                                                                </View>
                                                                                        }
                                                                                        <View style={styles.options}>
                                                                                                <TouchableOpacity
                                                                                                        onPress={() => {
                                                                                                                this.props.onClickChat(this.state.account._id);
                                                                                                        }}
                                                                                                >
                                                                                                        <MaterialCommunityIcons name='chat' size={20} color='#2977e5' />
                                                                                                </TouchableOpacity>
                                                                                                <Text style={styles.titleOptions}>nhắn tin</Text>
                                                                                        </View>
                                                                                </View>
                                                                        </View>
                                                                </View>
                                                }
                                        </View>
                                </View>
                        </View>
                );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1
        },
        image: {
                width: width,
                height: 220
        },
        containerHeader: {

        },
        buttonBack: {
                position: 'absolute',
                left: 20,
                top: 50
        },
        containerValue: {
                width: width,
                height: 100,
                alignItems: 'center',
                position: 'absolute',
                top: -50,
        },
        containerName: {
                width: 250,
                height: 100,
                alignItems: 'center',
                backgroundColor: 'white',
                borderRadius: 10
        },
        name: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 20,
        },
        containerOptions: {
                flexDirection: 'row',
                flex: 1,
                width: 250,
        },
        options: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
        },
        numberFriend: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 16,
                color: colorMain
        },
        score: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 16,
                color: 'red'
        },
        titleOptions: {
                fontFamily: 'UVN-Baisau-Regular',
                textTransform: 'capitalize',
                fontSize: 12
        }

});