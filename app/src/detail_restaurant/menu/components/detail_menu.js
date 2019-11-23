import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, FlatList, ScrollView, Alert, ActivityIndicator, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Star from 'react-native-vector-icons/MaterialCommunityIcons';
import { urlServer, colorMain, background } from '../../../config';
const { width, height } = Dimensions.get('window');
import { convertVND } from '../../../functions/convert';
import { API } from '../../review/sagas/API';
import ItemReview from './item_list_review_detail_menu';
import ModalListReview from './modal_list_review';
export default class DetailMenu extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        item: props.item,
                        name: props.item.name,
                        image: props.item.image,
                        introduce: props.item.introduce,
                        price: props.item.price,
                        score: props.scoreSelected,
                        listReview: [],
                        visibleModalListReview: false
                };
                this.onOpenModalListReview = this.onOpenModalListReview.bind(this);
                this.onCloseModalListReview = this.onCloseModalListReview.bind(this);
        }

        async fetchListReview () {
                try {
                        const result = await API.fetchListReview({
                                idRestaurant: this.state.item._id,
                                page: 1
                        });
                        if (result.error) {
                                Alert.alert(
                                        'Thông Báo Lỗi',
                                        result.message,
                                        [
                                                { text: 'OK', },
                                        ],
                                        { cancelable: false },
                                );
                        } else {
                                this.setState({
                                        listReview: result.data
                                });
                        }
                } catch (error) {
                        Alert.alert(
                                'Thông Báo Lỗi',
                                error.message,
                                [
                                        { text: 'OK', },
                                ],
                                { cancelable: false },
                        );
                }
        }
        componentDidMount () {
                this.fetchListReview();
        }

        onCloseModalListReview () {
                this.setState({
                        visibleModalListReview: !this.state.visibleModalListReview
                });
        }

        onOpenModalListReview () {
                this.setState({
                        visibleModalListReview: !this.state.visibleModalListReview
                });
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
                        <View style={styles.container}>
                                <ScrollView>
                                        <View style={styles.containerImage}>
                                                <Image
                                                        source={{ uri: `${urlServer}${this.state.image}` }}
                                                        style={styles.image}
                                                />
                                                <TouchableOpacity
                                                        style={styles.buttonBack}
                                                        onPress={() => {
                                                                this.props._onClickCloseDetailMenu();
                                                        }}>
                                                        <Icon name='arrowleft' size={25} color='black' />
                                                </TouchableOpacity>
                                        </View>
                                        <View style={styles.content}>
                                                <Text style={styles.name}>{this.state.name}</Text>
                                                <View style={styles.containerStar}>
                                                        {
                                                                this.state.score === null ?
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
                                                <View style={{
                                                        flexDirection: 'row',
                                                        marginBottom: 20,
                                                        alignItems: 'center'
                                                }}>
                                                        <Text style={styles.title}>Giá: </Text>
                                                        <Text style={styles.price}>{convertVND(this.state.price)} VND</Text>
                                                </View>
                                                <Text style={styles.title}>Mô Tả</Text>
                                                <Text style={styles.introduce}>{this.state.introduce}</Text>
                                                <Text style={styles.title}>Đánh giá</Text>
                                        </View>
                                        <View style={styles.containerFlatList}>
                                                <FlatList
                                                        data={this.state.listReview}
                                                        extraData={this.state}
                                                        keyExtractor={(item, index) => index.toString()}
                                                        horizontal={true}
                                                        showsHorizontalScrollIndicator={false}
                                                        renderItem={(item) => {
                                                                return (
                                                                        <ItemReview
                                                                                item={item.item}
                                                                        />
                                                                );
                                                        }}
                                                />
                                        </View>
                                        <View style={{
                                                width: width,
                                                alignItems: 'center'
                                        }}>
                                                <TouchableOpacity
                                                        onPress={() => {
                                                                this.onOpenModalListReview();
                                                        }}
                                                >
                                                        <Text style={{
                                                                color: colorMain,
                                                                textTransform: 'capitalize',
                                                                borderBottomColor: colorMain,
                                                                fontFamily: 'UVN-Baisau-Regular',
                                                                fontSize: 12
                                                        }}>tất cả</Text>
                                                </TouchableOpacity>
                                        </View>
                                </ScrollView>
                                <Modal
                                        visible={this.state.visibleModalListReview}
                                        animationType='slide'
                                        onRequestClose={() => {
                                                this.onCloseModalListReview();
                                        }}
                                >
                                        <ModalListReview
                                                itemFood={this.state.item}
                                        />
                                </Modal>
                        </View>
                );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
        },
        buttonBack: {
                position: 'absolute',
                top: 20,
                left: 20,
                width: 35,
                height: 35,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 17
        },
        containerImage: {
                alignItems: 'center',
                height: 250,
                justifyContent: 'center'
        },
        image: {
                width: 180,
                height: 180,
                borderRadius: 90,
        },
        content: {
                alignItems: 'center',
        },
        name: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 20,
        },
        containerStar: {
                flexDirection: 'row'
        },
        price: {
                fontFamily: 'UVN-Baisau-Bold',
                color: 'red',
                fontSize: 12,
        },
        introduce: {
                fontFamily: 'UVN-Baisau-Regular',
                fontSize: 16,
                marginBottom: 20,
                marginHorizontal: 20,
                textAlign: 'center'
        },
        title: {
                fontFamily: 'UVN-Baisau-Regular',
                fontSize: 12,
                textTransform: 'capitalize'
        },
        containerFlatList: {
                alignItems: 'center',
                marginVertical: 5
        }

});