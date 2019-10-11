import { connect } from 'react-redux';
import Component from '../components/confirm';
import {
        onConfirmOrder,
        onResetPropsMessage,
        onResetPropsConfirm
} from '../actions';

const mapStateToProps = (state) => {
        const confirmReducers = state.DetailDealReducers.ConfirmReducers;
        if (confirmReducers !== null) {
                if (confirmReducers.confirmSucceeded !== undefined) {
                        return {
                                isLoading: false,
                                messageSucceeded: confirmReducers.confirmSucceeded.data.messages
                        };
                } else if (confirmReducers.confirmFailed !== undefined) {
                        return {
                                isLoading: false,
                                messageFailed: confirmReducers.confirmFailed.messages
                        };
                } else if (confirmReducers.ResetProps !== undefined) {
                        return confirmReducers.ResetProps;
                } else if (confirmReducers.resetPropsMessage !== undefined) {
                        return confirmReducers.resetPropsMessage;
                }
        } else {
                return {
                        isLoading: false,
                };
        }

};

const mapDispatchToProps = (dispatch) => {
        return {
                onConfirmOrder: (data) => {
                        dispatch(onConfirmOrder(data));
                },
                onResetPropsConfirm: () => {
                        dispatch(onResetPropsConfirm());
                },
                onResetPropsMessage: () => {
                        dispatch(onResetPropsMessage());
                },
        };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);