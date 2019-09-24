import { connect } from 'react-redux';
import Component from '../components/info_account';

const mapStateToProps = (state) => {
        const onChangePage = state.OrderReducers.status;
        if (onChangePage !== undefined) {
                return {
                        changePage: onChangePage,
                };
        }
        else {
                return {
                };
        }
};

const mapDispatchToProps = (dispatch) => {
        return {
        };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);

