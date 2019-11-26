import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, RefreshControl, ActivityIndicator, StatusBar, Alert } from 'react-native';
import { AccountModel } from '../../models/account';
import { urlServer, colorMain, background } from '../../config';
import Header from '../containers/header';
import AddPost from './add_post';
import PostList from '../containers/post_list';

export default class Person extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        account: null,
                        isLoading: true,
                        idAccountView: props.navigation.getParam('idAccountView', null),
                        type: 'visit'
                };
                this.fetchInfoAccountFromLocal();
                this.onClickChat = this.onClickChat.bind(this);
                this.onClickButtonBack = this.onClickButtonBack.bind(this);
                this.onClickAddPost = this.onClickAddPost.bind(this);
                this.onChangeScreenDetailPlace = this.onChangeScreenDetailPlace.bind(this);
                this.onRefresh = this.onRefresh.bind(this);
        }

        async fetchInfoAccountFromLocal () {
                const result = await AccountModel.FetchInfoAccountFromDatabaseLocal();
                if (result.error) {
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
                        if (this.state.idAccountView !== null) {
                                if (this.state.idAccountView === result.data.id) {
                                        this.props.onFetchAccountView(result.data.id);
                                        this.setState({
                                                type: 'host'
                                        });
                                } else {
                                        this.props.onFetchAccountView(this.state.idAccountView);
                                        this.setState({
                                                type: 'visit'
                                        });
                                }
                        } else {
                                this.props.onFetchAccountView(result.data.id);
                                this.setState({
                                        type: 'host'
                                });
                        }
                }
        }

        static getDerivedStateFromProps (nextProps, prevState) {
                if (nextProps.isLoading !== prevState.isLoading && nextProps.isLoading !== undefined) {
                        prevState.isLoading = nextProps.isLoading;
                }
                if (nextProps.account !== prevState.account && nextProps.account !== undefined && !prevState.isLoading) {
                        prevState.account = nextProps.account;
                }
                if (nextProps.message !== undefined) {
                        Alert.alert(
                                'Thông Báo Lỗi',
                                nextProps.message,
                                [
                                        {
                                                text: 'OK',
                                                onPress: () => nextProps.onResetPropsMessageMain()
                                        },
                                ],
                                { cancelable: false },
                        );
                }
                return null;
        }

        onClickChat (idAccount) {
                this.props.navigation.navigate('DetailChat', {
                        idAccountReceiver: idAccount
                });
        }

        onClickButtonBack () {
                this.props.navigation.goBack();
        }

        onClickAddPost () {
                this.props.navigation.navigate('AddPost');
        }

        onRefresh () {
                if (this.state.idAccountView !== null) {
                        if (this.state.idAccountView === this.state.account._id) {
                                this.props.onFetchAccountView(this.state.account._id);
                                this.setState({
                                        type: 'host',
                                        account: null
                                });
                        } else {
                                this.props.onFetchAccountView(this.state.idAccountView);
                                this.setState({
                                        type: 'visit',
                                        account: null
                                });
                        }
                } else {
                        this.props.onFetchAccountView(this.state.account._id);
                        this.setState({
                                type: 'host'
                        });
                }
                this.props.onRefreshPostList();
        }

        onChangeScreenDetailPlace (idRestaurant, idAdmin) {
                let data = {
                        idRestaurant: idRestaurant,
                        idAdmin: idAdmin
                };
                this.props.navigation.navigate('DetailRestaurant', {
                        IdConfigDetailRestaurant: data,
                        GoBack: 'Person'
                });
        }

        componentWillUnmount () {
                this.props.onResetPropsMain();
        }
        render () {
                if (this.state.isLoading)
                        return (
                                <View style={styles.containerLoading}>
                                        <ActivityIndicator
                                                animating={true}
                                                size={40}
                                                color={colorMain}
                                        />
                                </View>
                        );
                else
                        return (
                                <View style={styles.container}>
                                        <StatusBar
                                                translucent
                                                barStyle='light-content'
                                                backgroundColor='rgba(0,0,0,0.1)'
                                        />
                                        <ScrollView
                                                showsVerticalScrollIndicator={false}
                                                refreshControl={
                                                        <RefreshControl
                                                                refreshing={this.state.isLoading}
                                                                onRefresh={() => this.onRefresh()}
                                                        />
                                                }
                                        >
                                                <Header
                                                        account={this.state.account}
                                                        type={this.state.type}
                                                        onClickChat={this.onClickChat}
                                                        onClickButtonBack={this.onClickButtonBack}
                                                        onRefresh={this.onRefresh}
                                                />
                                                {
                                                        this.state.type === 'host' ?
                                                                <AddPost
                                                                        onClickAddPost={this.onClickAddPost}
                                                                        account={this.state.account}
                                                                /> : null
                                                }
                                                <PostList
                                                        account={this.state.account}
                                                        type={this.state.type}
                                                        onChangeScreenDetailPlace={this.onChangeScreenDetailPlace}
                                                        onRefresh={this.onRefresh}
                                                />
                                        </ScrollView>
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
                flex: 1,
                alignItems: 'center',
                paddingVertical: 20
        },
});