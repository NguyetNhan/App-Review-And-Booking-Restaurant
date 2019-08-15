import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, FlatList, Image, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colorMain, urlServer } from '../../../config';
export default class ConfirmRestaurant extends Component {

        constructor (props) {
                super(props);
                this.state = {
                        listData: [],
                        isLoading: false,
                };
        }

        componentDidMount () {
                this.props.onFetchListConfirmRestaurant();
        }

        static getDerivedStateFromProps (props, state) {
                if (props.listData !== state.listData) {
                        state.listData = props.listData;
                }
                return state.isLoading = props.isLoading;
        }

        render () {
                return (
                        <View style={styles.container}>
                                <StatusBar
                                        backgroundColor='white'
                                        barStyle='dark-content'
                                />
                                <View style={styles.containerHeader}>
                                        <TouchableOpacity onPress={() => {
                                                this.props.navigation.goBack();
                                        }}>
                                                <Icon name='arrow-left' size={25} color='black' />
                                        </TouchableOpacity>
                                        <Text style={styles.textHeader}>Confirm</Text>
                                </View>
                                <FlatList
                                        style={{
                                                flex: 1
                                        }}
                                        data={this.state.listData}
                                        keyExtractor={(item, index) => index.toString()}
                                        extraData={this.state}
                                        onRefresh={() => { this.props.onFetchListConfirmRestaurant(); }}
                                        refreshing={this.state.isLoading}
                                        renderItem={(item) => {
                                                return (
                                                        <TouchableOpacity style={styles.buttonItem}>
                                                                <Image
                                                                        source={{ uri: `${urlServer}${item.item.imageRestaurant[0]}` }}
                                                                        style={{
                                                                                height: 120,
                                                                                width: 120
                                                                        }}
                                                                />
                                                                <View style={styles.containerText}>
                                                                        <Text style={styles.textRestaurant}>{item.item.name}</Text>
                                                                        <Text style={styles.textAddress}>{item.item.address}</Text>
                                                                        <Text style={styles.textStatus}>Trạng thái: {item.item.status}</Text>
                                                                        <Text style={styles.textChiTiet}>Chi tiết >></Text>
                                                                </View>
                                                        </TouchableOpacity>
                                                );
                                        }}
                                />
                        </View>
                );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1
        },
        containerHeader: {
                width: '100%',
                height: 50,
                flexDirection: 'row',
                backgroundColor: 'white',
                alignItems: 'center',
                paddingHorizontal: 5,
        },
        textHeader: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 20,
                marginLeft: 10
        },
        buttonItem: {
                flexDirection: 'row',
                flex: 1,
                marginHorizontal: 15,
                backgroundColor: 'white',
                marginVertical: 10
        },
        containerText: {
                paddingHorizontal: 15,
                paddingVertical: 15,
                flex: 1
        },
        textRestaurant: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 18
        },
        textAddress: {
                fontFamily: 'OpenSans-Regular',
        },
        textChiTiet: {
                fontFamily: 'UVN-Baisau-Regular',
                color: colorMain,
                textAlign: 'right'
        },
        textStatus: {
                fontFamily: 'OpenSans-Regular',
        }
});