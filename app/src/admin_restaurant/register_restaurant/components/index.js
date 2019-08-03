import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
export default class RegisterRestaurant extends Component {

        constructor (props) {
                super(props);
        }
        render () {
                return (
                        <View style={styles.container}>
                                <ScrollView  >
                                        <Text style={styles.textHint}>Tên cửa hàng</Text>
                                        <TextInput style={styles.textInput} />
                                        <Text style={styles.textHint}>Giới thiệu</Text>
                                        <TextInput style={styles.textInput}
                                                editable={true}
                                                multiline={true}
                                                numberOfLines={4}
                                                maxLength={40} />
                                        <Text style={styles.textHint}>Số điện thoại</Text>
                                        <TextInput style={styles.textInput}
                                                keyboardType='number-pad'
                                        />
                                        <Text style={styles.textHint}>Địa chỉ</Text>
                                        <View style={styles.containerTextInput}>
                                                <TextInput style={styles.textInputSeletion}
                                                        placeholder='Thành phố, Tỉnh ' />
                                                <Icon name='down' size={25} color='black' />
                                        </View>
                                        <View style={styles.containerTextInput}>
                                                <TextInput style={styles.textInputSeletion}
                                                        placeholder='Quận, Huyện'
                                                />
                                                <Icon name='down' size={25} color='black' />
                                        </View>
                                        <TextInput style={styles.textInput} placeholder='Số nhà, Tên đường' />
                                        <View style={{
                                                width: 300,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                marginTop: 10
                                        }}>
                                                <Text style={{
                                                        color: 'black',
                                                        fontFamily: 'UVN-Baisau-Regular',
                                                        marginTop: 10,
                                                        flex: 1
                                                }}>Ảnh giới thiệu</Text>
                                                <TouchableOpacity>
                                                        <Icon name='picture' size={25} color='black' />
                                                </TouchableOpacity>
                                        </View>

                                </ScrollView>
                        </View>
                );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
                alignItems: 'center'
        },
        containerTextInput: {
                width: 300,
                flexDirection: 'row',
                borderBottomWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 10
        },
        textInputSeletion: {
                flex: 1,
                fontFamily: 'OpenSans-Regular',
        },
        textHint: {
                color: 'black',
                fontFamily: 'UVN-Baisau-Regular',
                marginTop: 10
        },
        textInput: {
                width: 300,
                borderBottomWidth: 1,
                fontFamily: 'OpenSans-Regular',
        }
});