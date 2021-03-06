import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Modal, ActivityIndicator } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { urlServer, colorMain, background } from '../../config';
import Feather from 'react-native-vector-icons/Feather';
import FriendList from './friend_list';
export default class FormChonLich extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        day: new Date(),
                        time: new Date(),
                        modeDate: 'date',
                        modeTime: 'time',
                        showTime: false,
                        showDate: false,
                        totalMoney: 0,
                        amount: '1',
                        note: '',
                        visibleModalFriendList: false,
                        guests: [],
                        idRestaurant: props.idRestaurant,
                        restaurant: null,
                        isLoading: true
                };
                this.onCloseModalFriendList = this.onCloseModalFriendList.bind(this);
                this.onCompleteInvite = this.onCompleteInvite.bind(this);
        }

        async fetchInfoRestaurant () {
                try {
                        const response = await fetch(`${urlServer}/restaurant/id/${this.state.idRestaurant}`, {
                                method: 'GET',
                                headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                }
                        }).then(value => value.json());
                        if (response.error) {
                                Alert.alert(
                                        'Thông Báo Lỗi',
                                        response.message,
                                        [
                                                { text: 'OK' },
                                        ],
                                        { cancelable: false },
                                );
                                this.setState({
                                        isLoading: false
                                });
                        } else {

                                this.setState({
                                        restaurant: response.data,
                                        isLoading: false
                                });
                        }
                } catch (error) {
                        Alert.alert(
                                'Thông Báo Lỗi',
                                error.message,
                                [
                                        { text: 'OK' },
                                ],
                                { cancelable: false },
                        );
                        this.setState({
                                isLoading: false
                        });
                }
        }

        componentDidMount () {
                this.fetchInfoRestaurant();
        }

        static getDerivedStateFromProps (nextProps, prevState) {
                if (nextProps.changePage !== undefined) {
                        if (nextProps.changePage === 'settling') {
                                nextProps._setChonLich({
                                        receptionTime: new Date(prevState.day.getFullYear(), prevState.day.getMonth(), prevState.day.getDate(), prevState.time.getHours(), prevState.time.getMinutes(), 0, 0),
                                        note: prevState.note,
                                        amountPerson: prevState.amount,
                                        guests: prevState.guests,
                                });
                        }
                }
                if (nextProps.day !== undefined && nextProps.day !== prevState.day) {
                        prevState.day = nextProps.day;
                }
                if (nextProps.time !== undefined && nextProps.time !== prevState.time) {
                        prevState.time = nextProps.time;
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
                        this.setState({
                                showDate: false,
                        });
                        this.props.onSetDateFromLich(date);
                        /*    const day = new Date(date);
                           const dateNow = new Date();
                           if (date > dateNow) {
                                   this.setState({
                                           showDate: !this.state.showDate,
                                   });
                                   this.props.onSetDateFromLich(day);
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
                           } */
                } else if (event.type === 'dismissed') {
                        this.setState({
                                showDate: false,
                        });
                }
        }

        _setTime (event, time) {
                const date = new Date(time);
                const dateNow = new Date();
                const day = new Date(this.state.day);
                if (event.type === 'set') {
                        this.setState({
                                showTime: false,
                                //    time: date
                        });
                        this.props.onSetTimeFromLich(date);
                        /*  if (date.getHours() >= this.state.restaurant.timeClose || date.getHours() < this.state.restaurant.timeOpen) {
                                 this.setState({
                                         showTime: !this.state.showTime,
                                         //    time: date
                                 });
                                 Alert.alert('Thông Báo', 'Nhà hàng không hoạt động trong thời gian này, mời bạn chọn lại !');
                         } else if (date.getHours() < dateNow.getHours()) {
                                 this.setState({
                                         showTime: !this.state.showTime,
                                         //    time: date
                                 });
                                 Alert.alert('Thông Báo', 'Thời Gian Đã Trôi Qua !');
                         } else if (date.getMinutes() < dateNow.getMinutes()) {
                                 this.setState({
                                         showTime: !this.state.showTime,
                                         //    time: date
                                 });
                                 Alert.alert('Thông Báo', 'Thời Gian Đã Trôi Qua !');
                         } else {
                                 this.setState({
                                         showTime: !this.state.showTime,
                                         //    time: date
                                 });
                                 this.props.onSetTimeFromLich(date);
                         } */
                } else if (event.type === 'dismissed') {
                        this.setState({
                                showTime: false,
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
                const convertTime = `${this.state.time.getHours()}h ${this.state.time.getMinutes()}''`;
                const convertDate = `${this.state.day.getDate()} / ${this.state.day.getMonth() + 1} / ${this.state.day.getFullYear()}`;
                if (this.state.isLoading) {
                        return (
                                <View style={{
                                        flex: 1,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                }}>
                                        <ActivityIndicator
                                                animating={true}
                                                size={30}
                                                color={colorMain}
                                        />
                                </View>
                        );
                } else
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

                                                                <Text
                                                                        key={item.idAccount}
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
                                                        oldFriendListInvited={[]}
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