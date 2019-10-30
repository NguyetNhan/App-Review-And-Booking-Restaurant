import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Alert, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { urlServer, colorMain, background } from '../../config';
import Star from 'react-native-vector-icons/MaterialCommunityIcons';
export default class PlaceList extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        idAccount: props.idAccount,
                        isLoading: true,
                        placeList: []
                };
        }

        componentDidMount () {
                this.props.onFetchPlaceListHasArrived(this.state.idAccount);
        }

        static getDerivedStateFromProps (nextProps, prevState) {
                if (nextProps.isLoading !== prevState.isLoading && nextProps.isLoading !== undefined) {
                        prevState.isLoading = false;
                }
                if (nextProps.placeList !== prevState.placeList && nextProps.placeList !== undefined && !prevState.isLoading) {
                        if (nextProps.placeList.length === 0) {
                                prevState.placeList = ['1'];
                        } else {
                                prevState.placeList = nextProps.placeList;
                        }
                }
                if (nextProps.message !== undefined) {
                        Alert.alert(
                                'Thông Báo Lỗi',
                                nextProps.message,
                                [{
                                        'text': 'Ok',
                                        onPress: () => nextProps.onResetPropsMessagePlaceList()
                                }]
                        );
                }
                return null;
        }

        onRefresh () {
                this.setState({
                        isLoading: true
                });
                this.props.onFetchPlaceListHasArrived(this.state.idAccount);
        }

        onClickItem (item) {
                this.props.onSelectedPlace(item);
                this.props.onClosePlaceList();
        }

        componentWillUnmount () {
                this.props.onResetPropsPlaceList();
        }

        render () {
                return (
                        <View style={styles.container}>
                                <View style={styles.header}>
                                        <TouchableOpacity onPress={() => {
                                                this.props.onClosePlaceList();
                                        }}>
                                                <Icon name='arrowleft' size={25} color='black' />
                                        </TouchableOpacity>
                                </View>
                                <View style={styles.flatList}>
                                        <FlatList
                                                data={this.state.placeList}
                                                extraData={this.state}
                                                keyExtractor={(item, index) => index.toString()}
                                                showsVerticalScrollIndicator={false}
                                                refreshing={this.state.isLoading}
                                                onRefresh={() => this.onRefresh()}
                                                renderItem={(item) => {
                                                        if (item.item === '1')
                                                                return <Text style={{
                                                                        width: '100%',
                                                                        textAlign: 'center',
                                                                        textTransform: 'capitalize',
                                                                        fontFamily: 'UVN-Baisau-Regular',
                                                                }}>bạn chưa đến địa điểm nào !</Text>;
                                                        else {
                                                                const score = item.item.star;
                                                                var listStar = [];
                                                                for (let i = 1; i < 6; i++) {
                                                                        var j = i + 1;
                                                                        if (i < score && score < j) {
                                                                                listStar.push({
                                                                                        index: i,
                                                                                        value: 1
                                                                                });
                                                                                listStar.push({
                                                                                        index: i + 1,
                                                                                        value: 0
                                                                                });
                                                                                i++;
                                                                        }
                                                                        else if (i <= score)
                                                                                listStar.push({
                                                                                        index: i,
                                                                                        value: 1
                                                                                });
                                                                        else if (i > score)
                                                                                listStar.push({
                                                                                        index: i,
                                                                                        value: -1
                                                                                });
                                                                }
                                                                return (
                                                                        <TouchableOpacity
                                                                                onPress={() => {
                                                                                        this.onClickItem(item.item);
                                                                                }}
                                                                                style={styles.containerItem}>
                                                                                <Image
                                                                                        source={{ uri: `${urlServer}${item.item.imageRestaurant[0]}` }}
                                                                                        style={styles.imageItem}
                                                                                />
                                                                                <View style={styles.content}>
                                                                                        <Text style={styles.name}
                                                                                                numberOfLines={2}
                                                                                                ellipsizeMode='tail'
                                                                                        >{item.item.name}</Text>
                                                                                        <View
                                                                                                style={styles.star}
                                                                                        >
                                                                                                {
                                                                                                        this.state.score === null ? null :
                                                                                                                listStar.map(item => {
                                                                                                                        if (item.value === 1)
                                                                                                                                return (<Star key={item.index.toString()} name='star' size={15} color={colorMain} />);
                                                                                                                        else if (item.value === 0)
                                                                                                                                return (<Star key={item.index.toString()} name='star-half' size={15} color={colorMain} />);
                                                                                                                        else if (item.value === -1)
                                                                                                                                return (<Star key={item.index.toString()} name='star-outline' size={15} color={colorMain} />);
                                                                                                                })
                                                                                                }
                                                                                        </View>
                                                                                        <Text style={styles.address}>{item.item.address}</Text>
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
                backgroundColor: background
        },
        header: {
                height: 50,
                width: '100%',
                paddingHorizontal: 20,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: background
        },
        flatList: {
                flex: 1
        },
        imageItem: {
                width: 100,
                height: 100,
        },
        containerItem: {
                flex: 1,
                flexDirection: 'row',
                marginHorizontal: 20,
                marginVertical: 5,
                backgroundColor: 'white',
                alignItems: 'center'
        },
        content: {
                marginHorizontal: 10,
                flex: 1,
                justifyContent: 'space-between'
        },
        star: {
                flexDirection: 'row'
        },
        name: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 16
        },
        address: {
                fontFamily: 'UVN-Baisau-Regular',
                fontSize: 12
        }
});