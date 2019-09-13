import React, { Component } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import IconEntypo from 'react-native-vector-icons/Entypo';
import { colorMain, urlServer } from '../../config';
export default class CustomItemMarker extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        image: props.image,
                };
        }

        render () {
                return (
                        <View style={styles.container}>
                                <Image
                                        source={{ uri: `${urlServer}${this.state.image}` }}
                                        style={styles.image}
                                />
                                <View style={styles.containerIconBottom}>
                                        <IconEntypo name='triangle-down' size={30} color={colorMain} />
                                </View>
                        </View>
                );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
        },
        image: {
                width: 80,
                height: 80,
                borderRadius: 40,
                borderWidth: 5,
                borderColor: colorMain,
        },
        containerIconBottom: {
                position: 'absolute',
                bottom: -19,
                left: 25
        },
});