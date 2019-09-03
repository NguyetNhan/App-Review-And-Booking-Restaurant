import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, FlatList, Image, ActivityIndicator, Modal, ScrollView, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colorMain, urlServer, background } from '../../../config';
export default class ConfirmRestaurant extends Component {

        constructor (props) {
                super(props);
                this.state = {
                        listData: [],
                        isLoading: false,
                        visibleFormConfirm: false,
                        imageRestaurant: [],
                        itemSelect: null,
                        nameSelect: '',
                        addressSelect: '',
                        introduceSelect: '',
                        phoneSelect: '',
                        refreshing: false,
                        type: '',
                        messages: ''
                };
        }

        componentDidMount () {
                this.props.onFetchListConfirmRestaurant();
        }

        static getDerivedStateFromProps (props, state) {
                if (props.listData !== state.listData && props.listData !== undefined) {
                        state.listData = props.listData;
                }
                if (props.visibleFormConfirm !== state.visibleFormConfirm && props.visibleFormConfirm !== undefined) {
                        state.visibleFormConfirm = props.visibleFormConfirm;
                }
                if (props.isLoading !== state.isLoading && props.isLoading !== undefined) {
                        state.listData = props.listData;
                }
                if (props.messages !== state.messages && props.messages !== undefined) {
                        state.messages = props.messages;
                        ToastAndroid.show(props.messages, ToastAndroid.LONG);
                }

                return null;
        }

        onClickItem (index) {
                const item = this.state.listData[index];
                this.setState({
                        visibleFormConfirm: true,
                        imageRestaurant: item.imageRestaurant,
                        nameSelect: item.name,
                        addressSelect: item.address,
                        introduceSelect: item.introduce,
                        phoneSelect: item.phone,
                        itemSelect: item,
                        type: item.type,
                });
        }

        onClickButtonAgree () {
                const data = {
                        idRestaurant: this.state.itemSelect._id,
                        idAdmin: this.state.itemSelect.idAdmin
                };
                this.props.onConfirmAgree(data);
        }

        onClickButtonCancel () {
                const data = {
                        idRestaurant: this.state.itemSelect._id
                };
                this.props.onConfirmCancel(data);
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
                                        <Text style={styles.textHeader}>Xác Nhận</Text>
                                </View>
                                <View style={{
                                        flex: 1
                                }}>
                                        <FlatList
                                                data={this.state.listData}
                                                keyExtractor={(item, index) => index.toString()}
                                                extraData={this.state}
                                                onRefresh={() => { this.props.onFetchListConfirmRestaurant(); }}
                                                refreshing={this.state.refreshing}
                                                renderItem={(item) => {
                                                        return (
                                                                <TouchableOpacity style={styles.buttonItem}
                                                                        onPress={() => {
                                                                                this.onClickItem(item.index);
                                                                        }}
                                                                >
                                                                        <Image
                                                                                source={{ uri: `${urlServer}${item.item.imageRestaurant[0]}` }}
                                                                                style={{
                                                                                        height: 120,
                                                                                        width: 120,
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

                                <Modal
                                        visible={this.state.visibleFormConfirm}
                                        animationType="slide"
                                        transparent={false}
                                >
                                        <ScrollView>
                                                <View style={styles.containerFormConfirm}>
                                                        <View style={styles.headerModal}>
                                                                <TouchableOpacity onPress={() => {
                                                                        this.setState({
                                                                                visibleFormConfirm: !this.state.visibleFormConfirm
                                                                        });
                                                                }} >
                                                                        <Icon name='chevron-down' size={40} color='black' />
                                                                </TouchableOpacity>
                                                                <Text style={styles.titleHeader}>{this.state.nameSelect}</Text>
                                                                <View />
                                                        </View>
                                                        <FlatList
                                                                data={this.state.imageRestaurant}
                                                                keyExtractor={(item, index) => index.toString()}
                                                                horizontal={true}
                                                                extraData={this.state}
                                                                showsHorizontalScrollIndicator={false}
                                                                renderItem={(item) => {
                                                                        return (
                                                                                <Image
                                                                                        source={{ uri: `${urlServer}${item.item}` }}
                                                                                        style={{
                                                                                                height: 200,
                                                                                                width: 200,
                                                                                                margin: 2
                                                                                        }}
                                                                                />
                                                                        );
                                                                }}
                                                        />
                                                        <View style={styles.containerFormTextConfirm}>
                                                                {/*   <Text style={styles.textRestaurantFormConfirm}>{this.state.nameSelect}</Text> */}
                                                                <Text style={styles.textTitleFormConfirm}>Mô tả</Text>
                                                                <Text style={styles.textInfoFormConfirm}>{this.state.introduceSelect}</Text>
                                                                <Text style={styles.textTitleFormConfirm}>Địa Chỉ</Text>
                                                                <Text style={styles.textInfoFormConfirm}>{this.state.addressSelect}</Text>
                                                                <Text style={styles.textTitleFormConfirm}>Số Điện Thoại</Text>
                                                                <Text style={styles.textInfoFormConfirm}>{this.state.phoneSelect}</Text>
                                                                <Text style={styles.textTitleFormConfirm}>Loại nhà hàng</Text>
                                                                <Text style={styles.textInfoFormConfirm}>{this.state.type}</Text>
                                                                <TouchableOpacity style={styles.buttonAgree}
                                                                        onPress={() => {
                                                                                this.onClickButtonAgree();
                                                                        }}
                                                                >
                                                                        <Text style={styles.textButtonAgree}>Đồng ý</Text>
                                                                </TouchableOpacity>
                                                                <TouchableOpacity style={styles.buttonCancel}
                                                                        onPress={() => {
                                                                                this.onClickButtonCancel();
                                                                        }}
                                                                >
                                                                        <Text style={styles.textButtonCancel}>Hủy</Text>
                                                                </TouchableOpacity>
                                                        </View>
                                                </View>
                                        </ScrollView>
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
                marginVertical: 10,
                alignItems: 'center',
                padding: 10
        },
        containerText: {
                flex: 1,
                marginLeft: 15
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
        },
        containerFormConfirm: {
                flex: 1,
        },
        headerModal: {
                height: 60,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 10,
                justifyContent: 'space-between'
        },
        titleHeader: {
                fontFamily: 'UVN-Baisau-Bold',
                color: 'black',
                fontSize: 30,
        },
        containerFormTextConfirm: {
                alignItems: 'center',
                marginVertical: 10
        },
        textRestaurantFormConfirm: {
                fontSize: 30,
                fontFamily: 'UVN-Baisau-Bold',
                marginVertical: 10
        },
        textTitleFormConfirm: {
                fontFamily: 'OpenSans-Regular',
                color: 'gray'
        },
        textInfoFormConfirm: {
                fontFamily: 'UVN-Baisau-Regular',
                fontSize: 18,
                marginVertical: 10,
                color: 'black'
        },
        buttonAgree: {
                backgroundColor: colorMain,
                width: 100,
                height: 40,
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: 15
        },
        textButtonAgree: {
                fontFamily: 'UVN-Baisau-Regular',
                color: 'white',
        },
        buttonCancel: {
                backgroundColor: 'red',
                width: 100,
                height: 40,
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center'
        },
        textButtonCancel: {
                fontFamily: 'UVN-Baisau-Regular',
                color: 'white'
        }
});