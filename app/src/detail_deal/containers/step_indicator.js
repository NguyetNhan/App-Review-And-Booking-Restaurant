import { connect } from 'react-redux';
import Component from '../components/step_indicator';
import { onFetchDetailOrder } from '../actions';

const mapStateToProps = (state) => {
        const stepIndicator = state.DetailDealReducers.StepIndicator;
        if (stepIndicator !== null) {
                if (stepIndicator.FetchSucceeded !== undefined) {
                        return {
                                isLoading: false,
                                detailOrder: stepIndicator.FetchSucceeded.data
                        };
                } else if (stepIndicator.FetchFailed) {
                        return {
                                isLoading: false,
                                messages: stepIndicator.FetchFailed.messages
                        };
                }
        } else
                return {
                        isLoading: false
                };
};

const mapDispatchToProps = (dispatch) => {
        return {
                onFetchDetailOrder: (idOrder) => {
                        dispatch(onFetchDetailOrder(idOrder));
                }
        };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);