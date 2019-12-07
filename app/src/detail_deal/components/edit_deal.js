import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Alert, ActivityIndicator, TouchableOpacity, ScrollView, TextInput, FlatList, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import { urlServer, colorMain, background } from '../../config';
import ItemListModalComplete from '../../order/components/item_list_modal_complete';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FriendList from '../../order/components/friend_list';
export default class EditDeal extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        deal: props.deal,
                        idClient: props.deal.idClient,
                        idRestaurant: props.deal.idRestaurant,
                        customerName: props.deal.customerName,
                        customerEmail: props.deal.customerEmail,
                        customerPhone: props.deal.customerPhone.toString(),
                        amountPerson: props.deal.amountPerson.toString(),
                        food: props.deal.food,
                        receptionTime: new Date(props.deal.receptionTime),
                        totalMoney: props.deal.totalMoney,
                        totalMoneyFood: props.deal.totalMoneyFood,
                        discount: props.deal.discount,
                        note: props.deal.note,
                        guests: props.deal.guests,
                        modeDate: 'date',
                        modeTime: 'time',
                        showTime: false,
                        showDate: false,
                        time: new Date(props.deal.receptionTime),
                        day: new Date(props.deal.receptionTime),
                        visibleModalFriendList: false,
                };
                this.onCloseModalFriendList = this.onCloseModalFriendList.bind(this);
                this.onCompleteInvite = this.onCompleteInvite.bind(this);
        }

        onClickShowDatePicker = () => {
                this.setState({
                        showDate: !this.state.showDate,
                });
        }

        onClickShowTimePicker = () => {
                this.setState({
                        showTime: !this.state.showTime,
                });
        }
        onCloseModalFriendList = () => {
                this.setState({
                        visibleModalFriendList: !this.state.visibleModalFriendList
                });
        }
        onOpenModalFriendList = () => {
                this.setState({
                        visibleModalFriendList: !this.state.visibleModalFriendList
                });
        }
        onCompleteInvite (list) {
                this.setState({
                        guests: list,
                        amountPerson: (list.length + 1).toString(),
                });
        }

        render () {
                const convertTime = `${this.state.receptionTime.getHours()}h ${this.state.receptionTime.getMinutes()}''`;
                const convertDate = `${this.state.receptionTime.getDate()} / ${this.state.receptionTime.getMonth() + 1} / ${this.state.receptionTime.getFullYear()}`;
                return (
                        <View style={styles.container}>
                                <View style={styles.header}>
                                        <TouchableOpacity onPress={this.props.onCloseEditDeal}>
                                                <Icon name='arrowleft' size={25} color='black' />
                                        </TouchableOpacity>
                                        <Text style={styles.textHeader}>Chỉnh Sửa Đặt Chỗ</Text>
                                        <TouchableOpacity onPress={this.props.onCloseEditDeal}>
                                                <Text style={styles.textButtonSave}>Lưu</Text>
                                        </TouchableOpacity>
                                </View>
                                <View style={styles.content}>
                                        <ScrollView
                                                showsVerticalScrollIndicator={false}>
                                                <Text style={styles.title}>Tên</Text>
                                                <TextInput
                                                        value={this.state.customerName}
                                                        style={styles.textInput}
                                                        onChangeText={(text) => this.setState({ customerName: text })}
                                                />
                                                <Text style={styles.title}>Số điện thoại</Text>
                                                <TextInput
                                                        value={this.state.customerPhone}
                                                        keyboardType='number-pad'
                                                        style={styles.textInput}
                                                        onChangeText={(text) => this.setState({ customerPhone: text })}
                                                />
                                                <Text style={styles.title}>Email</Text>
                                                <View style={styles.containerEmail}>
                                                        <Text>{this.state.customerEmail}</Text>
                                                </View>
                                                <Text style={styles.title}>giờ</Text>
                                                <TouchableOpacity
                                                        onPress={this.onClickShowTimePicker}
                                                >
                                                        <View style={styles.containerTime}>
                                                                <Text style={styles.textTime} >{convertTime}</Text>
                                                        </View>
                                                </TouchableOpacity>
                                                <Text style={styles.title}>ngày</Text>
                                                <TouchableOpacity
                                                        onPress={this.onClickShowDatePicker}
                                                >
                                                        <View style={styles.containerTime}>
                                                                <Text style={styles.textTime} >{convertDate}</Text>
                                                        </View>
                                                </TouchableOpacity>
                                                <View style={styles.containerButtonAddFood}>
                                                        <Text style={styles.titleTextFood}>Khách mời</Text>
                                                        <TouchableOpacity
                                                                onPress={this.onOpenModalFriendList}
                                                        >
                                                                <MaterialIcons
                                                                        name='person-add'
                                                                        size={25}
                                                                        color={colorMain}
                                                                />
                                                        </TouchableOpacity>
                                                </View>
                                                <View>
                                                        <FlatList
                                                                data={this.state.guests}
                                                                extraData={this.state}
                                                                keyExtractor={(item, index) => index.toString()}
                                                                renderItem={(item) => {
                                                                        return (
                                                                                <Text style={styles.textNameFriend}>{item.item.name}</Text>
                                                                        );
                                                                }}
                                                        />
                                                </View>
                                                <Text style={styles.title}>Số lượng</Text>
                                                <TextInput
                                                        value={this.state.amountPerson}
                                                        style={styles.textInput}
                                                        onChangeText={(text) => this.setState({ amountPerson: text })}
                                                />
                                                <Text style={styles.title}>Ghi chú</Text>
                                                <TextInput
                                                        value={this.state.note}
                                                        style={styles.textInput}
                                                        multiline
                                                        onChangeText={(text) => this.setState({ note: text })}
                                                />
                                                <View style={styles.containerButtonAddFood}>
                                                        <Text style={styles.titleTextFood}>Món ăn</Text>
                                                        <TouchableOpacity>
                                                                <MaterialIcons
                                                                        name='playlist-add'
                                                                        size={25}
                                                                        color={colorMain}
                                                                />
                                                        </TouchableOpacity>
                                                </View>

                                                <View
                                                        style={styles.flatList}
                                                >
                                                        <FlatList
                                                                data={this.state.food}
                                                                extraData={this.state}
                                                                keyExtractor={(item, index) => index.toString()}
                                                                horizontal={true}
                                                                renderItem={(item) => {
                                                                        return (
                                                                                <ItemListModalComplete
                                                                                        item={item.item}
                                                                                />
                                                                        );
                                                                }}
                                                        />
                                                </View>
                                        </ScrollView>
                                        {
                                                this.state.showTime ?
                                                        <DateTimePicker
                                                                value={this.state.day}
                                                                mode={this.state.modeTime}
                                                                is24Hour={true}
                                                                display="clock"
                                                                onChange={(event, text) => {
                                                                        this._setTime(event, text);
                                                                }}
                                                        /> : null
                                        }
                                        {
                                                this.state.showDate ?
                                                        <DateTimePicker
                                                                value={this.state.time}
                                                                mode={this.state.modeDate}
                                                                display="spinner"
                                                                onChange={(event, text) => {
                                                                        this._setDate(event, text);
                                                                }}
                                                        /> : null
                                        }
                                </View>
                                <Modal
                                        visible={this.state.visibleModalFriendList}
                                        animated={true}
                                        animationType='slide'
                                        onRequestClose={this.onCloseModalFriendList}
                                >
                                        <FriendList
                                                onCloseModalFriendList={this.onCloseModalFriendList}
                                                onCompleteInvite={this.onCompleteInvite}
                                        />
                                </Modal>
                        </View>
                );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1
        },
        header: {
                height: 50,
                width: '100%',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                flexDirection: 'row',
                alignItems: 'center',
        },
        textHeader: {
                fontFamily: 'UVN-Baisau-Regular',
                fontSize: 16,
                textTransform: 'capitalize'
        },
        textButtonSave: {
                fontFamily: 'UVN-Baisau-Bold',
                color: colorMain, fontSize: 16
        },
        content: {
                flex: 1,
                paddingHorizontal: 20
        },
        title: {
                fontFamily: 'UVN-Baisau-Regular',
                textTransform: 'capitalize',
                marginTop: 10
        },
        containerEmail: {
                backgroundColor: background,
                justifyContent: 'center',
                height: 50,
                borderRadius: 10,
                paddingHorizontal: 10
        },
        textEmail: {
                fontFamily: 'OpenSans-Regular'
        },
        textInput: {
                borderWidth: 1,
                fontFamily: 'OpenSans-Regular',
                borderRadius: 10,
                borderColor: 'gray',
        },
        containerTime: {
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,0.1)',
                borderRadius: 10
        },
        textTime: {
                fontFamily: 'UVN-Baisau-Regular',
                fontSize: 20,
        },
        containerButtonAddFood: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 10,
        },
        titleTextFood: {
                fontFamily: 'UVN-Baisau-Regular',
                textTransform: 'capitalize',
        },
        flatList: {
                alignItems: 'center',
                marginTop: 10
        },
        textNameFriend: {
                fontFamily: 'UVN-Baisau-Bold',
                color: colorMain
        }
});