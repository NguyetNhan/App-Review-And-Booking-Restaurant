import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

export default class PostRestaurant extends Component {
        static navigationOptions = ({ navigation }) => {
                return {
                        title: 'bài viết',
                }
        }
        constructor (props) {
                super(props);

        }
        render () {
                return (
                        <View>
                                <Text>csdgs</Text>
                        </View>
                );
        }
}