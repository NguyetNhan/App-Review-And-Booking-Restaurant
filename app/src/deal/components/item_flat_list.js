import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default class ItemFlatList extends Component {
        constructor (props) {
                super(props);
                this.state = {

                };
        }

        render () {
                return (
                        <View style={styles.container}>
                                <Image
                                        style={styles.image}
                                />
                                <View style={styles.content}>

                                </View>
                        </View>
                );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
                backgroundColor: 'white'
        },
        image: {

        },
        content: {

        }
});