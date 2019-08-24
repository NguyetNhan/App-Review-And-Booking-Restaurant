import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import { urlServer, colorMain, background } from '../../../config';
import Icon from 'react-native-vector-icons/AntDesign';
import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import Carousel from 'react-native-snap-carousel';

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
                        indexSliderImage: 0
                }
        }

        render () {
                const screenWidth = Dimensions.get('window').width;
                return (
                        <View style={styles.container}>
                                <StatusBar
                                        backgroundColor={background}
                                        barStyle='dark-content'
                                />
                                <View style={styles.header}>
                                        <TouchableOpacity onPress={() => {
                                                this.props.navigation.navigate('Home');
                                        }}>
                                                <Icon name='arrowleft' size={25} color='black' />
                                        </TouchableOpacity>
                                </View>
                                <View style={styles.containerSliderImage}>
                                        <Carousel
                                                ref={(c) => { this._slider1Ref = c; }}
                                                data={this.state.restaurant.imageRestaurant}
                                                renderItem={(item) => {
                                                        return (
                                                                <View style={{
                                                                        borderRadius: 50
                                                                }}>
                                                                        <Image
                                                                                source={{ uri: `${urlServer}${item.item}` }}
                                                                                style={{
                                                                                        width: 250,
                                                                                        height: 200,
                                                                                        borderRadius: 10,
                                                                                }}
                                                                        />
                                                                </View>
                                                        );
                                                }}
                                                layout={'default'}
                                                sliderWidth={screenWidth}
                                                sliderHeight={300}
                                                firstItem={0}
                                                itemWidth={250}
                                                loop={true}
                                                loopClonesPerSide={2}
                                                autoplay={true}
                                                autoplayDelay={500}
                                                autoplayInterval={3000}
                                                onSnapToItem={(index) => this.setState({ indexSliderImage: index })}
                                                inactiveSlideScale={0.94}
                                                inactiveSlideOpacity={0.3}
                                        />
                                        <View style={styles.containerTextDanhGia}>
                                                <Text style={{
                                                        color: 'white',
                                                        fontFamily: 'UVN-Baisau-Bold',
                                                        fontSize: 18
                                                }}>9,2</Text>
                                        </View>
                                </View>

                                <View style={styles.content}>
                                        <Text style={styles.textTitleRestaurant}
                                                numberOfLines={1}
                                        >{this.state.restaurant.name}</Text>
                                        <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'space-between'
                                        }}>
                                                <Text style={styles.textTypeRestaurant}>{this.state.restaurant.type}</Text>

                                                <View style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                }}>
                                                        <IconFontAwesome name='phone' size={20} color={colorMain} />
                                                        <Text style={{
                                                                fontFamily: 'UVN-Baisau-Regular',
                                                                marginVertical: 10,
                                                                marginLeft: 10
                                                        }}>{this.state.restaurant.phone}</Text>
                                                </View>
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
                                        <Text style={styles.textIntroduce}>{this.state.restaurant.introduce}</Text>
                                </View>
                                <View style={styles.containerButton}>
                                        <TouchableOpacity style={styles.button}>
                                                <IconSimpleLineIcons name='clock' size={30} color='black' />
                                                <Text style={{
                                                        fontFamily: 'UVN-Baisau-Regular',
                                                        marginTop: 5
                                                }}>8AM-10PM</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.button}>
                                                <IconSimpleLineIcons name='pin' size={30} color='black' />
                                                <Text style={{
                                                        fontFamily: 'UVN-Baisau-Regular',
                                                        marginTop: 5
                                                }}>Theo dõi</Text>
                                        </TouchableOpacity>
                                </View>
                        </View>
                );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
                backgroundColor: background
        },
        containerSliderImage: {
                marginVertical: 20
        },
        containerButton: {
                flexDirection: 'row',
                marginHorizontal: 20,
                justifyContent: 'center',
                marginVertical: 20
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
                marginHorizontal: 20,
                marginVertical: 20,
                flex: 1
        },
        textTitleRestaurant: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 35,
                textTransform: 'capitalize',
        },
        textTypeRestaurant: {
                fontFamily: 'UVN-Baisau-Regular',
                textTransform: 'uppercase',
        },
        textStatus: {
                fontFamily: 'UVN-Baisau-Regular',
                color: colorMain,
                textTransform: 'capitalize'
        },
        textAddress: {
                fontFamily: 'UVN-Baisau-Regular',
                textTransform: 'capitalize',
                flex: 1
        },
        containerTextDanhGia: {
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: colorMain,
                position: 'absolute',
                bottom: -25,
                right: 30,
                alignItems: 'center',
                justifyContent: 'center'
        },
        textIntroduce: {
                fontFamily: 'UVN-Baisau-Regular',
                marginVertical: 20
        },
        button: {
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
                width: 85,
                height: 85,
                marginHorizontal: 20
        }
});