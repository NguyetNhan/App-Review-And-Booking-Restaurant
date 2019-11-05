import React, { Component } from 'react';
import { View, Text, Image, FlatList, Alert, ActivityIndicator, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { urlServer, colorMain, background } from '../../../config';
import Icon from 'react-native-vector-icons/AntDesign';
import { AccountModel } from '../../../models/account';

export default class PostRestaurant extends Component {
        static navigationOptions = ({ navigation }) => {
                return {
                        title: 'bài viết',
                }
        }
        constructor (props) {
                super(props);
                this.state = {
                        postList: [],
                        isLoading: true,
                        page: 1,
                        total_page: null,
                        accountLocal: null,
                        accountPost: null,
                        restaurant: null
                }
                this.fetchAccountLocal();
                this.fetchInfoRestaurant();
        }

        async fetchInfoRestaurant () {
                const id = this.props.navigation.getParam('IdConfigDetailRestaurant', null);
                try {
                        const response = await fetch(`${urlServer}/restaurant/id/${id.idRestaurant}`, {
                                method: 'GET',
                                headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                }
                        }).then(value => value.json());
                        if (response.error) {
                                Alert.alert(
                                        'Thông Báo Lỗi',
                                        response.message,
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
                                        restaurant: response.data,
                                });
                                this.fetchInfoAccountAdminRestaurant(response.data.idAdmin);
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

        async fetchInfoAccountAdminRestaurant (idAdmin) {
                try {
                        const result = await fetch(`${urlServer}/auth/id/${idAdmin}`, {
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
                                        accountPost: result.data,
                                });
                                this.fetchPostList(result.data._id);
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

        async fetchAccountLocal () {
                const result = await AccountModel.FetchInfoAccountFromDatabaseLocal();
                if (result.error) {
                        Alert.alert(
                                'Thông Báo Lỗi',
                                result.message,
                                [
                                        { text: 'OK' },
                                ],
                                { cancelable: false },
                        );
                } else {
                        this.setState({
                                accountLocal: result.data
                        });
                }
        }

        async fetchPostList (idAccount) {
                try {
                        const response = await fetch(`${urlServer}/post/restaurant/post-list/idAccountRestaurant/${idAccount}/page/1`, {
                                method: 'GET',
                                headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                },
                        }).then(data => data.json());
                        if (response.error) {
                                Alert.alert(
                                        'Thông Báo Lỗi',
                                        response.message,
                                        [
                                                { text: 'OK' },
                                        ],
                                        { cancelable: false },
                                );
                                this.setState({
                                        isLoading: false
                                })
                        } else {
                                this.setState({
                                        postList: response.data,
                                        page: response.page,
                                        total_page: response.total_page,
                                        isLoading: false
                                })
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
                        })
                }
        }
        render () {
                return (
                        <View style={styles.container} >
                                <StatusBar
                                        backgroundColor={background}
                                        barStyle='dark-content'
                                        translucent={false}
                                />
                                <View style={styles.header}>
                                        <TouchableOpacity onPress={() => {
                                                this.props.navigation.navigate('Home');
                                        }}>
                                                <Icon name='arrowleft' size={25} color='black' />
                                        </TouchableOpacity>
                                        <Text style={styles.textHeader}>Bài Viết</Text>
                                        <View
                                                style={{
                                                        width: 25
                                                }}
                                        />
                                </View>
                                <View style={styles.content}>
                                        <FlatList
                                                data={this.state.postList}
                                                extraData={this.state}
                                                keyExtractor={(item, index) => index.toString()}
                                                showsVerticalScrollIndicator={false}
                                                refreshing={this.state.isLoading}
                                                renderItem={(item) => {
                                                        return (
                                                                <Text>cc</Text>
                                                        )
                                                }}
                                        />
                                </View>
                        </View >
                );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
                backgroundColor: background
        },
        header: {
                height: 50,
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                flexDirection: 'row',
                alignItems: 'center'
        },
        textHeader: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 18,
                textTransform: 'capitalize'
        },
        content: {
                flex: 1
        }
})