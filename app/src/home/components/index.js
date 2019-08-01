import React, { Component } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Realm from 'realm';
export default class Home extends Component {
        static navigationOptions = ({ navigation }) => {
                return {
                        tabBarLabel: 'Trang chủ',
                        tabBarIcon: ({ tintColor }) => (<Icon name='home' size={25} color={tintColor} />)
                }
        }

        constructor (props) {
                super(props);
                this.state = { realm: null };
        }

        componentDidMount () {
                Realm.open({
                        schema: [{ name: 'Dog', properties: { name: 'string' } }]
                }).then(realm => {
                        realm.write(() => {
                                realm.create('Dog', { name: 'Rex' });
                        });
                        this.setState({ realm });
                });
        }

        render () {
                const info = this.state.realm
                        ? 'Number of dogs in this Realm: ' + this.state.realm.objects('Dog').length
                        : 'Loading...';
                return (
                        <SafeAreaView style={{ flex: 1, }}>
                                <View>
                                        <Text>{info}</Text>
                                        <Text onPress={() => {
                                                this.props.navigation.navigate('Login');
                                        }}>Login</Text>
                                        <TouchableOpacity onPress={this.props.navigation.openDrawer}>
                                                <Text>Open Drawer</Text>
                                        </TouchableOpacity>
                                </View>
                        </SafeAreaView>

                );
        }
}