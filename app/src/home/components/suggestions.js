import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, FlatList, Alert, Dimensions, RefreshControl, Modal } from 'react-native';
import ItemPlace from '../containers/item_place';
import ItemFood from './item_food';
const { width, height } = Dimensions.get('window');
import ModalListPlaceBest from '../containers/modal_list_place_best';
import ModalListFoodBest from '../containers/modal_list_food_best';
export default class Suggestions extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        account: props.account,
                        geolocation: props.geolocation,
                        isLoading: true,
                        listPlaceByLocation: [],
                        listPlaceTheBest: [],
                        listFoodTheBest: [],
                        visibleModalListPlaceBest: false,
                        visibleModalListFoodBest: false
                };
                this.onCloseModalListPlaceBest = this.onCloseModalListPlaceBest.bind(this);
                this.onCloseModalListFoodBest = this.onCloseModalListFoodBest.bind(this);
                this.onChangeScreenDetailPlace = this.onChangeScreenDetailPlace.bind(this);
        }

        componentDidMount () {
                if (this.state.geolocation !== null) {
                        this.props.onFetchNearbyLocationPlace(this.state.geolocation);
                }
                this.props.onFetchPlaceTheBest(1);
                this.props.onFetchFoodTheBest(1);
        }

        static getDerivedStateFromProps (nextProps, prevState) {
                if (nextProps.isLoading !== prevState.isLoading && nextProps.isLoading !== undefined) {
                        prevState.isLoading = nextProps.isLoading;
                }
                if (nextProps.listPlaceByLocation !== prevState.listPlaceByLocation && nextProps.listPlaceByLocation !== undefined && !prevState.isLoading) {

                        prevState.listPlaceByLocation = nextProps.listPlaceByLocation;
                }
                if (nextProps.listPlaceTheBest !== prevState.listPlaceTheBest && nextProps.listPlaceTheBest !== undefined && !prevState.isLoading) {

                        prevState.listPlaceTheBest = nextProps.listPlaceTheBest;
                }
                if (nextProps.listFoodTheBest !== prevState.listFoodTheBest && nextProps.listFoodTheBest !== undefined && !prevState.isLoading) {

                        prevState.listFoodTheBest = nextProps.listFoodTheBest;
                }
                if (nextProps.message !== undefined) {
                        Alert.alert(
                                'Thông Báo',
                                nextProps.message,
                                [
                                        {
                                                text: 'OK',
                                                onPress: () => nextProps.onResetPropsMessageSuggestion()
                                        },
                                ],
                                { cancelable: false },
                        );
                }
                return null;
        }

        //FIXME: refresh theo geo
        onRefresh () {
                if (this.state.geolocation !== null) {
                        this.props.onFetchNearbyLocationPlace(this.state.geolocation);
                }
                this.props.onFetchPlaceTheBest(1);
                this.props.onFetchFoodTheBest(1);
        }

        onCloseModalListPlaceBest () {
                this.setState({
                        visibleModalListPlaceBest: !this.state.visibleModalListPlaceBest
                });
        }

        onOpenModalListPlaceBest () {
                this.setState({
                        visibleModalListPlaceBest: !this.state.visibleModalListPlaceBest
                });
        }
        onCloseModalListFoodBest () {
                this.setState({
                        visibleModalListFoodBest: !this.state.visibleModalListFoodBest
                });
        }

        onOpenModalListFoodBest () {
                this.setState({
                        visibleModalListFoodBest: !this.state.visibleModalListFoodBest
                });
        }

        onChangeScreenDetailPlace (idRestaurant, idAdmin) {
                this.props.onChangeScreenDetailPlace(idRestaurant, idAdmin);
        }

        componentWillUnmount () {
                this.props.onResetPropsSuggestion();
        }

        render () {
                return (
                        <View style={styles.container}>
                                <ScrollView
                                        showsVerticalScrollIndicator={false}
                                        refreshControl={
                                                <RefreshControl
                                                        refreshing={this.state.isLoading}
                                                        onRefresh={() => {
                                                                this.onRefresh();
                                                        }}
                                                />
                                        }
                                >
                                        {
                                                this.state.geolocation === null ? null :
                                                        <View
                                                        >
                                                                <Text style={styles.title}>Địa điểm gần bạn</Text>
                                                                <View
                                                                        style={{
                                                                                alignItems: 'center'
                                                                        }}>
                                                                        <FlatList
                                                                                data={this.state.listPlaceByLocation}
                                                                                extraData={this.state}
                                                                                keyExtractor={(item, index) => index.toString()}
                                                                                showsVerticalScrollIndicator={false}
                                                                                refreshing={this.state.isLoading}
                                                                                numColumns={2}
                                                                                horizontal={false}
                                                                                renderItem={(item) => {
                                                                                        return (
                                                                                                <ItemPlace
                                                                                                        item={item.item}
                                                                                                        onChangeScreenDetailPlace={this.onChangeScreenDetailPlace}
                                                                                                />
                                                                                        );
                                                                                }}
                                                                        />
                                                                </View>
                                                                <View style={styles.containerButtonXemThem}>
                                                                        <Text
                                                                                onPress={() => {
                                                                                        this.props.onChangeScreenMap();
                                                                                }}
                                                                                style={styles.textXemThem}>truy cập bản đồ</Text>
                                                                </View>
                                                        </View>
                                        }
                                        <View
                                        >
                                                <Text style={styles.title}>Địa điểm được đánh giá nhiều nhất</Text>
                                                <View
                                                        style={{
                                                                alignItems: 'center'
                                                        }}
                                                >
                                                        <FlatList
                                                                data={this.state.listPlaceTheBest}
                                                                extraData={this.state}
                                                                keyExtractor={(item, index) => index.toString()}
                                                                refreshing={this.state.isLoading}
                                                                showsVerticalScrollIndicator={false}
                                                                numColumns={2}
                                                                horizontal={false}
                                                                renderItem={(item) => {
                                                                        return (
                                                                                <ItemPlace
                                                                                        item={item.item}
                                                                                        onChangeScreenDetailPlace={this.onChangeScreenDetailPlace}
                                                                                />
                                                                        );
                                                                }}
                                                        />
                                                </View>
                                                <View style={styles.containerButtonXemThem}>
                                                        <Text
                                                                onPress={() => {
                                                                        this.onOpenModalListPlaceBest();
                                                                }}
                                                                style={styles.textXemThem}>xem thêm</Text>
                                                </View>
                                        </View>
                                        <View>
                                                <Text style={styles.title}>Top các món ngon được đánh giá</Text>
                                                <View
                                                        style={{
                                                                alignItems: 'center'
                                                        }}>
                                                        <FlatList
                                                                data={this.state.listFoodTheBest}
                                                                extraData={this.state}
                                                                keyExtractor={(item, index) => index.toString()}
                                                                showsVerticalScrollIndicator={false}
                                                                refreshing={this.state.isLoading}
                                                                numColumns={2}
                                                                horizontal={false}
                                                                renderItem={(item) => {
                                                                        return (
                                                                                <ItemFood
                                                                                        item={item.item}
                                                                                        onChangeScreenDetailPlace={this.onChangeScreenDetailPlace}
                                                                                />
                                                                        );
                                                                }}
                                                        />
                                                </View>
                                                <View style={styles.containerButtonXemThem}>
                                                        <Text
                                                                onPress={() => {
                                                                        this.onOpenModalListFoodBest();
                                                                }}
                                                                style={styles.textXemThem}>xem thêm</Text>
                                                </View>
                                        </View>

                                        <Text style={styles.title}>Nhà hàng không gian đẹp</Text>
                                        <Text style={styles.title}>Quán Coffee không gian yên tĩnh</Text>
                                </ScrollView>
                                <Modal
                                        visible={this.state.visibleModalListPlaceBest}
                                        animationType='slide'
                                        onRequestClose={() => {
                                                this.onCloseModalListPlaceBest();
                                        }}
                                >
                                        <ModalListPlaceBest
                                                onCloseModalListPlaceBest={this.onCloseModalListPlaceBest}
                                                onChangeScreenDetailPlace={this.onChangeScreenDetailPlace}
                                        />
                                </Modal>
                                <Modal
                                        visible={this.state.visibleModalListFoodBest}
                                        animationType='slide'
                                        onRequestClose={() => {
                                                this.onCloseModalListFoodBest();
                                        }}
                                >
                                        <ModalListFoodBest
                                                onCloseModalListFoodBest={this.onCloseModalListFoodBest}
                                                onChangeScreenDetailPlace={this.onChangeScreenDetailPlace}
                                        />
                                </Modal>
                        </View>
                );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
        },
        titleFirst: {
                fontFamily: 'UVN-Baisau-Bold',
                marginLeft: 20,
                marginTop: 40,
                fontSize: 16
        },
        title: {
                fontFamily: 'UVN-Baisau-Bold',
                marginLeft: 20,
                fontSize: 16
        },
        containerButtonXemThem: {
                width: width,
                paddingHorizontal: 20,
                alignItems: 'flex-end'
        },
        textXemThem: {
                fontFamily: 'UVN-Baisau-Bold',
                textTransform: 'capitalize',
                color: 'blue',
                fontSize: 12
        }
});