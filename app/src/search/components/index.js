import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, StatusBar, Dimensions, Picker, TextInput, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { colorMain, urlServer, background } from '../../config';
export default class Search extends Component {
        static navigationOptions = ({ navigation }) => {
                return {
                        title: 'Tìm Kiếm',
                        headerTitleStyle: {
                                fontFamily: 'UVN-Baisau-Bold',
                        }
                }
        }

        constructor (props) {
                super(props);
                this.state = {
                        textSearch: '',
                        type: 'bar',
                        address: 'Hồ Chí Minh',
                        listRestaurant: [],
                }
        }

        componentDidMount () {
                const condition = this.props.navigation.getParam('Condition');
                this.setState({
                        type: condition.type,
                        address: condition.address
                })
                const data = {
                        content: this.state.textSearch,
                        type: condition.type,
                        address: condition.address
                }
                this.props.onSearchRestaurant(data);
        }

        static getDerivedStateFromProps (nextProps, prevState) {
                if (nextProps.listRestaurant !== prevState.listRestaurant) {
                        prevState.listRestaurant = nextProps.listRestaurant
                }
                return null;
        }


        _onClickItemFlatList (idRestaurant, idAdmin) {
                var data = {
                        idRestaurant: idRestaurant,
                        idAdmin: idAdmin
                }
                this.props.navigation.navigate('DetailRestaurant', {
                        idRestaurant: data
                });
        }


        render () {
                const screenWidth = Dimensions.get('window').width;
                return (
                        <View style={styles.container}>
                                <StatusBar
                                        barStyle='dark-content'
                                        backgroundColor='white'
                                />
                                <View style={styles.header}>
                                        <TextInput
                                                style={styles.textInputSearch}
                                                placeholder='Tìm kiếm nhà hàng, bar, coffee & trà'
                                                numberOfLines={1}
                                                onChangeText={(text) => {
                                                        this.setState({
                                                                textSearch: text,

                                                        })
                                                        const data = {
                                                                content: text,
                                                                type: this.state.type,
                                                                address: this.state.address
                                                        }
                                                        this.props.onSearchRestaurant(data);
                                                }}
                                        />
                                        <View style={styles.containerTextAddress}>
                                                <Text style={styles.textHintAddress}>Địa điểm</Text>
                                                <Picker
                                                        selectedValue={this.state.address}
                                                        style={styles.picker}
                                                        onValueChange={(itemValue, itemIndex) => {
                                                                this.setState({
                                                                        address: itemValue,
                                                                })
                                                                const data = {
                                                                        content: this.state.textSearch,
                                                                        address: itemValue,
                                                                        type: this.state.type,
                                                                }
                                                                this.props.onSearchRestaurant(data);
                                                        }}>
                                                        <Picker.Item label="Hồ Chí Minh" value="Hồ Chí Minh" />
                                                        <Picker.Item label="Hà Nội" value="Hà Nội" />
                                                        <Picker.Item label="Đà Nẵng" value="Đà Nẵng" />
                                                </Picker>
                                        </View>
                                        <View style={styles.containerTextAddress}>
                                                <Text style={styles.textHintAddress}>Loại</Text>
                                                <Picker
                                                        selectedValue={this.state.address}
                                                        style={styles.picker}
                                                        onValueChange={(itemValue, itemIndex) => {
                                                                this.setState({ address: itemValue })
                                                                const data = {
                                                                        content: this.state.textSearch,
                                                                        type: itemValue,
                                                                        address: this.state.address
                                                                }
                                                                this.props.onSearchRestaurant(data);
                                                        }}>
                                                        <Picker.Item label="Nhà Hàng" value="restaurant" />
                                                        <Picker.Item label="Coffee & Trà" value="coffee" />
                                                        <Picker.Item label="Bar" value="bar" />
                                                </Picker>
                                        </View>
                                </View>
                                <View style={styles.containerContent}>
                                        <FlatList
                                                data={this.state.listRestaurant}
                                                extraData={this.state}
                                                keyExtractor={(item, index) => index.toString()}
                                                showsVerticalScrollIndicator={false}
                                                renderItem={(item) => {
                                                        return (
                                                                <TouchableOpacity style={styles.containerItemList}
                                                                        onPress={() => {
                                                                                this._onClickItemFlatList(item.item._id, item.item.idAdmin);
                                                                        }}>
                                                                        <View>
                                                                                <Image
                                                                                        source={{ uri: `${urlServer}${item.item.imageRestaurant[0]}` }}
                                                                                        style={styles.image}
                                                                                />
                                                                                <View style={styles.containerDanhGia}>
                                                                                        <Text style={styles.textDanhGia}>9,2</Text>
                                                                                </View>
                                                                        </View>
                                                                        <View style={styles.containerInfo}>
                                                                                <Text style={styles.textNameRestaurant}>{item.item.name}</Text>
                                                                                <Text style={styles.textTypeRestaurant}>{item.item.type}</Text>
                                                                                <Text
                                                                                        style={styles.textAddress}
                                                                                        numberOfLines={1}
                                                                                        ellipsizeMode='tail'
                                                                                >{item.item.address}</Text>
                                                                        </View>
                                                                </TouchableOpacity>
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
                backgroundColor: background
        },
        header: {
                height: 150,
                width: '100%',
                paddingHorizontal: 20,
                backgroundColor: 'white'
        },
        containerTextAddress: {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
        },
        containerContent: {
                flex: 1,
                paddingHorizontal: 20,
                paddingVertical: 10
        },
        textInputSearch: {
                width: '100%',
                height: 50,
                borderBottomWidth: 1,
                borderBottomColor: 'gray',
                textAlign: 'center',
                fontFamily: 'UVN-Baisau-Regular',
                fontSize: 18
        },
        textHintAddress: {
                color: 'gray',
                fontFamily: 'UVN-Baisau-Regular',
        },
        picker: {
                marginLeft: 5,
                width: 250
        },
        containerItemList: {
                flexDirection: 'row',
                backgroundColor: 'white',
                marginVertical: 10
        },
        image: {
                width: 120,
                height: 120
        },
        containerDanhGia: {
                position: 'absolute',
                top: 40,
                right: -20,
                backgroundColor: colorMain,
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20
        },
        textDanhGia: {
                color: 'white',
                fontFamily: 'UVN-Baisau-Bold'
        },
        containerInfo: {
                padding: 20,
                paddingLeft: 25,
                justifyContent: 'space-between'
        },
        textNameRestaurant: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 16
        },
        textTypeRestaurant: {
                fontFamily: 'UVN-Baisau-Regular',
                textTransform: 'capitalize'
        },
        textPhone: {
                fontFamily: 'UVN-Baisau-Regular',
                marginLeft: 5
        },
        textAddress: {
                fontFamily: 'UVN-Baisau-Regular',
                width: 150
        }
});