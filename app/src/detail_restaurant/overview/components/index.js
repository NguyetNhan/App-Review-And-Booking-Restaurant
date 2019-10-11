import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, StatusBar, Modal, ScrollView, Alert } from 'react-native';
import { urlServer, colorMain, background } from '../../../config';
import Icon from 'react-native-vector-icons/AntDesign';
import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import Carousel from 'react-native-snap-carousel';
import { AccountModel } from '../../../models/account';
import MapDirections from './map';
import Star from 'react-native-vector-icons/MaterialCommunityIcons';

export default class OverView extends Component {
        static navigationOptions = ({ navigation }) => {
                return {
                        title: 'giới thiệu',
                }
        }
        constructor (props) {
                super(props);
                this.state = {
                        restaurant: null,
                        indexSliderImage: 0,
                        account: null,
                        authorities: null,
                        imageRestaurant: [],
                        name: '',
                        type: '',
                        phone: '',
                        address: '',
                        introduce: '',
                        numberOfLines: 4,
                        showButtonXemThem: true,
                        idConfig: null,
                        screenGoBack: null,
                        visibleModalMap: false,
                        score: null,
                        isCheckedFollow: false
                }
                this._onClickCloseModalMap = this._onClickCloseModalMap.bind(this);
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
                                const id = this.props.navigation.getParam('IdConfigDetailRestaurant');
                                const screenGoBack = this.props.navigation.getParam('GoBack');
                                this.setState({
                                        account: account.data,
                                        authorities: account.data.authorities,
                                        idConfig: id,
                                        screenGoBack: screenGoBack
                                });
                                this.props.onFetchDetailRestaurant(id.idRestaurant);
                                this.props.onFetchScoreReview(id.idRestaurant);
                                this.props.onCheckFollowRestaurant(id.idRestaurant, account.data.id);
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
                if (nextProps.restaurant !== prevState.restaurant && nextProps.restaurant !== undefined) {
                        prevState.restaurant = nextProps.restaurant
                        prevState.imageRestaurant = nextProps.restaurant.imageRestaurant
                        prevState.name = nextProps.restaurant.name
                        prevState.type = nextProps.restaurant.type
                        prevState.phone = nextProps.restaurant.phone
                        prevState.address = nextProps.restaurant.address
                        prevState.introduce = nextProps.restaurant.introduce
                }
                if (nextProps.message !== undefined) {
                        Alert.alert(
                                'Thông Báo',
                                nextProps.message,
                                [
                                        {
                                                text: 'OK',
                                                onPress: () => {
                                                        this.props.onResetPropsMessage();
                                                }
                                        },
                                ],
                                { cancelable: false },
                        );
                }
                if (nextProps.isCheckedFollow !== prevState.isCheckedFollow && nextProps.isCheckedFollow !== undefined) {
                        prevState.isCheckedFollow = nextProps.isCheckedFollow
                }
                if (nextProps.score !== prevState.score && nextProps.score !== undefined) {
                        prevState.score = nextProps.score
                }
                return null;
        }


        _onClickButtonOrder () {
                this.props.navigation.navigate('Order', {
                        idRestaurantForOrder: this.state.idConfig.idRestaurant
                });
        }

        _onClickOpenModalMap () {
                this.setState({
                        visibleModalMap: !this.state.visibleModalMap
                })
        }

        _onClickCloseModalMap () {
                this.setState({
                        visibleModalMap: !this.state.visibleModalMap
                })
        }

        onClickButtonFollow () {
                this.setState({
                        isCheckedFollow: !this.state.isCheckedFollow
                });
                this.props.onFollowedAndUnFollowedRestaurant(this.state.idConfig.idRestaurant, this.state.account.id);
        }

        onClickButtonChat () {
                this.props.navigation.navigate('DetailChat', {
                        idAccountReceiver: this.state.restaurant.idAdmin
                })
        }

        componentWillUnmount () {
                this.props.onResetProps();
        }

        render () {
                const screenWidth = Dimensions.get('window').width;
                const score = this.state.score;
                var listStar = [];
                for (let i = 1; i < 6; i++) {
                        var j = i + 1;
                        if (i < score && score < j) {
                                listStar.push({
                                        index: i,
                                        value: 1
                                })
                                listStar.push({
                                        index: i + 1,
                                        value: 0
                                })
                                i++;
                        }
                        else if (i <= score)
                                listStar.push({
                                        index: i,
                                        value: 1
                                })
                        else if (i > score)
                                listStar.push({
                                        index: i,
                                        value: -1
                                })
                }
                return (
                        <View style={styles.container}>
                                <StatusBar
                                        backgroundColor={background}
                                        barStyle='dark-content'
                                />
                                <View style={styles.header}>
                                        <TouchableOpacity onPress={() => {
                                                this.props.navigation.navigate(this.state.screenGoBack);
                                        }}>
                                                <Icon name='arrowleft' size={25} color='black' />
                                        </TouchableOpacity>
                                </View>
                                <ScrollView>
                                        <View style={styles.containerSliderImage}>
                                                <Carousel
                                                        ref={(c) => { this._slider1Ref = c; }}
                                                        data={this.state.imageRestaurant}
                                                        renderItem={(item) => {
                                                                return (
                                                                        <View style={{
                                                                                borderRadius: 50
                                                                        }}>
                                                                                <Image
                                                                                        source={{ uri: `${urlServer}${item.item}` }}
                                                                                        style={{
                                                                                                width: 250,
                                                                                                height: 200,
                                                                                                borderRadius: 10,
                                                                                        }}
                                                                                />
                                                                        </View>

                                                                );
                                                        }}
                                                        layout={'default'}
                                                        sliderWidth={screenWidth}
                                                        sliderHeight={300}
                                                        firstItem={0}
                                                        itemWidth={250}
                                                        onSnapToItem={(index) => this.setState({ indexSliderImage: index })}
                                                        inactiveSlideScale={0.94}
                                                        inactiveSlideOpacity={0.3}
                                                />
                                        </View>
                                        <View style={styles.content}>
                                                <View>
                                                        <Text style={styles.textTitleRestaurant}
                                                                numberOfLines={1}
                                                        >{this.state.name}</Text>
                                                        <View style={styles.containerStar}>
                                                                {
                                                                        this.state.score === null ? null :
                                                                                listStar.map(item => {
                                                                                        if (item.value === 1)
                                                                                                return (<Star key={item.index.toString()} name='star' size={20} color={colorMain} />);
                                                                                        else if (item.value === 0)
                                                                                                return (<Star key={item.index.toString()} name='star-half' size={20} color={colorMain} />);
                                                                                        else if (item.value === -1)
                                                                                                return (<Star key={item.index.toString()} name='star-outline' size={20} color={colorMain} />);
                                                                                })
                                                                }
                                                        </View>
                                                </View>
                                                <View style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between'
                                                }}>
                                                        <Text style={styles.textTypeRestaurant}>{this.state.type}</Text>
                                                        <View style={{
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                        }}>
                                                                <IconFontAwesome name='phone' size={18} color={colorMain} />
                                                                <Text style={styles.textPhone}>{this.state.phone}</Text>
                                                        </View>
                                                </View>

                                                <View style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                }}>
                                                        <View>
                                                                <Text style={styles.textStatus}>đang mở cửa</Text>
                                                                <Text style={styles.textTime}>8am - 10pm</Text>
                                                        </View>
                                                        <View style={{
                                                                width: 4,
                                                                height: 4,
                                                                backgroundColor: 'black',
                                                                borderRadius: 2,
                                                                marginHorizontal: 10
                                                        }} />
                                                        <Text style={styles.textAddress}
                                                        >{this.state.address}</Text>
                                                </View>
                                                <Text style={styles.textIntroduce}
                                                        numberOfLines={this.state.numberOfLines}
                                                        ellipsizeMode='tail'
                                                >{this.state.introduce}</Text>
                                                {
                                                        this.state.showButtonXemThem ?
                                                                <View style={{
                                                                        width: '100%',
                                                                        justifyContent: 'space-between',
                                                                        flexDirection: 'row'
                                                                }}>
                                                                        <View />
                                                                        <TouchableOpacity onPress={() => {
                                                                                this.setState({
                                                                                        numberOfLines: 100,
                                                                                        showButtonXemThem: false
                                                                                })
                                                                        }}>
                                                                                <Text style={{
                                                                                        fontFamily: 'UVN-Baisau-Regular',
                                                                                        fontSize: 12,
                                                                                        color: colorMain
                                                                                }}>Xem Thêm</Text>
                                                                        </TouchableOpacity>
                                                                </View>
                                                                : null
                                                }

                                        </View>
                                        {
                                                this.state.authorities === null ? null :
                                                        this.state.authorities === 'admin-restaurant' ? null :
                                                                this.state.authorities === 'admin' ? null :
                                                                        this.state.authorities === 'client' ?
                                                                                <View style={styles.containerButton}>
                                                                                        <TouchableOpacity style={styles.button}
                                                                                                onPress={() => {
                                                                                                        this._onClickOpenModalMap();
                                                                                                }}
                                                                                        >
                                                                                                <IconFontisto name='navigate' size={20} color={colorMain} />
                                                                                                <Text style={styles.textNavigation}>chỉ đường</Text>
                                                                                        </TouchableOpacity>
                                                                                        <TouchableOpacity
                                                                                                onPress={() => {
                                                                                                        this.onClickButtonChat();
                                                                                                }}
                                                                                                style={styles.button}>
                                                                                                <Icon name='customerservice' size={20} color={colorMain} />
                                                                                                <Text style={styles.textNavigation}>Tư Vấn</Text>
                                                                                        </TouchableOpacity>
                                                                                        <TouchableOpacity style={styles.button}
                                                                                                onPress={() => {
                                                                                                        this._onClickButtonOrder();
                                                                                                }}
                                                                                        >
                                                                                                <IconFontAwesome name='edit' size={20} color={colorMain} />
                                                                                                <Text style={styles.textNavigation}>Đặt Chỗ</Text>
                                                                                        </TouchableOpacity>
                                                                                        {
                                                                                                this.state.isCheckedFollow ?
                                                                                                        <TouchableOpacity
                                                                                                                onPress={() => {
                                                                                                                        this.onClickButtonFollow();
                                                                                                                }}
                                                                                                                style={styles.button}>
                                                                                                                <IconFontisto name='heart' size={20} color={colorMain} />
                                                                                                                <Text style={styles.textNavigation}>Bỏ Theo Dõi</Text>
                                                                                                        </TouchableOpacity> :
                                                                                                        <TouchableOpacity
                                                                                                                onPress={() => {
                                                                                                                        this.onClickButtonFollow();
                                                                                                                }}
                                                                                                                style={styles.button}>
                                                                                                                <IconFontisto name='heart-alt' size={20} color={colorMain} />
                                                                                                                <Text style={styles.textNavigation}>Theo Dõi</Text>
                                                                                                        </TouchableOpacity>
                                                                                        }

                                                                                </View>
                                                                                : null
                                        }
                                </ScrollView>
                                <Modal
                                        visible={this.state.visibleModalMap}
                                        animationType='slide'
                                        transparent={false}
                                        onRequestClose={() => {
                                                this._onClickCloseModalMap();
                                        }}
                                >
                                        <MapDirections
                                                _onClickCloseModalMap={this._onClickCloseModalMap}
                                                restaurant={this.state.restaurant}
                                        />
                                </Modal>
                        </View>
                );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
                backgroundColor: background
        },
        containerSliderImage: {
                marginVertical: 20
        },
        containerButton: {
                flexDirection: 'row',
                marginHorizontal: 20,
                justifyContent: 'center',
                marginVertical: 20,
        },
        header: {
                height: 50,
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                flexDirection: 'row',
                alignItems: 'center'
        },
        containerStar: {
                flexDirection: 'row'
        },
        flatList: {
                marginBottom: 20
        },
        content: {
                marginHorizontal: 20,
                marginVertical: 20,
                flex: 1
        },
        textTitleRestaurant: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 35,
                textTransform: 'capitalize',
        },
        textTypeRestaurant: {
                fontFamily: 'UVN-Baisau-Regular',
                textTransform: 'uppercase',
                fontSize: 12,
        },
        textStatus: {
                fontFamily: 'UVN-Baisau-Regular',
                color: colorMain,
                textTransform: 'capitalize',
                fontSize: 12,
        },
        textTime: {
                fontFamily: 'UVN-Baisau-Regular',
                color: 'black',
                textTransform: 'uppercase',
                fontSize: 12,
        },
        textAddress: {
                fontFamily: 'UVN-Baisau-Regular',
                textTransform: 'capitalize',
                flex: 1,
                fontSize: 12,
        },
        textPhone: {
                fontFamily: 'UVN-Baisau-Regular',
                marginVertical: 10,
                marginLeft: 10,
                fontSize: 12,
        },
        textIntroduce: {
                fontFamily: 'UVN-Baisau-Regular',
                marginVertical: 20, fontSize: 12,
        },
        button: {
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
                width: 70,
                height: 70,
                marginHorizontal: 10
        },
        textNavigation: {
                fontFamily: 'UVN-Baisau-Regular',
                marginTop: 5,
                fontSize: 12,
                textTransform: 'capitalize',
                textAlign: 'center'
        }
});