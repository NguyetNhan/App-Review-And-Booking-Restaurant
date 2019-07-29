import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default class Follow extends Component {
        static navigationOptions = ({ navigation }) => {
                const tabBarLabel = 'Theo dõi'
                const tabBarIcon = ({ tintColor }) => (
                        <Icon name='pocket' size={25} color={tintColor} />
                );
                return { tabBarLabel, tabBarIcon };
        }
        constructor (props) {
                super(props);

        }

        render () {
                return (
                        <View>
                                <Text>Follow</Text>
                        </View>
                );
        }

}