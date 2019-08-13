import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colorMain } from '../../../config';
export default class ConfirmRestaurant extends Component {

        constructor (props) {
                super(props);
                this.state = {
                        data: [1, 5, 5, 5, 5, 5, 5, 5, 5]
                };
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
                                        data={this.state.data}
                                        keyExtractor={(item, index) => index.toString()}
                                        extraData={this.state}
                                        renderItem={() => {
                                                return (
                                                        <TouchableOpacity style={styles.buttonItem}>
                                                                <Image
                                                                        source={{ uri: 'https://i.pinimg.com/originals/f4/22/36/f422363e23bb12a9b5100b4c22c6b85a.jpg' }}
                                                                        style={{
                                                                                height: 120,
                                                                                width: 120
                                                                        }}
                                                                />
                                                                <View style={styles.containerText}>
                                                                        <Text style={styles.textRestaurant}>Ten Nha Hang</Text>
                                                                        <Text style={styles.textAddress}>Dia Chi</Text>
                                                                        <Text style={styles.textStatus}>Trạng thái: Chưa xác nhận</Text>
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