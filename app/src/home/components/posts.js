import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
export default class Posts extends Component {
        constructor (props) {
                super(props);
                this.state = {

                };
        }

        render () {
                return (
                        <View style={styles.container}>
                        </View>
                );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
        }
});