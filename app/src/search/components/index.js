import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default class Search extends Component {
        static navigationOptions = ({ navigation }) => {
                return {
                        tabBarLabel: 'Tìm kiếm',
                        tabBarIcon: ({ tintColor }) => (<Icon name='search' size={25} color={tintColor} />)
                }
        }
        render () {
                return (
                        <View>
                                <Text>Search</Text>
                        </View>
                );
        }
}