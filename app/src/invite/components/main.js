import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, StatusBar, TouchableOpacity, FlatList, Alert } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { AccountModel } from '../../models/account';
import ItemInviteList from './item_invite_list';
export default class Invite extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        account: null,
                        isLoading: true,
                        inviteList: []
                };
                this.onChangeScreenDetailPlace = this.onChangeScreenDetailPlace.bind(this);
        }

        async componentDidMount () {
                const resultAccount = await AccountModel.FetchInfoAccountFromDatabaseLocal();
                if (resultAccount.error) {
                        Alert.alert('Thông Báo Lỗi', resultAccount.message);
                } else {
                        this.props.onFetchInviteList(resultAccount.data.id);
                        this.setState({
                                account: resultAccount.data
                        });
                }
        }

        static getDerivedStateFromProps (nextProps, prevState) {
                if (nextProps.isLoading !== prevState.isLoading && nextProps.isLoading !== undefined) {
                        prevState.isLoading = nextProps.isLoading;
                }
                if (nextProps.inviteList !== prevState.inviteList && nextProps.inviteList !== undefined && !prevState.isLoading) {
                        if (nextProps.inviteList.length === 0) {
                                prevState.inviteList = ['1'];
                        } else {
                                prevState.inviteList = nextProps.inviteList;
                        }
                }
                if (nextProps.message !== undefined) {
                        Alert.alert(
                                'Thông Báo',
                                nextProps.message,
                                [
                                        { text: 'OK', onPress: () => nextProps.onResetPropsMessage() },
                                ],
                                { cancelable: false },
                        );
                }
                return null;
        }

        onRefresh () {
                this.setState({
                        isLoading: true
                });
                this.props.onFetchInviteList(this.state.account.id);
        }

        componentWillUnmount () {
                this.props.onResetProps();
        }

        onChangeScreenDetailPlace (idRestaurant, idAdmin) {
                var data = {
                        idRestaurant: idRestaurant,
                        idAdmin: idAdmin
                };
                this.props.navigation.navigate('DetailRestaurant', {
                        IdConfigDetailRestaurant: data,
                        GoBack: 'Invite'
                });
        }


        render () {
                return (
                        <View style={styles.container}>
                                <StatusBar
                                        backgroundColor='white'
                                        barStyle='dark-content'
                                        translucent={false}
                                />
                                <View style={styles.header}>
                                        <TouchableOpacity onPress={() => {
                                                this.props.navigation.goBack();
                                        }}>
                                                <AntDesign name='arrowleft' size={25} color='black' />
                                        </TouchableOpacity>
                                        <Text style={styles.textHeader}>lời mời dự tiệc</Text>
                                </View>
                                <View style={styles.flatList}>
                                        <FlatList
                                                data={this.state.inviteList}
                                                extraData={this.state}
                                                keyExtractor={(item, index) => index.toString()}
                                                showsVerticalScrollIndicator={false}
                                                refreshing={this.state.isLoading}
                                                onRefresh={() => {
                                                        this.onRefresh();
                                                }}
                                                renderItem={(item) => {
                                                        if (item.item === '1')
                                                                return (
                                                                        <Text style={{
                                                                                width: '100%',
                                                                                textAlign: 'center',
                                                                                fontFamily: 'UVN-Baisau-Regular',
                                                                        }}>không có lời mời nào</Text>
                                                                );
                                                        else
                                                                return (
                                                                        <ItemInviteList
                                                                                item={item.item}
                                                                                onChangeScreenDetailPlace={this.onChangeScreenDetailPlace}
                                                                        />
                                                                );
                                                }}
                                        />
                                </View>
                        </View>
                );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1
        },
        header: {
                height: 50,
                width: '100%',
                paddingHorizontal: 20,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'white'
        },
        textHeader: {
                fontFamily: 'UVN-Baisau-Bold',
                textTransform: 'capitalize',
                fontSize: 16,
                marginLeft: 10
        },
        flatList: {
                flex: 1
        }
});