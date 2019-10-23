import React, { Component } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import IconEntypo from 'react-native-vector-icons/Entypo';
import { colorMain, urlServer } from '../../config';
export default class CustomItemMarker extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        image: props.image,
                        type: props.type
                };
        }

        render () {
                return (
                        <View style={styles.container}>
                                {
                                        this.state.image === null ?
                                                <Image
                                                        source={require('../../assets/images/avatar_user.png')}
                                                        style={styles.image}
                                                /> :
                                                <Image
                                                        source={{ uri: `${urlServer}${this.state.image}` }}
                                                        style={styles.image}
                                                />
                                }

                                <View style={styles.containerIconBottom}>
                                        <IconEntypo name='triangle-down' size={30} color={colorMain} />
                                </View>
                        </View>
                );
        }
}

const styles = StyleSheet.create({
        container: {
                height: 100,
                width: 80,
                alignItems: 'center',

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
                bottom: 0
        },
});