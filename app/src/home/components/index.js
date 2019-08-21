import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Image, Dimensions, ScrollView, FlatList } from 'react-native';
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
                        listRestaurant: [0],
                        refreshing: false,
                        page: 1,
                        total_page: null
                }
        }

        componentDidMount () {
                const data = {
                        type: null,
                        page: 1
                }
                this.props.onFetchListRestaurant(data);
        }

        static getDerivedStateFromProps (nextProps, prevState) {
                if (nextProps.listRestaurant !== prevState.listRestaurant && nextProps.listRestaurant !== undefined) {
                        const array = (prevState.listRestaurant).concat(nextProps.listRestaurant);
                        prevState.listRestaurant = array;
                        console.log('prevState.listRestaurant: ', prevState.listRestaurant);
                }
                if (nextProps.page !== prevState.page) {
                        prevState.page = nextProps.page
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
                console.log('_onRefresh: ');
                this.setState({
                        listRestaurant: ["dgsdfd"]
                })
                const data = {
                        type: null,
                        page: 1
                }
                this.props.onFetchListRestaurant(data);
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
                                                                                }}>
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
                                                                                }}>
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
                                                                                }}>
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
                                                                        <View style={{
                                                                                width: '100%',
                                                                                height: width - 40,
                                                                                marginVertical: 15,
                                                                                backgroundColor: 'white'
                                                                        }}>
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