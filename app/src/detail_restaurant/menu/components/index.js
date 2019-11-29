import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, StatusBar, Modal, ActivityIndicator, FlatList, Alert } from 'react-native';
import { urlServer, colorMain, background } from '../../../config';
import Icon from 'react-native-vector-icons/AntDesign';
import { AccountModel } from '../../../models/account';
import AddMenu from './add_menu';
import SelectImage from './select_image';
import ItemListMenu from './item_list_menu';
import DetailMenu from './detail_menu';
export default class Menu extends Component {
        static navigationOptions = ({ navigation }) => {
                return {
                        title: 'thực đơn',
                }
        }

        constructor (props) {
                super(props);
                this.state = {
                        restaurant: null,
                        indexSliderImage: 0,
                        account: null,
                        authorities: null,
                        visibleAddMenu: false,
                        visibleSelectImage: false,
                        uriImageSelect: null,
                        isLoading: false,
                        idRestaurant: null,
                        listMenu: [],
                        refreshing: false,
                        messages: '',
                        idAdmin: null,
                        showEdit: false,
                        visibleDetailMenu: false,
                        nameSelected: '',
                        imageSelected: '',
                        introduceSelected: '',
                        priceSelected: '',
                        itemSelected: null,
                        scoreSelected: null,
                        page: 1,
                        total_page: null,
                        isRefresh: false,
                        isLoadMore: false,
                        isShowEditFood: false
                }
                this._onClickCloseAddMenu = this._onClickCloseAddMenu.bind(this);
                this._onClickCloseSelectImage = this._onClickCloseSelectImage.bind(this);
                this._onClickOpenSelectImage = this._onClickOpenSelectImage.bind(this);
                this._onClickSelectImage = this._onClickSelectImage.bind(this);
                this._onClickCompleteAddMenu = this._onClickCompleteAddMenu.bind(this);
                this._onClickCloseDetailMenu = this._onClickCloseDetailMenu.bind(this);
                this._onClickOpenDetailMenu = this._onClickOpenDetailMenu.bind(this);
                this._onRefreshListMenu = this._onRefreshListMenu.bind(this);
        }

        async _onGetInfoAccount () {
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
                                const id = this.props.navigation.getParam('IdConfigDetailRestaurant');
                                this.setState({
                                        idRestaurant: id.idRestaurant,
                                        idAdmin: id.idAdmin
                                })
                                if (account.data.id == id.idAdmin) {
                                        this.setState({
                                                showEdit: true,
                                                isShowEditFood: true
                                        })
                                }
                                this.props.onFetchMenu({
                                        idRestaurant: id.idRestaurant,
                                        page: 1
                                });
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

        componentDidMount () {
                this._onGetInfoAccount();
        }

        static getDerivedStateFromProps (nextProps, prevState) {
                if (nextProps.isLoading !== prevState.isLoading && nextProps.isLoading !== undefined) {
                        prevState.isLoading = nextProps.isLoading
                }
                if (nextProps.listMenu !== prevState.listMenu && nextProps.listMenu !== undefined && !prevState.isRefresh && !prevState.isLoadMore && !prevState.isLoading) {
                        prevState.listMenu = nextProps.listMenu;
                } else if (nextProps.listMenu !== prevState.listMenu && nextProps.listMenu !== undefined && prevState.isRefresh && !prevState.isLoadMore && !prevState.isLoading) {
                        prevState.listMenu = nextProps.listMenu;
                        prevState.isRefresh = false;
                } else if (nextProps.listMenu !== prevState.listMenu && nextProps.listMenu !== undefined && !prevState.isRefresh && prevState.isLoadMore && !prevState.isLoading) {
                        prevState.listMenu = prevState.listMenu.concat(nextProps.listMenu);
                        prevState.isLoadMore = false;
                }
                if (nextProps.page !== prevState.page && nextProps.page !== undefined && !prevState.isLoading && nextProps.page !== undefined) {
                        prevState.page = nextProps.page
                }
                if (nextProps.total_page !== prevState.total_page && nextProps.total_page !== undefined && !prevState.isLoading && nextProps.total_page !== undefined) {
                        prevState.total_page = nextProps.total_page
                }
                if (nextProps.messages !== undefined) {
                        Alert.alert(
                                'Thông Báo',
                                nextProps.messages,
                                [
                                        { text: 'OK', onPress: () => nextProps.onResetPropsMessage() },
                                ],
                                { cancelable: false },
                        );
                }
                return null
        }

        _onRefreshListMenu () {
                if (!this.state.isLoading) {
                        this.props.onResetProps();
                        this.setState({
                                page: 1,
                                listMenu: [],
                                isLoading: true,
                                isRefresh: true
                        });
                        this.props.onFetchMenu({
                                idRestaurant: this.state.idRestaurant,
                                page: 1
                        });
                }
        }

        _onLoadMoreListMenu () {
                if (!this.state.isLoading) {
                        const page = this.state.page;
                        const total_page = this.state.total_page;
                        if (page < total_page) {
                                this.props.onFetchMenu({
                                        idRestaurant: this.state.idRestaurant,
                                        page: page + 1
                                });
                                this.setState({
                                        isLoading: true,
                                        isLoadMore: true
                                });
                        }
                }
        }

        _onClickCloseAddMenu () {
                this.setState({
                        visibleAddMenu: !this.state.visibleAddMenu
                });
        }
        _onClickCloseSelectImage () {
                this.setState({
                        visibleSelectImage: !this.state.visibleSelectImage
                });
        }
        _onClickOpenSelectImage () {
                this.setState({
                        visibleSelectImage: !this.state.visibleSelectImage
                });
        }
        _onClickSelectImage (uri) {
                this.setState({
                        uriImageSelect: uri
                });
        }
        _onClickCompleteAddMenu (data) {
                this.setState({
                        isLoading: !this.state.isLoading
                })
                data.idRestaurant = this.state.idRestaurant;
                this.props.onAddMenu(data);
        }
        _onClickCloseDetailMenu () {
                this.setState({
                        visibleDetailMenu: !this.state.visibleDetailMenu
                });
        }
        _onClickOpenDetailMenu (data) {
                this.setState({
                        itemSelected: data.item,
                        scoreSelected: data.score,
                        visibleDetailMenu: !this.state.visibleDetailMenu
                });
        }

        componentWillUnmount () {
                this.props.onResetProps();
        }

        render () {
                return (
                        <View style={styles.container}>
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
                                        <Text style={styles.textHeader}>Thực Đơn</Text>
                                        {
                                                this.state.showEdit ? <TouchableOpacity onPress={() => {
                                                        this.setState({
                                                                visibleAddMenu: !this.state.visibleAddMenu
                                                        })
                                                }}>
                                                        <Icon name='pluscircle' size={30} color={colorMain} />
                                                </TouchableOpacity> : <View style={{
                                                        width: 25
                                                }} />
                                        }
                                </View>
                                <View style={styles.content}>
                                        <FlatList
                                                data={this.state.listMenu}
                                                extraData={this.state}
                                                keyExtractor={(item, index) => index.toString()}
                                                showsVerticalScrollIndicator={false}
                                                refreshing={this.state.isLoading}
                                                onRefresh={() => {
                                                        this._onRefreshListMenu()
                                                }}
                                                onEndReachedThreshold={0.1}
                                                onEndReached={() => {
                                                        this._onLoadMoreListMenu();
                                                }}
                                                renderItem={(item) => {
                                                        return (
                                                                <ItemListMenu
                                                                        item={item.item}
                                                                        _onClickOpenDetailMenu={this._onClickOpenDetailMenu}
                                                                        isShowEditFood={this.state.isShowEditFood}
                                                                        _onRefreshListMenu={this._onRefreshListMenu}
                                                                />
                                                        );
                                                }}
                                        />
                                </View>
                                <Modal
                                        visible={this.state.visibleAddMenu}
                                        transparent={false}
                                        animationType='slide'
                                        onRequestClose={() => {
                                                this._onClickCloseAddMenu()
                                        }}
                                >
                                        <AddMenu
                                                uriImageSelect={this.state.uriImageSelect}
                                                onClickCloseAddMenu={this._onClickCloseAddMenu}
                                                onClickOpenSelectImage={this._onClickOpenSelectImage}
                                                onClickCompleteAddMenu={this._onClickCompleteAddMenu}
                                        />
                                </Modal>
                                <Modal
                                        visible={this.state.visibleSelectImage}
                                        transparent={false}
                                        animationType='slide'
                                        onRequestClose={() => {
                                                this._onClickCloseSelectImage()
                                        }}
                                >
                                        <SelectImage
                                                onClickCloseSelectImage={this._onClickCloseSelectImage}
                                                onClickSelectImage={this._onClickSelectImage}
                                        />
                                </Modal>

                                <Modal
                                        visible={this.state.visibleDetailMenu}
                                        transparent={false}
                                        animationType='slide'
                                        onRequestClose={() => {
                                                this._onClickCloseDetailMenu()
                                        }}
                                >
                                        <DetailMenu
                                                _onClickCloseDetailMenu={this._onClickCloseDetailMenu}
                                                item={this.state.itemSelected}
                                                scoreSelected={this.state.scoreSelected}
                                        />
                                </Modal>
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
                flex: 1,
                paddingHorizontal: 20,
        }
});