import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
const { width, height } = Dimensions.get('window');
import { urlServer, colorMain } from '../../config';
import Icon from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Header extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        account: props.account,
                        type: props.type
                };
        }

        render () {
                return (
                        <View style={styles.container}>
                                <View style={styles.containerHeader}>
                                        {
                                                this.state.account.avatar === null ?
                                                        <Image
                                                                source={{ uri: 'https://znews-photo.zadn.vn/w660/Uploaded/lce_qdhuc/2019_03_24/trantran.jpg' }}
                                                                style={styles.image}
                                                        /> :
                                                        <Image
                                                                source={{ uri: `${urlServer}${this.state.account.avatar}` }}
                                                                style={styles.image}
                                                        />
                                        }
                                        <TouchableOpacity
                                                style={styles.buttonBack}
                                                onPress={() => {
                                                        this.props.onClickButtonBack();
                                                }}
                                        >
                                                <Icon name='arrow-left' size={25} color='white' />
                                        </TouchableOpacity>
                                        <View style={{
                                                height: 100,
                                                width: width,
                                        }}>
                                                {
                                                        this.state.type === 'host' ?
                                                                <View style={styles.containerValue}>
                                                                        <View style={styles.containerName}>
                                                                                <Text style={styles.name}>{this.state.account.name}</Text>
                                                                                <View style={styles.containerOptions}>
                                                                                        <View style={styles.options}>
                                                                                                <Text style={styles.score}>{this.state.account.score}</Text>
                                                                                                <Text style={styles.titleOptions}>điểm</Text>
                                                                                        </View>
                                                                                        <View style={styles.options}>
                                                                                                <Text style={styles.numberFriend}>90000</Text>
                                                                                                <Text style={styles.titleOptions}>bạn bè</Text>
                                                                                        </View>
                                                                                </View>
                                                                        </View>
                                                                </View> :
                                                                <View style={styles.containerValue}>
                                                                        <View style={styles.containerName}>
                                                                                <Text style={styles.name}>{this.state.account.name}</Text>
                                                                                <View style={styles.containerOptions}>
                                                                                        <View style={styles.options}>
                                                                                                <TouchableOpacity>
                                                                                                        <FontAwesome5 name='user-plus' size={30} color='gray' />
                                                                                                </TouchableOpacity>
                                                                                                <Text style={styles.titleOptions}>kết bạn</Text>
                                                                                        </View>
                                                                                        <View style={styles.options}>
                                                                                                <TouchableOpacity
                                                                                                        onPress={() => {
                                                                                                                this.props.onClickChat(this.state.account._id);
                                                                                                        }}
                                                                                                >
                                                                                                        <MaterialCommunityIcons name='chat' size={30} color='gray' />
                                                                                                </TouchableOpacity>
                                                                                                <Text style={styles.titleOptions}>nhắn tin</Text>
                                                                                        </View>
                                                                                </View>
                                                                        </View>
                                                                </View>
                                                }
                                        </View>
                                </View>
                        </View>
                );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1
        },
        image: {
                width: width,
                height: 220
        },
        containerHeader: {

        },
        buttonBack: {
                position: 'absolute',
                left: 20,
                top: 50
        },
        containerValue: {
                width: width,
                height: 100,
                alignItems: 'center',
                position: 'absolute',
                top: -50
        },
        containerName: {
                width: 250,
                height: 100,
                alignItems: 'center',
                backgroundColor: 'white',
                borderRadius: 10
        },
        name: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 25,
        },
        containerOptions: {
                flexDirection: 'row',
                flex: 1,
                width: 250,
        },
        options: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
        },
        numberFriend: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 16,
                color: colorMain
        },
        score: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 16,
                color: 'red'
        },
        titleOptions: {
                fontFamily: 'UVN-Baisau-Regular',
                textTransform: 'capitalize',
                fontSize: 12
        }

});