import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
export default class Review extends Component {
        static navigationOptions = ({ navigation }) => {
                return {
                        title: 'đánh giá',
                }
        }
        constructor (props) {
                super(props);
        }
        render () {
                return (
                        <View style={styles.container}>
                                <TouchableOpacity onPress={
                                        () => {
                                                this.props.navigation.goBack();
                                        }
                                }>
                                        <Text>go Back</Text>
                                </TouchableOpacity>
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
                justifyContent: 'center',
                paddingHorizontal: 20,
        },
});