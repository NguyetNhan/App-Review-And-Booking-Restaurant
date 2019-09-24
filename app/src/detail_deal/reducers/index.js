import { combineReducers } from 'redux';
import StepIndicator from './step_indicator';
import ConfirmReducers from './confirm';


const DetailDealReducers = combineReducers({
        StepIndicator,
        ConfirmReducers
});

export default DetailDealReducers;