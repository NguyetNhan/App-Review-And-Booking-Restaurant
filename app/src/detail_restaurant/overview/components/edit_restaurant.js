import React, { Component } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, TextInput, Picker } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
export default class EditRestaurant extends Component {

        constructor (props) {
                super(props);

        }

        render () {
                return (
                        <View style={styles.container} >
                                <View style={styles.header}>
                                        <TouchableOpacity onPress={() => {
                                                this.props._onClickCloseModalEdit();
                                        }}>
                                                <Icon name='down' size={30} color='black' />
                                        </TouchableOpacity>
                                        <Text style={{
                                                fontFamily: 'UVN-Baisau-Bold',
                                                textTransform: 'capitalize',
                                                fontSize: 20
                                        }}>chỉnh sửa</Text>
                                        <TouchableOpacity onPress={() => {
                                                this.setState({
                                                        visibleModalEditRestaurant2: true
                                                });
                                        }}>
                                                <Icon name='check' size={30} color='black' />
                                        </TouchableOpacity>
                                </View>
                                <View style={styles.content}>
                                        <Text>ten nha hang</Text>
                                        <Text>Gioi thieu</Text>
                                        <TextInput />
                                        <Text>Loai nha hang</Text>
                                        <TextInput />
                                        <Text>ten nha hang</Text>
                                        <TextInput />
                                        <Text>ten nha hang</Text>
                                        <TextInput />
                                </View>
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
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                alignItems: 'center',
        },
        content: {
                flex: 1,
                padding: 20
        }
});