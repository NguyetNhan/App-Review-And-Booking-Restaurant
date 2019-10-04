import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, StatusBar, Dimensions, Picker, TextInput, TouchableOpacity, Image, Alert, ScrollView, Modal, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { colorMain, urlServer, background } from '../../config';
const { width, height } = Dimensions.get('window');
import ModalListSearch from '../containers/modal_list_search';
export default class Search extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        textSearch: '',
                        listRestaurant: [],
                        listClient: [],
                        isLoading: false,
                        countItem: null,
                        visibleModalListSearch: false,
                        type: ''
                };
                this.onCloseModalListSearch = this.onCloseModalListSearch.bind(this);
                this.onOpenModalListSearch = this.onOpenModalListSearch.bind(this);
                this._onClickItemRestaurant = this._onClickItemRestaurant.bind(this);
        }


        static getDerivedStateFromProps (nextProps, prevState) {
                if (nextProps.isLoading !== prevState.isLoading && nextProps.isLoading !== undefined) {
                        prevState.isLoading = nextProps.isLoading;
                }
                if (nextProps.listClient !== prevState.listClient && nextProps.listClient !== undefined) {
                        prevState.listClient = nextProps.listClient;
                }
                if (nextProps.listRestaurant !== prevState.listRestaurant && nextProps.listRestaurant !== undefined) {
                        prevState.listRestaurant = nextProps.listRestaurant;
                }
                if (nextProps.countItem !== prevState.countItem && nextProps.countItem !== undefined) {
                        prevState.countItem = nextProps.countItem;
                }
                if (nextProps.message !== undefined) {
                        Alert.alert(
                                'Thông Báo Lỗi ',
                                nextProps.message,
                                [
                                        { text: 'OK', onPress: () => nextProps.onResetPropsMessage() },
                                ],
                                { cancelable: false },
                        );
                }
                return null;
        }


        _onClickItemRestaurant (idRestaurant, idAdmin) {
                var data = {
                        idRestaurant: idRestaurant,
                        idAdmin: idAdmin
                };
                this.props.navigation.navigate('DetailRestaurant', {
                        IdConfigDetailRestaurant: data,
                        GoBack: 'Search'
                });
        }

        onSearch () {
                this.setState({
                        isLoading: !this.state.isLoading
                });
                const text = this.state.textSearch;
                if ((text.trim()).length !== 0) {
                        this.props.onSearchRestaurantAndClient(this.state.textSearch);
                }
        }

        onOpenModalListSearch (type) {
                this.setState({
                        visibleModalListSearch: !this.state.visibleModalListSearch,
                        type: type
                });
        }
        onCloseModalListSearch () {
                this.setState({
                        visibleModalListSearch: !this.state.visibleModalListSearch
                });
        }

        componentWillUnmount () {
                this.props.onResetProps();
        }

        render () {
                return (
                        <View style={styles.container}>
                                <StatusBar
                                        backgroundColor='white'
                                        barStyle='dark-content'
                                />
                                <View style={styles.containerHeader}>
                                        <TouchableOpacity onPress={() => {
                                                this.props.navigation.goBack();
                                        }}>
                                                <Icon name='arrow-left' size={25} color='black' />
                                        </TouchableOpacity>
                                        <TextInput
                                                style={styles.textInput}
                                                placeholder='Tìm Kiếm'
                                                autoFocus={true}
                                                onChangeText={(text) => {
                                                        this.setState({
                                                                textSearch: text
                                                        });
                                                        this.onSearch();
                                                }}
                                        />
                                </View>
                                <View style={styles.content}>
                                        {
                                                this.state.isLoading ?
                                                        <View style={styles.containerLoading}>
                                                                <ActivityIndicator animating={true} size={30} color={colorMain} />
                                                        </View>
                                                        :
                                                        <ScrollView>
                                                                {
                                                                        this.state.countItem === null ? null :
                                                                                <View style={styles.containerCountItem}>
                                                                                        <Text style={styles.textTitle}>có {this.state.countItem.client + this.state.countItem.restaurant} kết quả tìm kiếm</Text>
                                                                                </View>
                                                                }
                                                                {
                                                                        this.state.listRestaurant.length === 0 ? null
                                                                                :
                                                                                <View>
                                                                                        <Text style={styles.textTitle}>*địa điểm</Text>
                                                                                        <View style={styles.containerList}>
                                                                                                {
                                                                                                        this.state.listRestaurant.map(item => {
                                                                                                                return (
                                                                                                                        <TouchableOpacity key={item._id}
                                                                                                                                onPress={() => {
                                                                                                                                        this._onClickItemRestaurant(item._id, item.idAdmin);
                                                                                                                                }}
                                                                                                                        >
                                                                                                                                <View style={styles.containerItem}
                                                                                                                                >
                                                                                                                                        <Image
                                                                                                                                                source={{ uri: `${urlServer}${item.imageRestaurant[0]}` }}
                                                                                                                                                style={styles.image}
                                                                                                                                        />
                                                                                                                                        <View style={styles.containerName}>
                                                                                                                                                <Text style={styles.name}>{item.name}</Text>
                                                                                                                                                <Text style={styles.address}>{item.address}</Text>
                                                                                                                                        </View>
                                                                                                                                </View>
                                                                                                                        </TouchableOpacity>
                                                                                                                );
                                                                                                        })
                                                                                                }
                                                                                                {
                                                                                                        this.state.listRestaurant.length === 5 ?
                                                                                                                <View style={styles.containerButtonAll}>
                                                                                                                        <TouchableOpacity
                                                                                                                                onPress={() => {
                                                                                                                                        this.onOpenModalListSearch('restaurant');
                                                                                                                                }}
                                                                                                                        >
                                                                                                                                <Text style={styles.textButtonAll}>tất cả</Text>
                                                                                                                        </TouchableOpacity>
                                                                                                                </View> : null
                                                                                                }

                                                                                        </View>
                                                                                </View>
                                                                }
                                                                {
                                                                        this.state.listClient.length === 0 ? null
                                                                                :
                                                                                <View>
                                                                                        <Text style={styles.textTitle}>*mọi người</Text>
                                                                                        <View style={styles.containerList}>
                                                                                                {
                                                                                                        this.state.listClient.map(item => {
                                                                                                                return (
                                                                                                                        <View key={item._id}
                                                                                                                                style={styles.containerItem}
                                                                                                                        >
                                                                                                                                {
                                                                                                                                        item.avatar === null ?
                                                                                                                                                <Image
                                                                                                                                                        source={require('../../assets/images/avatar_user.png')}
                                                                                                                                                        style={styles.image}
                                                                                                                                                /> :
                                                                                                                                                <Image
                                                                                                                                                        source={{ uri: `${urlServer}${item.avatar}` }}
                                                                                                                                                        style={styles.image}
                                                                                                                                                />
                                                                                                                                }
                                                                                                                                <View style={styles.containerName}>
                                                                                                                                        <Text style={styles.name}>{item.name}</Text>
                                                                                                                                        <Text style={styles.address}>{item.email}</Text>
                                                                                                                                </View>
                                                                                                                        </View>
                                                                                                                );
                                                                                                        })
                                                                                                }
                                                                                                {
                                                                                                        this.state.listClient.length === 5 ?
                                                                                                                <View style={styles.containerButtonAll}>
                                                                                                                        <TouchableOpacity
                                                                                                                                onPress={() => {
                                                                                                                                        this.onOpenModalListSearch('client');
                                                                                                                                }}
                                                                                                                        >
                                                                                                                                <Text style={styles.textButtonAll}>tất cả</Text>
                                                                                                                        </TouchableOpacity>
                                                                                                                </View> : null
                                                                                                }
                                                                                        </View>
                                                                                </View>
                                                                }
                                                        </ScrollView>
                                        }
                                </View>
                                <Modal
                                        visible={this.state.visibleModalListSearch}
                                        animationType='slide'
                                        onRequestClose={() => {
                                                this.onCloseModalListSearch();
                                        }}
                                >
                                        <ModalListSearch
                                                onCloseModalListSearch={this.onCloseModalListSearch}
                                                type={this.state.type}
                                                contentSearch={this.state.textSearch}
                                                _onClickItemRestaurant={this._onClickItemRestaurant}
                                        />
                                </Modal>
                        </View>
                );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
                backgroundColor: background
        },
        containerLoading: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
        },
        containerCountItem: {
                alignItems: 'center'
        },
        containerHeader: {
                width: '100%',
                height: 60,
                flexDirection: 'row',
                backgroundColor: 'white',
                alignItems: 'center',
                paddingHorizontal: 20
        },
        textInput: {
                fontFamily: 'UVN-Baisau-Regular',
                flex: 1,
                backgroundColor: background,
                borderRadius: 30,
                marginLeft: 10,
                paddingHorizontal: 10
        },
        content: {
                flex: 1
        },
        textTitle: {
                fontFamily: 'UVN-Baisau-Regular',
                textTransform: 'capitalize',
                marginLeft: 20,
                marginTop: 10,
                fontSize: 12
        },
        containerList: {
                backgroundColor: 'white',
        },
        containerItem: {
                flexDirection: 'row',
                paddingHorizontal: 20,
                paddingVertical: 5
        },
        image: {
                width: 30,
                height: 30,
                borderRadius: 15
        },
        name: {
                fontFamily: 'UVN-Baisau-Bold',
                textTransform: 'capitalize',
        },
        address: {
                fontFamily: 'UVN-Baisau-Regular',
                fontSize: 12
        },
        containerName: {
                marginLeft: 10
        },
        textButtonAll: {
                fontFamily: 'UVN-Baisau-Bold',
                textTransform: 'capitalize',
                color: colorMain
        },
        containerButtonAll: {
                alignItems: 'center',
                marginVertical: 5
        }
});