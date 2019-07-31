import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default class Map extends Component {
        static navigationOptions = ({ navigation }) => {
                return {
                        tabBarLabel: 'Bản đồ',
                        tabBarIcon: ({ tintColor }) => (<Icon name='map-pin' size={25} color={tintColor} />)
                }
        }

        constructor (props) {
                super(props);

        }

        render () {
                return (
                        <View>
                                <Text>Map</Text>
                        </View>
                );
        }
}