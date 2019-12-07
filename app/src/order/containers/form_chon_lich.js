import { connect } from 'react-redux';
import Component from '../components/form_chon_lich';
import { onResetPropsFormChonLich, onSetDateFromLich, onSetTimeFromLich } from '../actions';

const mapStateToProps = (state) => {
        const orderReducers = state.OrderReducers;
        if (orderReducers !== null) {
                if (orderReducers.status !== undefined) {
                        return {
                                changePage: orderReducers.status,
                        };
                } else if (orderReducers.resetPropsFormChonLich !== undefined) {
                        return orderReducers.resetPropsFormChonLich;
                } else if (orderReducers.setDate !== undefined) {
                        return {
                                day: orderReducers.setDate
                        };
                } else if (orderReducers.setTime !== undefined) {
                        return {
                                time: orderReducers.setTime
                        };
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
                onSetDateFromLich: (date) => {
                        dispatch(onSetDateFromLich(date));
                }, onSetTimeFromLich: (time) => {
                        dispatch(onSetTimeFromLich(time));
                }

        };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);

