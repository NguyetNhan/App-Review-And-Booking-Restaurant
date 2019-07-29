import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default class Map extends Component {
        static navigationOptions = ({ navigation }) => {
                const tabBarLabel = 'Bản đồ'
                const tabBarIcon = ({ tintColor }) => (
                        <Icon name='map-pin' size={25} color={tintColor} />
                );
                return { tabBarLabel, tabBarIcon };
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