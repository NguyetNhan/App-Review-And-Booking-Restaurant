import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { urlServer, colorMain, backgroundStatusBar } from '../../config';
import { AccountModel } from '../../models/account';
import ListConversation from '../containers/list_conversation';

export default class Chat extends Component {
        static navigationOptions = ({ navigation }) => {
                return {
                        tabBarLabel: 'Nhắn Tin',
                        tabBarIcon: ({ tintColor }) => (<Icon name='message-circle' size={25} color={tintColor} />)
                }
        }

        constructor (props) {
                super(props);
                this.state = {
                }
                this.onChangeScreenDetailChat = this.onChangeScreenDetailChat.bind(this);
        }

        onChangeScreenDetailChat (idConversation, idAccountReceiver) {
                this.props.navigation.navigate('DetailChat', {
                        idConversation: idConversation,
                        idAccountReceiver: idAccountReceiver
                })
        }

        render () {
                return (
                        <View style={styles.container}>
                                <StatusBar
                                        backgroundColor={backgroundStatusBar}
                                        barStyle='light-content'
                                        translucent={false}
                                />
                                <View
                                        onTouchStart={() => this.props.navigation.navigate('Search')}
                                        style={styles.containerSearch}>
                                        <Icon name='search' size={25} color='white' />
                                        <Text style={styles.textTitleSearch}>tìm kiếm nhà hàng, bạn bè...</Text>
                                </View>
                                <View style={{
                                        flex: 1
                                }}>
                                        <ListConversation
                                                onChangeScreenDetailChat={this.onChangeScreenDetailChat}
                                        />
                                </View>

                        </View>
                );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
                alignItems: 'center'
        },
        containerSearch: {
                flexDirection: 'row',
                height: 55,
                backgroundColor: colorMain,
                paddingHorizontal: 20,
                alignItems: 'center',
                justifyContent: 'center'
        },
        textTitleSearch: {
                fontFamily: 'UVN-Baisau-Regular',
                textTransform: 'capitalize',
                color: 'white',
                flex: 1,
                marginLeft: 10,
                fontSize: 16
        },
})