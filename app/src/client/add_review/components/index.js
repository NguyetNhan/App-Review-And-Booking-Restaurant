import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import ItemReview from '../containers/item_review';
import { colorMain, background } from '../../../config';
import { AccountModel } from '../../../models/account';
export default class AddReview extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        order: props.navigation.getParam('order', null),
                        account: null,
                        isLoading: true,
                        visibleModalSelectImage: false,
                        listImageSelect: [],
                        restaurant: null,
                        listResultFoodFromAPi: null
                };
        }

        async fetchInfoAccount () {
                const account = await AccountModel.FetchInfoAccountFromDatabaseLocal();
                this.setState({
                        account: account,
                        isLoading: false
                });
        }

        componentDidMount () {
                this.fetchInfoAccount();
        }



        render () {
                if (this.state.isLoading)
                        return (
                                <View style={styles.containerLoading}>
                                        <ActivityIndicator animating={true} size={80} color={colorMain} />
                                </View>
                        );
                else
                        return (
                                <View style={styles.container}>
                                        <View style={styles.header}>
                                                <TouchableOpacity onPress={() => {
                                                        this.props.navigation.goBack();
                                                }}>
                                                        <Icon name='arrowleft' size={25} color='black' />
                                                </TouchableOpacity>
                                                <Text style={styles.textHeader}>viết nhận xét</Text>
                                                <View style={{
                                                        width: 25
                                                }} />
                                        </View>
                                        <View style={styles.content}>
                                                <ScrollView>
                                                        <View style={styles.containerNote}>
                                                                <Text style={styles.textNote}>* Đánh giá của bạn sẽ được công khai trên ứng dụng của chúng tôi, bạn cũng có thể chỉnh sửa lại đánh giá của mình !</Text>
                                                        </View>
                                                        <View style={styles.containerTitleReview}>
                                                                <Text style={styles.textTitleHeaderReview}>* đánh giá địa điểm phục vụ</Text>
                                                        </View>
                                                        <ItemReview
                                                                idRestaurant={this.state.order.idRestaurant}
                                                                type='restaurant'
                                                                account={this.state.account}
                                                                listImageSelect={this.state.listImageSelect}
                                                        />
                                                        <View style={styles.containerTitleReview}>
                                                                <Text style={styles.textTitleHeaderReview}>* đánh giá món ăn và thức uống phục vụ</Text>
                                                        </View>
                                                        {
                                                                this.state.order.food.map(item => (
                                                                        <ItemReview
                                                                                key={item.idFood}
                                                                                type='food'
                                                                                idFood={item.idFood}
                                                                                account={this.state.account}
                                                                        />
                                                                ))
                                                        }
                                                </ScrollView>
                                        </View>
                                </View>
                        );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1
        },
        containerNote: {
                paddingHorizontal: 20,
                marginVertical: 10
        },
        textNote: {
                color: 'red',
                textAlign: 'center',
                fontFamily: 'UVN-Baisau-Regular',
        },
        containerTitleReview: {
                marginHorizontal: 20,
                marginTop: 10
        },
        textTitleHeaderReview: {
                fontFamily: 'UVN-Baisau-Regular',
                textTransform: 'capitalize',
                fontSize: 12,
                color: 'black'
        },
        header: {
                height: 50,
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                flexDirection: 'row',
                alignItems: 'center'
        },
        textHeader: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 18,
                textTransform: 'capitalize'
        },
        content: {
                flex: 1,
                backgroundColor: background
        },
        containerLoading: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
        }
});