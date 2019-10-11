import { connect } from 'react-redux';
import Component from '../components/form_chon_lich';
import { onResetPropsFormChonLich } from '../actions';

const mapStateToProps = (state) => {
        const orderReducers = state.OrderReducers;
        if (orderReducers !== null) {
                if (orderReducers.status !== undefined) {
                        return {
                                changePage: orderReducers.status,
                        };
                } else if (orderReducers.resetPropsFormChonLich !== undefined) {
                        return orderReducers.resetPropsFormChonLich;
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
                onResetPropsFormChonLich: () => {
                        dispatch(onResetPropsFormChonLich());
                },
        };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);

