import { connect } from 'react-redux';
import Component from '../components/info_account';
import { onResetPropsFormInfoAccount } from '../actions';

const mapStateToProps = (state) => {
        const orderReducers = state.OrderReducers;
        if (orderReducers !== null) {
                if (orderReducers.status !== undefined) {
                        return {
                                changePage: orderReducers.status,
                        };
                } else if (orderReducers.resetPropsInfoOrder !== undefined) {
                        return orderReducers.resetPropsInfoOrder;
                } else {
                        return {
                        };
                }
        } else {
                return {
                };
        }
};
const mapDispatchToProps = (dispatch) => {
        return {
                onResetPropsFormInfoAccount: () => {
                        dispatch(onResetPropsFormInfoAccount());
                },
        };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);

