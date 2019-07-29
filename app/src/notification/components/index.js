import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default class Notification extends Component {
        static navigationOptions = ({ navigation }) => {
                const tabBarLabel = 'Thông báo'
                const tabBarIcon = ({ tintColor }) => (
                        <Icon name='bell' size={25} color={tintColor} />
                );
                return { tabBarLabel, tabBarIcon };
        }
        render () {
                return (
                        <View>
                                <Text>Notification</Text>
                        </View>
                );
        }
}