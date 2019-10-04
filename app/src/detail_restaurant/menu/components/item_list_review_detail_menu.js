import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { urlServer, colorMain } from '../../../config';
import Star from 'react-native-vector-icons/MaterialCommunityIcons';

export default class ItemReview extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        item: props.item,
                        account: null,
                        isLoading: true
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
                                this.setState({
                                        isLoading: !this.state.isLoading
                                });
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
                                        isLoading: !this.state.isLoading
                                });
                                this.setState({
                                        account: account.data
                                });
                        }
                } catch (error) {
                        this.setState({
                                isLoading: !this.state.isLoading
                        });
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
                const score = this.state.item.score;
                var listStar = [];
                for (let i = 1; i < 6; i++) {
                        var j = i + 1;
                        if (i < score && score < j) {
                                listStar.push({
                                        index: i,
                                        value: 1
                                });
                                listStar.push({
                                        index: i + 1,
                                        value: 0
                                });
                                i++;
                        }
                        else if (i <= score)
                                listStar.push({
                                        index: i,
                                        value: 1
                                });
                        else if (i > score)
                                listStar.push({
                                        index: i,
                                        value: -1
                                });
                }
                if (this.state.isLoading)
                        return (
                                <View style={styles.containerLoading}>
                                        <ActivityIndicator animating={true} size={80} color={colorMain} />
                                </View>
                        );
                else
                        return (
                                <View style={styles.container}>
                                        <View style={styles.containerAvatar}>
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
                                        </View>
                                        {
                                                this.state.account === null ?
                                                        <ActivityIndicator animating={true} size={20} color={colorMain} />
                                                        :
                                                        <Text style={styles.name}>{this.state.account.name}</Text>
                                        }
                                        <View style={styles.containerStar}>
                                                {
                                                        this.state.item.score === null ?
                                                                <ActivityIndicator animating={true} size={15} color={colorMain} />
                                                                :
                                                                listStar.map(item => {
                                                                        if (item.value === 1)
                                                                                return (<Star key={item.index.toString()} name='star' size={15} color={colorMain} />);
                                                                        else if (item.value === 0)
                                                                                return (<Star key={item.index.toString()} name='star-half' size={15} color={colorMain} />);
                                                                        else if (item.value === -1)
                                                                                return (<Star key={item.index.toString()} name='star-outline' size={15} color={colorMain} />);
                                                                })
                                                }
                                        </View>

                                        <Text style={styles.textReview}
                                                numberOfLines={2}
                                                ellipsizeMode='tail'
                                        >{this.state.item.content}</Text>

                                </View>
                        );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
                alignItems: 'center',
                backgroundColor: 'white',
                padding: 20,
                marginHorizontal: 5
        },
        containerLoading: {
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1
        },
        containerAvatar: {
                alignItems: 'center',
                justifyContent: 'center',
        },
        image: {
                width: 50,
                height: 50,
                borderRadius: 25
        },
        containerStar: {
                flexDirection: 'row'
        },
        name: {
                fontFamily: 'UVN-Baisau-Bold',
        },
        textReview: {
                fontFamily: 'UVN-Baisau-Regular',
                fontSize: 12,
                marginTop: 5
        }
});