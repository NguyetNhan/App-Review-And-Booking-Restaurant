import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { urlServer, colorMain } from '../../../config';
import { convertVND } from '../../../functions/convert';
import Star from 'react-native-vector-icons/MaterialCommunityIcons';
import { API } from '../../overview/sagas/API';

export default class ItemListMenu extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        item: props.item,
                        id: props.item._id,
                        name: props.item.name,
                        image: props.item.image,
                        price: props.item.price,
                        introduce: props.item.introduce,
                        score: null,
                };
        }

        async fetchMediumScore () {
                try {
                        const result = await API.fetchScoreReview(this.state.id);
                        if (result.error) {
                                Alert.alert(
                                        'Thông Báo',
                                        result.message,
                                        [
                                                { text: 'OK', },
                                        ],
                                        { cancelable: false },
                                );
                        } else {
                                this.setState({
                                        score: result.mediumScore
                                });
                        }

                } catch (error) {
                        Alert.alert(
                                'Thông Báo',
                                error.message,
                                [
                                        { text: 'OK', },
                                ],
                                { cancelable: false },
                        );
                }
        }

        componentDidMount () {
                this.fetchMediumScore();
        }


        render () {
                const score = this.state.score;
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
                return (
                        <TouchableOpacity onPress={() => {
                                this.props._onClickOpenDetailMenu({
                                        item: this.state.item,
                                        score: this.state.score
                                });
                        }}>
                                <View style={styles.container}>
                                        <Image
                                                source={{ uri: `${urlServer}${this.state.image}` }}
                                                style={styles.image}
                                        />
                                        <View style={styles.content}>
                                                <Text style={styles.name}
                                                        numberOfLines={1}
                                                        ellipsizeMode='tail'
                                                >{this.state.name}</Text>
                                                <View style={styles.containerStar}>
                                                        {
                                                                this.state.score === null ?
                                                                        <ActivityIndicator animating={true} size={15} color={colorMain} />
                                                                        :
                                                                        listStar.map(item => {
                                                                                if (item.value === 1)
                                                                                        return (<Star key={item.index.toString()} name='star' size={12} color={colorMain} />);
                                                                                else if (item.value === 0)
                                                                                        return (<Star key={item.index.toString()} name='star-half' size={12} color={colorMain} />);
                                                                                else if (item.value === -1)
                                                                                        return (<Star key={item.index.toString()} name='star-outline' size={12} color={colorMain} />);
                                                                        })
                                                        }
                                                </View>
                                                <Text style={styles.price}
                                                        numberOfLines={1}
                                                        ellipsizeMode='tail'>{convertVND(this.state.price)} VND</Text>
                                                <Text style={styles.introduce}
                                                        numberOfLines={2}
                                                        ellipsizeMode='tail'
                                                >{this.state.introduce}</Text>
                                        </View>
                                </View>
                        </TouchableOpacity>
                );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
                flexDirection: 'row',
                marginVertical: 10,
                backgroundColor: 'white',
                alignItems: 'center'
        },
        image: {
                width: 100,
                height: 100
        },
        content: {
                flex: 1,
                padding: 20
        },
        name: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 14
        },
        price: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 10,
                color: 'red'
        },
        introduce: {
                fontFamily: 'UVN-Baisau-Regular',
                fontSize: 10
        },
        containerStar: {
                flexDirection: 'row'
        },
});