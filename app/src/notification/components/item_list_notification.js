import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { urlServer } from '../../config';

export default class ItemListNotification extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        title: props.title,
                        content: props.content,
                        image: props.image,
                        type: props.type,
                        time: props.time,
                        idAccount: props.idAccount
                };
        }

        render () {
                return (
                        <View style={styles.container}>
                                <Image
                                        source={{ uri: `${urlServer}${this.state.image}` }}
                                        style={styles.image}
                                />
                                <View style={styles.containerText}>
                                        <Text style={styles.textTitle}
                                                numberOfLines={1}
                                        >{this.state.title}</Text>
                                        <Text style={styles.textContent}
                                                numberOfLines={2}
                                        >{this.state.content}</Text>
                                        <Text style={styles.textTime}
                                                numberOfLines={1}
                                        >{this.state.time}</Text>
                                </View>
                        </View>
                );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
                flexDirection: 'row',
                backgroundColor: 'white',
                marginVertical: 10,
                alignItems: 'center',
                padding: 20,
                marginHorizontal: 20
        },
        image: {
                width: 70,
                height: 70,
        },
        containerText: {
                marginLeft: 20,
                width: 200
        },
        textTitle: {
                fontFamily: 'UVN-Baisau-Bold',
        },
        textContent: {
                fontFamily: 'UVN-Baisau-Regular',
        },
        textTime: {
                fontFamily: 'UVN-Baisau-Regular',
                fontSize: 10,
        }
});