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
                                        {
                                                this.state.account === null ?
                                                        <ActivityIndicator animating={true} size={20} color={colorMain} />
                                                        :
                                                        this.state.account.avatar === null ?
                                                                <View style={styles.containerHeader}>
                                                                        <Image
                                                                                source={require('../../../assets/images/avatar_user.png')}
                                                                                style={styles.image}
                                                                        />
                                                                        <View style={styles.containerName}>
                                                                                <Text style={styles.name}>{this.state.account.name}</Text>
                                                                                <Text style={styles.email}>{this.state.account.email}</Text>
                                                                        </View>
                                                                </View>
                                                                :
                                                                <View style={styles.containerHeader}>
                                                                        <Image
                                                                                source={{ uri: `${urlServer}${this.state.account.avatar}` }}
                                                                                style={styles.image}
                                                                        />
                                                                        <View style={styles.containerName}>
                                                                                <Text style={styles.name}>{this.state.account.name}</Text>
                                                                                <Text style={styles.email}>{this.state.account.email}</Text>
                                                                        </View>
                                                                </View>
                                        }
                                        <View style={styles.star}>
                                                <View style={styles.containerStar}>
                                                        {
                                                                this.state.item.score === null ?
                                                                        <ActivityIndicator animating={true} size={15} color={colorMain} />
                                                                        :
                                                                        listStar.map(item => {
                                                                                if (item.value === 1)
                                                                                        return (<Star key={item.index.toString()} name='star' size={30} color={colorMain} />);
                                                                                else if (item.value === 0)
                                                                                        return (<Star key={item.index.toString()} name='star-half' size={30} color={colorMain} />);
                                                                                else if (item.value === -1)
                                                                                        return (<Star key={item.index.toString()} name='star-outline' size={30} color={colorMain} />);
                                                                        })
                                                        }
                                                </View>
                                        </View>
                                        <Text style={styles.textReview}
                                        >{this.state.item.content}</Text>
                                </View>
                        );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
                backgroundColor: 'white',
                padding: 20,
                marginHorizontal: 20,
                marginVertical: 10
        },
        containerLoading: {
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1
        },
        image: {
                width: 40,
                height: 40,
                borderRadius: 20
        },
        containerStar: {
                flexDirection: 'row',
        },
        star: {
                alignItems: 'center',
                marginVertical: 5
        },
        containerHeader: {
                flexDirection: 'row'
        },
        containerName: {
                marginLeft: 10
        },
        name: {
                fontFamily: 'UVN-Baisau-Bold',
                textTransform: 'capitalize'
        },
        email: {
                fontFamily: 'UVN-Baisau-Regular',
                color: 'gray',
                fontSize: 12
        },
        textReview: {
                fontFamily: 'UVN-Baisau-Regular',
                fontSize: 15,
                textAlign: 'center',
                width: '100%'
        }
});