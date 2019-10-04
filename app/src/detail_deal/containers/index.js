import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import StepIndicator from './step_indicator';

export default class DetailDeal extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        idOrder: props.navigation.getParam('idOrder', null)
                };
                this._onCallback = this._onCallback.bind(this);
                this._onClickChangeScreenRestaurant = this._onClickChangeScreenRestaurant.bind(this);
        }

        _onCallback () {
                this.props.navigation.state.params.callback();
        }

        _onClickChangeScreenRestaurant (order) {
                this.props.navigation.navigate('AddReview', {
                        order: order
                });
        }

        render () {
                return (
                        <View style={styles.container}>
                                <StatusBar
                                        backgroundColor='white'
                                        barStyle='dark-content'
                                />
                                <View style={styles.containerHeader}>
                                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                                <Icon name='arrowleft' size={25} color='black' />
                                        </TouchableOpacity>
                                        <Text style={styles.textHeader}>chi tiết đơn hàng</Text>
                                        <View style={{
                                                width: 25
                                        }} />
                                </View>
                                <View style={styles.content}>
                                        <StepIndicator
                                                idOrder={this.state.idOrder}
                                                _onCallback={this._onCallback}
                                                _onClickChangeScreenRestaurant={this._onClickChangeScreenRestaurant}
                                        />
                                </View>
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
                justifyContent: 'space-between',
                backgroundColor: 'white',
                alignItems: 'center',
                paddingHorizontal: 20
        },
        textHeader: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 18,
                textTransform: 'capitalize'
        },
        content: {
                flex: 1
        }
});
