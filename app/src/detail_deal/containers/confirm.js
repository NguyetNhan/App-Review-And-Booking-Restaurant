import { connect } from 'react-redux';
import Component from '../components/confirm';
import { onConfirmOrder, onResetPropsConfirm } from '../actions';

const mapStateToProps = (state) => {
        const confirmReducers = state.DetailDealReducers.ConfirmReducers;
        if (confirmReducers !== null) {
                if (confirmReducers.confirmSucceeded !== undefined) {
                        return {
                                isLoading: false,
                                messageConfirmSucceeded: confirmReducers.confirmSucceeded.data.messages
                        };
                } else if (confirmReducers.confirmFailed !== undefined) {
                        return {
                                isLoading: false,
                                message: confirmReducers.confirmFailed.messages
                        };
                } else if (confirmReducers.ResetProps !== undefined) {
                        return confirmReducers.ResetProps;
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
                }
        };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);