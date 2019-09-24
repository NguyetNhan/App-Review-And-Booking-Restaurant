import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, StatusBar, Modal, ActivityIndicator, FlatList } from 'react-native';
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
                        visibleLoading: false,
                        idRestaurant: null,
                        listMenu: [],
                        refreshing: false,
                        messages: '',
                        idAdmin: null,
                        showEdit: false,
                        visibleDetailMenu: false,
                        nameSelect: '',
                        imageSelect: '',
                        introduceSelect: '',
                        priceSelect: '',
                        page: 1,
                        total_page: null,
                        isRefresh: false,
                        isLoadMore: false
                }
                this._onClickCloseAddMenu = this._onClickCloseAddMenu.bind(this);
                this._onClickCloseSelectImage = this._onClickCloseSelectImage.bind(this);
                this._onClickOpenSelectImage = this._onClickOpenSelectImage.bind(this);
                this._onClickSelectImage = this._onClickSelectImage.bind(this);
                this._onClickCompleteAddMenu = this._onClickCompleteAddMenu.bind(this);
                this._onClickCloseDetailMenu = this._onClickCloseDetailMenu.bind(this);
                this._onClickOpenDetailMenu = this._onClickOpenDetailMenu.bind(this);
        }

        async _onGetInfoAccount () {
                const account = await AccountModel.FetchInfoAccountFromDatabaseLocal();
                this.setState({
                        account: account,
                        authorities: account.authorities
                })
                const id = this.props.navigation.getParam('IdConfigDetailRestaurant');
                this.setState({
                        idRestaurant: id.idRestaurant,
                        idAdmin: id.idAdmin
                })
                if (account.id == id.idAdmin) {
                        this.setState({
                                showEdit: true
                        })
                }
                this.props.onFetchMenu({
                        idRestaurant: id.idRestaurant,
                        page: 1
                });
        }

        componentDidMount () {
                this._onGetInfoAccount();
        }

        static getDerivedStateFromProps (nextProps, prevState) {
                if (nextProps.isLoading !== prevState.visibleLoading) {
                        prevState.visibleLoading = nextProps.isLoading
                }
                /*   if (nextProps.listMenu !== prevState.listMenu && nextProps.listMenu !== undefined) {
                          prevState.listMenu = nextProps.listMenu
                  } */
                if (nextProps.listMenu !== prevState.listMenu && nextProps.listMenu !== undefined && prevState.isRefresh && !prevState.isLoadMore) {
                        prevState.isRefresh = false;
                } else if (nextProps.listMenu !== prevState.listMenu && nextProps.listMenu !== undefined && !prevState.isRefresh && !prevState.isLoadMore) {
                        prevState.listMenu = nextProps.listMenu;
                } else if (nextProps.listMenu !== prevState.listMenu && nextProps.listMenu !== undefined && !prevState.isRefresh && prevState.isLoadMore) {
                        prevState.listMenu = prevState.listMenu.concat(nextProps.listMenu);
                        prevState.isLoadMore = false;
                }
                if (nextProps.messages !== undefined) {
                        alert(nextProps.messages)
                }
                return null
        }

        _onRefreshListMenu () {
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

        _onLoadMoreListMenu () {
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
                        visibleLoading: !this.state.visibleLoading
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
                        visibleDetailMenu: !this.state.visibleDetailMenu,
                        nameSelect: data.nameSelect,
                        imageSelect: data.imageSelect,
                        introduceSelect: data.introduceSelect,
                        priceSelect: data.priceSelect
                });
        }

        render () {
                return (
                        <View style={styles.container}>
                                <StatusBar
                                        backgroundColor={background}
                                        barStyle='dark-content'
                                />
                                <View style={styles.header}>
                                        <TouchableOpacity onPress={() => {
                                                this.props.navigation.navigate('Home');
                                        }}>
                                                <Icon name='arrowleft' size={25} color='black' />
                                        </TouchableOpacity>
                                        {
                                                this.state.showEdit ? <TouchableOpacity onPress={() => {
                                                        this.setState({
                                                                visibleAddMenu: !this.state.visibleAddMenu
                                                        })
                                                }}>
                                                        <Icon name='pluscircle' size={30} color={colorMain} />
                                                </TouchableOpacity> : null
                                        }
                                </View>
                                <View style={styles.content}>
                                        <FlatList
                                                data={this.state.listMenu}
                                                extraData={this.state}
                                                keyExtractor={(item, index) => index.toString()}
                                                showsVerticalScrollIndicator={false}
                                                refreshing={this.state.refreshing}
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
                                                                        name={item.item.name}
                                                                        image={item.item.image}
                                                                        introduce={item.item.introduce}
                                                                        price={item.item.price}
                                                                        _onClickOpenDetailMenu={this._onClickOpenDetailMenu}
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
                                        visible={this.state.visibleLoading}
                                        transparent={true}
                                        animationType='slide'
                                >
                                        <View style={{
                                                flex: 1,
                                                backgroundColor: 'rgba(0,0,0,0.3)',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                        }} >
                                                <ActivityIndicator animating={true} size={80} color={colorMain} />
                                        </View>
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
                                                nameSelect={this.state.nameSelect}
                                                introduceSelect={this.state.introduceSelect}
                                                imageSelect={this.state.imageSelect}
                                                priceSelect={this.state.priceSelect}
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
        content: {
                flex: 1,
                paddingHorizontal: 20,
        }
});