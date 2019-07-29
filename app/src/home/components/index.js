import React, { Component } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default class Home extends Component {
        static navigationOptions = ({ navigation }) => {
                const tabBarLabel = 'Trang chủ'
                const tabBarIcon = ({ tintColor }) => (
                        <Icon name='home' size={25} color={tintColor} />
                );
                return { tabBarLabel, tabBarIcon };
        }

        constructor (props) {
                super(props);

        }

        render () {
                return (
                        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                                <View>
                                        <Text>Home</Text>

                                </View>
                        </SafeAreaView>

                );
        }
}