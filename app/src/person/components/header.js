import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, Alert, Modal, ActivityIndicator } from 'react-native';
const { width, height } = Dimensions.get('window');
import { urlServer, colorMain } from '../../config';
import Icon from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AccountModel } from '../../models/account';
import EditAccount from './edit_account';

export default class Header extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        account: props.account,
                        type: props.type,
                        accountClient: null,
                        isFriended: null,
                        visibleEditAccount: false,
                        isLoading: false,
                        visibleOptions: false,
                        isLoadingRemoveFriend: false
                };
                this.onCloseEditAccount = this.onCloseEditAccount.bind(this);
                this.onRefresh = this.onRefresh.bind(this);
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

        onCloseEditAccount () {
                this.setState({
                        visibleEditAccount: !this.state.visibleEditAccount
                });
        }

        onOpenEditAccount () {
                this.setState({
                        visibleEditAccount: !this.state.visibleEditAccount
                });
        }

        async  onRefresh () {
                this.props.onRefresh();
                this.setState({
                        isLoading: true
                });

                try {
                        const result = await fetch(`${urlServer}/auth/id/${this.state.account._id}`, {
                                method: 'GET',
                                headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                }
                        }).then(value => value.json());
                        if (result.error) {
                                Alert.alert(
                                        'Thông Báo Lỗi',
                                        result.message,
                                        [
                                                { text: 'OK' },
                                        ],
                                        { cancelable: false },
                                );
                                this.setState({
                                        isLoading: false
                                });
                        } else {
                                this.setState({
                                        account: result.data,
                                        isLoading: false
                                });
                        }
                } catch (error) {
                        Alert.alert(
                                'Thông Báo Lỗi',
                                error.message,
                                [
                                        { text: 'OK' },
                                ],
                                { cancelable: false },
                        );
                        this.setState({
                                isLoading: false
                        });
                }

        }

        onOpenOptions () {
                this.setState({
                        visibleOptions: !this.state.visibleOptions
                });
        }

        onCloseOptions () {
                this.setState({
                        visibleOptions: !this.state.visibleOptions
                });
        }

        async  onClickRemoveFriend () {
                this.setState({
                        isLoadingRemoveFriend: true
                });
                try {
                        const response = await fetch(`${urlServer}/friend/delete/idAccountUser/${this.state.accountClient.id}/idAccountFriend/${this.state.account._id}`, {
                                method: 'DELETE',
                                headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                }
                        }).then(data => data.json());
                        if (response.error) {
                                this.setState({
                                        isLoadingRemoveFriend: false
                                });
                                Alert.alert('Thông Báo Lỗi', response.message);
                        } else {
                                this.setState({
                                        isLoadingRemoveFriend: false,
                                });
                                this.props.onChangeStatusFriend(null);
                                Alert.alert('Thông Báo', response.message);
                                this.onCloseOptions();

                        }
                } catch (error) {
                        this.setState({
                                isLoadingRemoveFriend: false
                        });
                        Alert.alert('Thông Báo Lỗi', 'Xóa thất bại ! ' + error.message);
                }
        }

        componentWillUnmount () {
                this.props.onResetPropsHeader();
        }
        render () {
                if (this.state.isLoading) {
                        return (
                                <View style={{
                                        flex: 1,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                }}>
                                        <ActivityIndicator
                                                animating={true}
                                                size={30}
                                                color={colorMain}
                                        />
                                </View>
                        );
                } else
                        return (
                                <View style={styles.container}>
                                        <View style={styles.containerHeader}>
                                                {
                                                        this.state.account.avatar === null ?
                                                                <View
                                                                        style={{
                                                                                backgroundColor: colorMain,
                                                                                width: width,
                                                                                height: 220
                                                                        }}
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
                                                {
                                                        this.state.type === 'host' ?
                                                                <TouchableOpacity
                                                                        style={styles.buttonOptions}
                                                                        onPress={() => this.onOpenEditAccount()}
                                                                >
                                                                        <Icon
                                                                                name='edit'
                                                                                size={25}
                                                                                color='white'
                                                                        />
                                                                </TouchableOpacity> : null
                                                }

                                                <View style={{
                                                        height: 50,
                                                        width: width,
                                                }}>
                                                        {
                                                                this.state.type === 'host' ?
                                                                        <View style={styles.containerValue}>
                                                                                <View style={styles.containerName}>
                                                                                        <View style={{
                                                                                                flex: 1,
                                                                                                justifyContent: 'center'
                                                                                        }}>
                                                                                                <Text style={styles.name}>{this.state.account.name}</Text>
                                                                                        </View>
                                                                                        <View style={styles.containerOptions}>
                                                                                                <View style={styles.options}>
                                                                                                        <Text style={styles.score}>{this.state.account.score}</Text>
                                                                                                        <Text style={styles.titleOptions}>điểm</Text>
                                                                                                </View>
                                                                                                <View style={styles.options}>
                                                                                                        <Text style={styles.numberFriend}>10</Text>
                                                                                                        <Text style={styles.titleOptions}>bạn bè</Text>
                                                                                                </View>
                                                                                        </View>
                                                                                </View>
                                                                        </View> :
                                                                        <View style={styles.containerValue}>
                                                                                <View style={styles.containerName}>
                                                                                        <View style={{
                                                                                                flex: 1,
                                                                                                justifyContent: 'center'
                                                                                        }}>
                                                                                                <Text style={styles.name}>{this.state.account.name}</Text>
                                                                                        </View>
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
                                                                                                                                <TouchableOpacity onPress={() => this.onOpenOptions()}>
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
                                        <Modal
                                                visible={this.state.visibleEditAccount}
                                                animationType='slide'
                                                onRequestClose={() => this.onCloseEditAccount()}
                                        >
                                                <EditAccount
                                                        account={this.state.account}
                                                        onCloseEditAccount={this.onCloseEditAccount}
                                                        onRefresh={this.onRefresh}
                                                />
                                        </Modal>
                                        <Modal
                                                visible={this.state.visibleOptions}
                                                animationType='fade'
                                                onRequestClose={() => this.onCloseOptions()}
                                                transparent
                                        >

                                                <View style={styles.containerMenuEdit}>
                                                        {
                                                                this.state.isLoadingRemoveFriend ?
                                                                        <View style={styles.contentMenu}>
                                                                                <ActivityIndicator
                                                                                        animating={true}
                                                                                        size={30}
                                                                                        color={colorMain}
                                                                                />
                                                                        </View> :
                                                                        <View style={styles.contentMenu}>
                                                                                <TouchableOpacity onPress={() => this.onClickRemoveFriend()}>
                                                                                        <Text style={styles.textButtonRemoveFriend}>Hủy kết bạn</Text>
                                                                                </TouchableOpacity>
                                                                                <TouchableOpacity onPress={() => this.onCloseOptions()}>
                                                                                        <Text style={styles.textButtonBack}>quay lại</Text>
                                                                                </TouchableOpacity>
                                                                        </View>
                                                        }
                                                </View>
                                        </Modal>
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
        buttonOptions: {
                position: 'absolute',
                right: 20,
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
                borderRadius: 10,
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
        },
        containerMenuEdit: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,0.2)'
        },
        contentMenu: {
                backgroundColor: 'white',
                height: 100,
                width: 130,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'space-around'
        },
        textButtonRemoveFriend: {
                color: 'red',
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 16
        },
        textButtonBack: {
                fontFamily: 'UVN-Baisau-Regular',
        }
});