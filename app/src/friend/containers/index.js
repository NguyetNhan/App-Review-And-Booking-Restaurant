import { connect } from 'react-redux';
import Component from '../components/main';
import {
        onUpdateFriendList,
        onFetchFriendList,
        onResetProps,
        onResetPropsMessage
} from '../actions';
const mapStateToProps = (state) => {
        const friendReducers = state.FriendReducers;
        if (friendReducers !== null) {
                if (friendReducers.updateFriendSucceeded !== undefined) {
                        return {
                                friendList: friendReducers.updateFriendSucceeded.data,
                                isLoading: false
                        };

                } else if (friendReducers.updateFriendFailed !== undefined) {
                        return {
                                message: friendReducers.updateFriendFailed.message,
                                isLoading: false
                        };
                } else if (friendReducers.fetchFriendListSucceeded !== undefined) {
                        return {
                                friendList: friendReducers.fetchFriendListSucceeded.data,
                                isLoading: false
                        };

                } else if (friendReducers.fetchFriendListFailed !== undefined) {
                        return {
                                message: friendReducers.fetchFriendListFailed.message,
                                isLoading: false
                        };
                } else if (friendReducers.resetProps !== undefined) {
                        return friendReducers.resetProps;
                } else if (friendReducers.resetPropsMessage !== undefined) {
                        return friendReducers.resetPropsMessage;
                }
        } else
                return {

                };
};

const mapDispatchToProps = (dispatch) => {
        return {
                onUpdateFriendList: (idAccount, phoneList) => {
                        dispatch(onUpdateFriendList(idAccount, phoneList));
                },
                onFetchFriendList: (idAccount) => {
                        dispatch(onFetchFriendList(idAccount));
                },
                onResetProps: () => {
                        dispatch(onResetProps());
                },
                onResetPropsMessage: () => {
                        dispatch(onResetPropsMessage());
                }
        };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);