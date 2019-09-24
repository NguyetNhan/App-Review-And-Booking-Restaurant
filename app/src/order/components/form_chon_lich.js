import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { urlServer, colorMain, background } from '../../config';

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
                };
        }

        static getDerivedStateFromProps (nextProps, prevState) {
                if (nextProps.changePage !== undefined) {
                        if (nextProps.changePage == 'settling') {
                                nextProps._setChonLich({
                                        receptionTime: prevState.date,
                                        note: prevState.note,
                                        amountPerson: prevState.amount,
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
                        this.setState({
                                showDate: !this.state.showDate,
                                date: date
                        });
                } else if (event.type === 'dismissed') {
                        this.setState({
                                showDate: !this.state.showDate,
                                date: this.state.date
                        });
                }
        }

        _setTime (event, time) {
                if (event.type === 'set') {
                        this.setState({
                                showTime: !this.state.showTime,
                                date: time
                        });
                } else if (event.type === 'dismissed') {
                        this.setState({
                                showTime: !this.state.showTime,
                                date: this.state.date
                        });
                }
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
        }
});