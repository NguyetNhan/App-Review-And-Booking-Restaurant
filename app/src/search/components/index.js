import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default class Search extends Component {
        static navigationOptions = ({ navigation }) => {
                const tabBarLabel = 'Tìm kiếm'
                const tabBarIcon = ({ tintColor }) => (
                        <Icon name='search' size={25} color={tintColor} />
                );
                return { tabBarLabel, tabBarIcon };
        }
        render () {
                return (
                        <View>
                                <Text>Search</Text>
                        </View>
                );
        }
}