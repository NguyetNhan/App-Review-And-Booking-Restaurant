import { connect } from 'react-redux';
import { onConfirmOrderForAdminRestaurant, onResetPropsScanQr } from '../actions';
import Component from '../components';

const mapStateToProps = (state) => {
        const scanQr = state.ScanQrOrderReducers;
        if (scanQr !== null) {
                if (scanQr.confirmSucceeded !== undefined) {
                        return {
                                order: scanQr.confirmSucceeded.data.data,
                                isLoading: false,
                        };
                } else if (scanQr.confirmFailed !== undefined) {
                        return {
                                messages: scanQr.confirmFailed.messages,
                                isLoading: false
                        };
                } else if (scanQr.ResetProps !== undefined) {
                        return scanQr.ResetProps;
                }
        } else
                return {
                        isLoading: false
                };
};

const mapDispatchToProp = (dispatch) => {
        return {
                onConfirmOrderForAdminRestaurant: (data) => {
                        dispatch(onConfirmOrderForAdminRestaurant(data));
                },
                onResetPropsScanQr: () => {
                        dispatch(onResetPropsScanQr());
                }
        };
};

export default connect(mapStateToProps, mapDispatchToProp)(Component);