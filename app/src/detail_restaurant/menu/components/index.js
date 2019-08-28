import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, StatusBar, Modal, ActivityIndicator, FlatList } from 'react-native';
import { urlServer, colorMain, background } from '../../../config';
import Icon from 'react-native-vector-icons/AntDesign';
import { AccountModel } from '../../../models/account';
import AddMenu from './add_menu';
import SelectImage from './select_image';
import ItemListMenu from './item_list_menu';
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
                        messages: ''
                }
                this._onGetInfoAccount();
                this._onClickCloseAddMenu = this._onClickCloseAddMenu.bind(this);
                this._onClickCloseSelectImage = this._onClickCloseSelectImage.bind(this);
                this._onClickOpenSelectImage = this._onClickOpenSelectImage.bind(this);
                this._onClickSelectImage = this._onClickSelectImage.bind(this);
                this._onClickCompleteAddMenu = this._onClickCompleteAddMenu.bind(this);
        }

        async _onGetInfoAccount () {
                const account = await AccountModel.FetchInfoAccountFromDatabaseLocal();
                this.setState({
                        account: account,
                        authorities: account.authorities
                })
        }

        componentDidMount () {
                const id = this.props.navigation.getParam('idRestaurant');
                this.setState({
                        idRestaurant: id
                })
                this.props.onFetchMenu(id);
        }

        static getDerivedStateFromProps (nextProps, prevState) {
                if (nextProps.isLoading !== prevState.visibleLoading && nextProps.visibleLoading !== undefined) {
                        prevState.visibleLoading = nextProps.isLoading
                }
                if (nextProps.listMenu !== prevState.listMenu && nextProps.listMenu !== undefined) {
                        prevState.listMenu = nextProps.listMenu
                }
                if (nextProps.messages !== prevState.messages && nextProps.messages !== undefined) {
                        prevState.messages = nextProps.messages
                        alert(nextProps.messages)
                }
                return null
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

        render () {
                return (
                        <View style={styles.container}>
                                <StatusBar
                                        backgroundColor={background}
                                        barStyle='dark-content'
                                />
                                <View style={styles.header}>
                                        <TouchableOpacity onPress={() => {
                                                //  this.props.navigation.navigate('Home');
                                                this.props.navigation.goBack();
                                        }}>
                                                <Icon name='arrowleft' size={25} color='black' />
                                        </TouchableOpacity>
                                        {
                                                this.state.authorities === 'admin-restaurant' ? <TouchableOpacity onPress={() => {
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
                                                        this.props.onFetchMenu(this.state.idRestaurant);
                                                }}
                                                renderItem={(item) => {
                                                        return (
                                                                <ItemListMenu
                                                                        name={item.item.name}
                                                                        image={item.item.image}
                                                                        introduce={item.item.introduce}
                                                                        price={item.item.price}
                                                                />
                                                        );
                                                }}
                                        />
                                </View>
                                <Modal
                                        visible={this.state.visibleAddMenu}
                                        transparent={false}
                                        animationType='slide'
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
                        </View >
                );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1
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