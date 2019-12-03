import { connect } from 'react-redux';
import Component from '../components/header';
import {
        onAddFriend,
        onRemoveFriend,
        onResetPropsHeader,
        onResetPropsMessageHeader,
        onCheckIsFriend,
        onChangeStatusFriend
} from '../actions';

const mapStateToProps = (state) => {
        const headerReducers = state.PersonReducers.HeaderReducers;
        if (headerReducers !== null) {
                if (headerReducers.checkIsFriendSucceeded !== undefined) {
                        return {
                                isFriended: headerReducers.checkIsFriendSucceeded.data
                        };
                } else if (headerReducers.checkIsFriendFailed !== undefined) {
                        return {
                                message: headerReducers.checkIsFriendFailed.message
                        };
                } else if (headerReducers.addFriendSucceeded !== undefined) {
                        return {
                                isFriended: headerReducers.addFriendSucceeded.data.status
                        };
                } else if (headerReducers.resetProps !== undefined) {
                        return headerReducers.resetProps;
                } else if (headerReducers.resetPropsMessage !== undefined) {
                        return headerReducers.resetPropsMessage;
                } else if (headerReducers.changeStatusFriend !== undefined) {
                        return { isFriended: headerReducers.changeStatusFriend };
                }
        } else
                return {

                };
};

const mapDispatchToProps = (dispatch) => {
        return {
                onCheckIsFriend: (idAccountClient, idAccountFriend) => {
                        dispatch(onCheckIsFriend(idAccountClient, idAccountFriend));
                },
                onAddFriend: (idAccountClient, idAccountFriend) => {
                        dispatch(onAddFriend(idAccountClient, idAccountFriend));
                },
                onRemoveFriend: (idAccountClient, idAccountFriend) => {
                        dispatch(onRemoveFriend(idAccountClient, idAccountFriend));
                },
                onResetPropsHeader: () => {
                        dispatch(onResetPropsHeader());
                },
                onResetPropsMessageHeader: () => {
                        dispatch(onResetPropsMessageHeader());
                },
                onChangeStatusFriend: (status) => {
                        dispatch(onChangeStatusFriend(status));
                }
        };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);