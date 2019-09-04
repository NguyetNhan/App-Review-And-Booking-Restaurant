import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, FlatList, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { urlServer, colorMain } from '../../../config';
export default class DetailMenu extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        name: props.nameSelect,
                        image: props.imageSelect,
                        introduce: props.introduceSelect,
                        price: props.priceSelect,
                        listReview: [0, 2, 4, 6, 4]
                };
        }

        convertVND (data) {
                const string = data.toString();
                const length = string.length;
                var convert = '';
                var count = 1;
                for (i = length - 1; i >= 0; i--) {
                        if (count == 3 && i != 0) {
                                let char = string.charAt(i);
                                convert = '.'.concat(char, convert);
                                count = 1;
                        } else {
                                let char = string.charAt(i);
                                convert = char.concat('', convert);
                                count = count + 1;
                        }
                }
                return convert;
        }
        render () {
                const screenWidth = Dimensions.get('window').width;
                return (
                        <View style={styles.container}>
                                <ScrollView>
                                        <View >
                                                <Image
                                                        source={{ uri: `${urlServer}${this.state.image}` }}
                                                        style={{
                                                                width: screenWidth,
                                                                height: screenWidth - 35,
                                                                borderBottomLeftRadius: 30,
                                                                borderBottomRightRadius: 30
                                                        }}
                                                />
                                                <TouchableOpacity
                                                        style={styles.buttonBack}
                                                        onPress={() => {
                                                                this.props._onClickCloseDetailMenu();
                                                        }}>
                                                        <Icon name='down' size={30} color='white' />
                                                </TouchableOpacity>
                                        </View>
                                        <View style={styles.content}>
                                                <Text style={styles.name}>{this.state.name}</Text>
                                                <View style={{
                                                        flexDirection: 'row',
                                                        marginBottom: 20,
                                                        alignItems: 'center'
                                                }}>
                                                        <Text style={styles.title}>Giá: </Text>
                                                        <Text style={styles.price}>{this.convertVND(this.state.price)} VND</Text>
                                                </View>
                                                <Text style={styles.title}>Mô Tả</Text>
                                                <Text style={styles.introduce}>{this.state.introduce}</Text>
                                                <Text style={styles.title}>Đánh giá</Text>
                                        </View>
                                        <View>
                                                <FlatList
                                                        data={this.state.listReview}
                                                        extraData={this.state}
                                                        keyExtractor={(item, index) => index.toString()}
                                                        horizontal={true}
                                                        showsHorizontalScrollIndicator={false}
                                                        renderItem={(item) => {
                                                                const length = this.state.listReview.length;
                                                                if (item.index === (length - 1)) {
                                                                        return (
                                                                                <TouchableOpacity
                                                                                        style={{
                                                                                                margin: 5,
                                                                                                alignItems: 'center',
                                                                                                justifyContent: 'center'
                                                                                        }}
                                                                                        onPress={() => {
                                                                                                this.props._onClickCloseDetailMenu();
                                                                                        }}>
                                                                                        <Icon name='pluscircleo' size={80} color={colorMain} />
                                                                                </TouchableOpacity>
                                                                        );
                                                                } else {
                                                                        return (
                                                                                <Image
                                                                                        source={{ uri: `${urlServer}${this.state.image}` }}
                                                                                        style={{
                                                                                                width: 100,
                                                                                                height: 100,
                                                                                                borderRadius: 10,
                                                                                                margin: 5
                                                                                        }}
                                                                                />
                                                                        );
                                                                }
                                                        }}
                                                />
                                        </View>
                                        <View style={{
                                                width: screenWidth,
                                                alignItems: 'center'
                                        }}>
                                                <Text style={{
                                                        color: colorMain,
                                                        textTransform: 'capitalize',
                                                        borderBottomWidth: 1,
                                                        borderBottomColor: colorMain,
                                                        fontFamily: 'UVN-Baisau-Bold',
                                                }}>tất cả</Text>
                                        </View>
                                </ScrollView>
                        </View>
                );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1
        },
        buttonBack: {
                position: 'absolute',
                top: 20,
                left: 20,
                backgroundColor: 'rgba(0,0,0,0.3)',
                width: 35,
                height: 35,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 17
        },
        content: {
                alignItems: 'center',
                margin: 20
        },
        name: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 30,
                marginBottom: 10
        },
        price: {
                fontFamily: 'UVN-Baisau-Bold',
                color: colorMain,
                fontSize: 20,
        },
        introduce: {
                fontFamily: 'UVN-Baisau-Regular',
                fontSize: 18,
                marginBottom: 20
        },
        title: {
                fontFamily: 'OpenSans-Regular',
                fontSize: 16,
                textTransform: 'capitalize'
        }
});