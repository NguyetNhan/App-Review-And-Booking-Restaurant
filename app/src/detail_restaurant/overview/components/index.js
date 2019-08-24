import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, Animated, Dimensions } from 'react-native';
import { urlServer, colorMain } from '../../../config';
import Icon from 'react-native-vector-icons/AntDesign';

export default class OverView extends Component {
        static navigationOptions = ({ navigation }) => {
                return {
                        title: 'giới thiệu',
                }
        }

        constructor (props) {
                super(props);
                this.state = {
                        restaurant: props.navigation.getParam('restaurant'),
                }
        }

        render () {
                const { height, width } = Dimensions.get('window');
                return (
                        <View style={styles.container}>
                                <View style={styles.header}>
                                        <TouchableOpacity onPress={() => {
                                                this.props.navigation.navigate('Home');
                                        }}>
                                                <Icon name='arrowleft' size={25} color='black' />
                                        </TouchableOpacity>
                                </View>
                                <View style={styles.flatList} >
                                        <FlatList
                                                data={this.state.restaurant.imageRestaurant}
                                                keyExtractor={(item, index) => index.toString()}
                                                extraData={this.state}
                                                horizontal={true}
                                                pagingEnabled={true}
                                                renderItem={(item) => {
                                                        return (
                                                                <View>
                                                                        <Image
                                                                                source={{ uri: `${urlServer}${item.item}` }}
                                                                                style={{
                                                                                        width: width,
                                                                                        height: 240,
                                                                                        marginBottom: 4
                                                                                }}
                                                                        />
                                                                </View>
                                                        )
                                                }}
                                        />
                                </View>
                                <View style={styles.content}>
                                        <View>
                                                <Text style={styles.textTitleRestaurant}
                                                        numberOfLines={1}
                                                >{this.state.restaurant.name}</Text>
                                                <Text style={styles.textTypeRestaurant}>{this.state.restaurant.type}</Text>
                                        </View>
                                        <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                        }}>
                                                <Text style={styles.textStatus}>đang mở cửa</Text>
                                                <View style={{
                                                        width: 4,
                                                        height: 4,
                                                        backgroundColor: 'black',
                                                        borderRadius: 2,
                                                        marginHorizontal: 10
                                                }} />
                                                <Text style={styles.textAddress}
                                                >{this.state.restaurant.address}</Text>
                                        </View>
                                </View>


                        </View>
                );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
        },
        header: {
                height: 50,
                justifyContent: 'center',
                paddingHorizontal: 20,
        },
        flatList: {
                marginBottom: 20
        },
        content: {
                flex: 1,
                marginHorizontal: 20
        },
        textTitleRestaurant: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 25,
                textTransform: 'capitalize'
        },
        textTypeRestaurant: {
                fontFamily: 'UVN-Baisau-Regular',
                textTransform: 'uppercase'
        },
        textStatus: {
                fontFamily: 'UVN-Baisau-Regular',
                color: colorMain,
                textTransform: 'capitalize'
        },
        textAddress: {
                fontFamily: 'UVN-Baisau-Regular',
                textTransform: 'capitalize',

        },
});