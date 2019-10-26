import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { urlServer, colorMain, background } from '../../config';
import Feather from 'react-native-vector-icons/Feather';
import FriendList from './friend_list';
export default class FormChonLich extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        date: new Date(),
                        modeDate: 'date',
                        modeTime: 'time',
                        showTime: false,
                        showDate: false,
                        totalMoney: 0,
                        amount: '1',
                        note: '',
                        visibleModalFriendList: false,
                        guests: [],
                };
                this.onCloseModalFriendList = this.onCloseModalFriendList.bind(this);
                this.onCompleteInvite = this.onCompleteInvite.bind(this);
        }

        static getDerivedStateFromProps (nextProps, prevState) {
                if (nextProps.changePage !== undefined) {
                        if (nextProps.changePage === 'settling') {
                                nextProps._setChonLich({
                                        receptionTime: prevState.date,
                                        note: prevState.note,
                                        amountPerson: prevState.amount,
                                        guests: prevState.guests,
                                });
                        }
                }
                return null;
        }


        _onClickShowDatePicker () {
                this.setState({
                        showDate: !this.state.showDate,
                });
        }

        _onClickShowTimePicker () {
                this.setState({
                        showTime: !this.state.showTime,
                });
        }

        _setDate (event, date) {
                if (event.type === 'set') {
                        const datenow = Date.now();
                        if (date > datenow) {
                                this.setState({
                                        showDate: !this.state.showDate,
                                        date: date
                                });
                        }
                        else {
                                this.setState({
                                        showDate: !this.state.showDate,
                                });
                                Alert.alert(
                                        'Thông Báo Lỗi',
                                        'Không được chọn ngày trước ngày hiện tại !',
                                        [
                                                { text: 'OK' },
                                        ],
                                        { cancelable: false },
                                );
                        }
                } else if (event.type === 'dismissed') {
                        this.setState({
                                showDate: !this.state.showDate,
                                date: this.state.date
                        });
                }
        }

        _setTime (event, time) {
                if (event.type === 'set') {
                        const datenow = Date.now();
                        if (time > datenow) {
                                this.setState({
                                        showTime: !this.state.showTime,
                                        date: time
                                });
                        }
                        else {
                                this.setState({
                                        showTime: !this.state.showTime,
                                });
                                Alert.alert(
                                        'Thông Báo Lỗi',
                                        'Không được chọn giờ trước giờ hiện tại !',
                                        [
                                                { text: 'OK' },
                                        ],
                                        { cancelable: false },
                                );
                        }
                } else if (event.type === 'dismissed') {
                        this.setState({
                                showTime: !this.state.showTime,
                                date: this.state.date
                        });
                }
        }

        onCloseModalFriendList () {
                this.setState({
                        visibleModalFriendList: !this.state.visibleModalFriendList
                });
        }
        onOpenModalFriendList () {
                this.setState({
                        visibleModalFriendList: !this.state.visibleModalFriendList
                });
        }

        onCompleteInvite (list) {
                this.setState({
                        guests: list,
                        amount: (list.length + 1).toString(),
                });
        }

        componentWillUnmount () {
                this.props.onResetPropsFormChonLich();
        }
        render () {
                const date = this.state.date;
                const convertTime = `${date.getHours()}h ${date.getMinutes()}''`;
                const convertDate = `${date.getDate()} / ${date.getMonth() + 1} / ${date.getFullYear()}`;
                return (
                        <View style={styles.container}>
                                <View style={styles.form}>
                                        <Text style={styles.title}>giờ</Text>
                                        <TouchableOpacity
                                                onPress={() => {
                                                        this._onClickShowTimePicker();
                                                }}
                                        >
                                                <View style={styles.containerTime}>
                                                        <Text style={styles.textTime} >{convertTime}</Text>
                                                </View>
                                        </TouchableOpacity>
                                        <Text style={styles.title}>ngày</Text>
                                        <TouchableOpacity
                                                onPress={() => {
                                                        this._onClickShowDatePicker();
                                                }}
                                        >
                                                <View style={styles.containerTime}>
                                                        <Text style={styles.textTime} >{convertDate}</Text>
                                                </View>
                                        </TouchableOpacity>
                                        <Text style={styles.title}>mời bạn bè</Text>
                                        <TouchableOpacity
                                                onPress={() => {
                                                        this.onOpenModalFriendList();
                                                }}
                                        >
                                                <Feather
                                                        name='user-plus'
                                                        size={20}
                                                        color='black'
                                                />
                                        </TouchableOpacity>
                                        {
                                                this.state.guests.map(item =>
                                                        <Text key={item.idAccount}
                                                                style={styles.nameInvite}
                                                        >
                                                                {item.name}
                                                        </Text>
                                                )
                                        }
                                        <Text style={styles.title}>số lượng người</Text>
                                        <TextInput
                                                style={styles.textInput}
                                                value={this.state.amount}
                                                onChangeText={(text) => {
                                                        this.setState({
                                                                amount: text
                                                        });
                                                }}
                                                keyboardType='numeric'
                                        />
                                        <Text style={styles.title}>ghi chú</Text>
                                        <TextInput
                                                style={styles.textInputNote}
                                                value={this.state.note}
                                                multiline={true}
                                                onChangeText={(text) => {
                                                        this.setState({
                                                                note: text
                                                        });
                                                }}
                                        />
                                </View>
                                <View style={{
                                        flex: 1
                                }} />
                                <View style={styles.containerButtonNext}>
                                        <View />
                                        <TouchableOpacity
                                                onPress={() => {
                                                        this.props._onClickButtonNext();
                                                }}
                                                style={styles.buttonNext}>
                                                <Text style={styles.textButtonNext}>tiếp</Text>
                                        </TouchableOpacity>
                                </View>
                                {
                                        this.state.showTime ?
                                                <DateTimePicker
                                                        value={this.state.date}
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
                                                        value={this.state.date}
                                                        mode={this.state.modeDate}
                                                        display="spinner"
                                                        onChange={(event, text) => {
                                                                this._setDate(event, text);
                                                        }}
                                                /> : null
                                }
                                <Modal
                                        visible={this.state.visibleModalFriendList}
                                        animated={true}
                                        animationType='slide'
                                        onRequestClose={() => {
                                                this.onCloseModalFriendList();
                                        }}
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
                flex: 1,
        },
        title: {
                fontFamily: 'UVN-Baisau-Regular',
                textTransform: 'capitalize',
                marginTop: 10
        },
        textInput: {
                borderWidth: 1,
                fontFamily: 'OpenSans-Regular',
                borderRadius: 10,
                borderColor: 'gray',
                width: 80,
                textAlign: 'center'
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
        content: {
                flex: 1,
        },
        form: {
                padding: 20,
        },
        textInputNote: {
                borderWidth: 1,
                fontFamily: 'OpenSans-Regular',
                borderRadius: 10,
                borderColor: 'gray',
                height: 100
        },
        containerButtonNext: {
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 20,
                marginBottom: 30
        },
        buttonNext: {
                width: 70,
                height: 45,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colorMain,
                borderRadius: 10,
        },
        textButtonNext: {
                color: 'white',
                fontFamily: 'UVN-Baisau-Regular',
                textTransform: 'uppercase'
        },
        nameInvite: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 16,
                color: colorMain
        }
});