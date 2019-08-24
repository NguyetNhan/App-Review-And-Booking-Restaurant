import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Image, Dimensions, ScrollView, FlatList, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colorMain, urlServer } from '../../config';

export default class Home extends Component {
        static navigationOptions = ({ navigation }) => {
                return {
                        tabBarLabel: 'Trang chủ',
                        tabBarIcon: ({ tintColor }) => (<Icon name='home' size={25} color={tintColor} />)
                }
        }

        constructor (props) {
                super(props);
                this.state = {
                        listRestaurant: ["options restaurant"],
                        refreshing: false,
                        page: 1,
                        total_page: null,
                        isUpdateState: true,
                        typeRestaurant: null,
                        isLoadMore: true
                }
        }

        componentDidMount () {
                const data = {
                        type: this.state.typeRestaurant,
                        page: 1
                }
                this.props.onFetchListRestaurant(data);
        }

        static getDerivedStateFromProps (nextProps, prevState) {
                if (nextProps.listRestaurant !== prevState.listRestaurant && nextProps.listRestaurant !== undefined) {
                        if (prevState.isUpdateState) {
                                const array = (prevState.listRestaurant).concat(nextProps.listRestaurant);
                                prevState.listRestaurant = array;
                        } else {
                                prevState.isUpdateState = true;
                                prevState.isLoadMore = true;
                        }
                }
                if (nextProps.page !== prevState.page) {
                        if (prevState.isUpdateState) {
                                prevState.page = nextProps.page
                        } else {
                                prevState.isUpdateState = true;
                        }
                }
                if (nextProps.total_page !== prevState.total_page) {
                        prevState.total_page = nextProps.total_page
                }
                if (nextProps.isLoading !== prevState.refreshing) {
                        prevState.refreshing = nextProps.isLoading
                }
                return null;
        }

        _onRefresh () {
                this.setState({
                        listRestaurant: ["options restaurant"],
                        isUpdateState: false
                })
                const data = {
                        type: this.state.typeRestaurant,
                        page: 1
                }
                this.props.onFetchListRestaurant(data);
        }

        _onLoadMoreRestaurant () {
                const isLoadMore = this.state.isLoadMore;
                if (isLoadMore) {
                        var page = this.state.page;
                        const total_page = this.state.total_page;
                        const pageNew = page + 1;
                        if (pageNew > total_page) {
                                ToastAndroid.show('Không còn dữ liệu !', ToastAndroid.SHORT);
                        } else {
                                const data = {
                                        type: this.state.typeRestaurant,
                                        page: pageNew
                                };
                                this.props.onFetchListRestaurant(data);
                        }
                }
        }

        _onClickButtonIconTypeRestaurant (type) {
                this.setState({
                        typeRestaurant: type,
                        listRestaurant: ["options restaurant"],
                        isUpdateState: false,
                        page: 1,
                        isLoadMore: false
                });
                const data = {
                        type: type,
                        page: 1
                }
                this.props.onFetchListRestaurant(data);
        }

        _onClickItemFlatList (item) {
                this.props.navigation.navigate('DetailRestaurant', {
                        restaurant: item
                });
        }


        render () {
                const { height, width } = Dimensions.get('window');
                return (
                        <View style={styles.container}>
                                <StatusBar
                                        backgroundColor='white'
                                        barStyle='dark-content'
                                />
                                <View style={styles.containerHeader}>
                                        <TouchableOpacity onPress={this.props.navigation.openDrawer}>
                                                <Icon name='menu' size={25} color='black' />
                                        </TouchableOpacity>
                                        <Text style={styles.textHeader}>Restaurant App</Text>
                                        <TouchableOpacity>
                                                <Icon name='user' size={25} color='black' />
                                        </TouchableOpacity>
                                </View>
                                <View style={{
                                        paddingHorizontal: 20,
                                }}>
                                        <FlatList
                                                style={{
                                                        marginVertical: 15
                                                }}
                                                data={this.state.listRestaurant}
                                                extraData={this.state}
                                                keyExtractor={(item, index) => index.toString()}
                                                showsVerticalScrollIndicator={false}
                                                refreshing={this.state.refreshing}
                                                onRefresh={() => {
                                                        this._onRefresh();
                                                }}
                                                // on load more
                                                onEndReached={() => {
                                                        this._onLoadMoreRestaurant();
                                                }}
                                                onEndReachedThreshold={1}
                                                renderItem={(item) => {
                                                        if (item.index === 0) {
                                                                return (
                                                                        <View style={styles.selectIconType}>
                                                                                <TouchableOpacity style={{
                                                                                        backgroundColor: 'white',
                                                                                        width: (width - 60) / 3,
                                                                                        height: (width - 60) / 3,
                                                                                        alignItems: 'center',
                                                                                        justifyContent: 'center'
                                                                                }}
                                                                                        onPress={() => {
                                                                                                this._onClickButtonIconTypeRestaurant('restaurant');
                                                                                        }}
                                                                                >
                                                                                        <Image
                                                                                                source={require('../../assets/images/icon_restaurant.png')}
                                                                                                style={styles.imageIconSelectType}
                                                                                        />
                                                                                        <Text style={styles.textTitleType}>Nhà hàng</Text>
                                                                                </TouchableOpacity>
                                                                                <TouchableOpacity style={{
                                                                                        backgroundColor: 'white',
                                                                                        width: (width - 60) / 3,
                                                                                        height: (width - 60) / 3,
                                                                                        alignItems: 'center',
                                                                                        justifyContent: 'center',
                                                                                        marginHorizontal: 10
                                                                                }}
                                                                                        onPress={() => {
                                                                                                this._onClickButtonIconTypeRestaurant('coffee');
                                                                                        }}
                                                                                >
                                                                                        <Image
                                                                                                source={require('../../assets/images/icon_coffee.png')}
                                                                                                style={styles.imageIconSelectType}
                                                                                        />
                                                                                        <Text style={styles.textTitleType}>Coffee & Trà</Text>
                                                                                </TouchableOpacity>
                                                                                <TouchableOpacity style={{
                                                                                        backgroundColor: 'white',
                                                                                        width: (width - 60) / 3,
                                                                                        height: (width - 60) / 3,
                                                                                        alignItems: 'center',
                                                                                        justifyContent: 'center'
                                                                                }}
                                                                                        onPress={() => {
                                                                                                this._onClickButtonIconTypeRestaurant('bar');
                                                                                        }}
                                                                                >
                                                                                        <Image
                                                                                                source={require('../../assets/images/icon_bar.png')}
                                                                                                style={styles.imageIconSelectType}
                                                                                        />
                                                                                        <Text style={styles.textTitleType}>Bar</Text>
                                                                                </TouchableOpacity>
                                                                        </View>
                                                                );
                                                        } else {
                                                                return (
                                                                        <TouchableOpacity
                                                                                onPress={() => {
                                                                                        this._onClickItemFlatList(item.item);
                                                                                }}
                                                                        >
                                                                                <View style={{
                                                                                        width: '100%',
                                                                                        height: width - 40,
                                                                                        marginVertical: 15,
                                                                                        backgroundColor: 'white'
                                                                                }}   >
                                                                                        <View style={{
                                                                                                flex: 2
                                                                                        }}>
                                                                                                <Image
                                                                                                        source={{ uri: `${urlServer}${item.item.imageRestaurant[0]}` }}
                                                                                                        style={{
                                                                                                                flex: 1
                                                                                                        }}
                                                                                                />
                                                                                                <View style={styles.containerTextDanhGia}>
                                                                                                        <Text style={{
                                                                                                                color: 'white',
                                                                                                                fontFamily: 'UVN-Baisau-Bold',
                                                                                                                fontSize: 18
                                                                                                        }}>9,2</Text>
                                                                                                </View>
                                                                                        </View>
                                                                                        <View style={styles.containerContentTitleItemList}>
                                                                                                <View>
                                                                                                        <Text style={styles.textTitleRestaurantItemList}
                                                                                                                numberOfLines={1}
                                                                                                        >{item.item.name}</Text>
                                                                                                        <Text style={styles.textTypeRestaurantItemList}>{item.item.type}</Text>
                                                                                                </View>
                                                                                                <View style={{
                                                                                                        flexDirection: 'row',
                                                                                                        alignItems: 'center',
                                                                                                }}>
                                                                                                        <Text style={styles.textStatusItemList}>đang mở cửa</Text>
                                                                                                        <View style={{
                                                                                                                width: 4,
                                                                                                                height: 4,
                                                                                                                backgroundColor: 'black',
                                                                                                                borderRadius: 2,
                                                                                                                marginHorizontal: 10
                                                                                                        }} />
                                                                                                        <Text style={styles.textAddressItemList}
                                                                                                                numberOfLines={1}
                                                                                                                ellipsizeMode='tail'
                                                                                                        >{item.item.address}</Text>
                                                                                                </View>
                                                                                        </View>
                                                                                </View>
                                                                        </TouchableOpacity>
                                                                );
                                                        }

                                                }}
                                        />
                                </View>
                        </View>
                );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
                alignItems: 'center',
        },
        containerHeader: {
                width: '100%',
                height: 50,
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: 'white',
                alignItems: 'center',
                paddingHorizontal: 20
        },
        textHeader: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 20
        },
        selectIconType: {
                flexDirection: 'row',
                marginVertical: 15
        },
        imageIconSelectType: {
                width: 50,
                height: 50,
                marginBottom: 5
        },
        textTitleType: {
                fontFamily: 'UVN-Baisau-Regular',
                textTransform: 'capitalize'
        },
        textTitleRestaurantItemList: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 25,
                textTransform: 'capitalize'
        },
        textTypeRestaurantItemList: {
                fontFamily: 'UVN-Baisau-Regular',
                textTransform: 'uppercase'
        },
        textStatusItemList: {
                fontFamily: 'UVN-Baisau-Regular',
                color: colorMain,
                textTransform: 'capitalize'
        },
        textAddressItemList: {
                fontFamily: 'UVN-Baisau-Regular',
                textTransform: 'capitalize',
        },
        containerTextDanhGia: {
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: colorMain,
                position: 'absolute',
                bottom: -25,
                right: 30,
                alignItems: 'center',
                justifyContent: 'center'
        },
        containerContentTitleItemList: {
                flex: 1,
                padding: 20,
                justifyContent: 'space-between'
        }
})