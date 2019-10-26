import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { urlServer } from '../../config';

export default class ItemListNotification extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        item: props.item,
                        title: props.title,
                        content: props.content,
                        image: props.image,
                        type: props.type,
                        createDate: props.createDate,
                        idAccount: props.idAccount,
                };
        }


        render () {
                const date = new Date(this.state.createDate);
                const formatDate = `${date.getHours()}h${date.getMinutes()}   ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
                return (
                        <TouchableOpacity onPress={() => {
                                this.props._onClickItem({
                                        item: this.state.item
                                });
                        }}>
                                <View style={styles.container}>
                                        {
                                                this.state.image === null ?
                                                        <Image
                                                                source={require('../../assets/images/avatar_user.png')}
                                                                style={styles.image}
                                                        />
                                                        :
                                                        <Image
                                                                source={{ uri: `${urlServer}${this.state.image}` }}
                                                                style={styles.image}
                                                        />
                                        }
                                        <View style={styles.containerText}>
                                                <View>
                                                        <Text style={styles.textTitle}
                                                        >{this.state.title}</Text>
                                                        <Text style={styles.textContent}
                                                        >{this.state.content}</Text>
                                                </View>
                                                <Text style={styles.textTime}
                                                >{formatDate}</Text>
                                        </View>
                                </View>
                        </TouchableOpacity >
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
                width: 200,
                justifyContent: 'space-between',
        },
        textTitle: {
                fontFamily: 'UVN-Baisau-Bold',
        },
        textContent: {
                fontFamily: 'UVN-Baisau-Regular',
                fontSize: 12,
        },
        textTime: {
                fontFamily: 'UVN-Baisau-Regular',
                fontSize: 10,
        }
});