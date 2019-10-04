import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Alert, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import Star from 'react-native-vector-icons/MaterialCommunityIcons';
import { colorMain, urlServer } from '../../../config';
const { width, height } = Dimensions.get('window');
export default class ItemReview extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        item: props.item,
                        star: props.star,
                        account: null
                };
        }

        async fetchAccount () {
                try {
                        const account = await fetch(`${urlServer}/auth/id/${this.state.item.idReviewAccount}`, {
                                headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                }
                        }).then(value => value.json());
                        if (account.error) {
                                Alert.alert(
                                        'Thông Báo Lỗi',
                                        account.message,
                                        [
                                                { text: 'OK' },
                                        ],
                                        { cancelable: false },
                                );
                        } else {
                                this.setState({
                                        account: account.data
                                });
                        }
                } catch (error) {
                        Alert.alert(
                                'Thông Báo Lỗi',
                                error.message,
                                [
                                        { text: 'OK' },
                                ],
                                { cancelable: false },
                        );
                }
        }

        componentDidMount () {
                this.fetchAccount();
        }

        render () {
                const date = new Date(this.state.item.date);
                const formatDate = `${date.getHours()}h${date.getMinutes()}   ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
                return (
                        <View style={styles.container}>
                                <View style={styles.containerTitle}>
                                        {
                                                this.state.account === null ?
                                                        <ActivityIndicator animating={true} size={20} color={colorMain} />
                                                        :
                                                        this.state.account.avatar === null ?
                                                                <Image
                                                                        source={require('../../../assets/images/avatar_user.png')}
                                                                        style={styles.image}
                                                                />
                                                                :
                                                                <Image
                                                                        source={{ uri: `${urlServer}${this.state.account.avatar}` }}
                                                                        style={styles.image}
                                                                />
                                        }

                                        <View style={styles.containerName}>
                                                {
                                                        this.state.account === null ?
                                                                <ActivityIndicator animating={true} size={20} color={colorMain} />
                                                                : <Text style={styles.name}>{this.state.account.name}</Text>
                                                }
                                                <Text style={styles.time}>{formatDate}</Text>
                                        </View>
                                </View>
                                <View style={styles.star}>
                                        {
                                                this.state.star.map(item => {
                                                        if (item.isChecked)
                                                                return (
                                                                        <Star key={item.index.toString()} name='star' size={20} color={colorMain} />
                                                                );
                                                        else
                                                                return (
                                                                        <Star key={item.index.toString()} name='star-outline' size={20} color={colorMain} />
                                                                );
                                                })
                                        }
                                </View>
                                <Text style={styles.textReview}>{this.state.item.content}</Text>
                                <View>
                                        <FlatList
                                                data={this.state.item.imageReview}
                                                extraData={this.state}
                                                keyExtractor={(item, index) => index.toString()}
                                                horizontal={false}
                                                numColumns={3}
                                                showsVerticalScrollIndicator={false}
                                                renderItem={(item) => {
                                                        return (
                                                                <Image
                                                                        source={{ uri: `${urlServer}${item.item}` }}
                                                                        style={{
                                                                                width: (width - 40) / 3,
                                                                                height: (width - 40) / 3,
                                                                        }}
                                                                />
                                                        );
                                                }}
                                        />
                                </View>
                        </View>
                );
        }
}
const styles = StyleSheet.create({
        container: {
                flex: 1,
                backgroundColor: 'white',
                alignItems: 'center',
                padding: 20,
                marginVertical: 10
        },
        star: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 5
        },
        containerTitle: {
                flexDirection: 'row',
                width: '100%',
        },
        containerName: {
                marginLeft: 10
        },
        image: {
                width: 40,
                height: 40,
                borderRadius: 20,
        },
        name: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 16
        },
        time: {
                fontFamily: 'UVN-Baisau-Regular',
                fontSize: 10
        },
        textReview: {
                width: '100%',
                fontFamily: 'UVN-Baisau-Regular',
                marginBottom: 10
        },
});