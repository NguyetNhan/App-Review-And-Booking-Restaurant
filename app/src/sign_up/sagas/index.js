import { API } from './API';
import { put, takeLatest } from 'redux-saga/effects';
import { SIGNUP } from '../actions/action_types';
import { onSignupResults } from '../actions';

function* SignupUser (action) {
        try {
                const result = yield API.SignUp(action.data);
                yield put(onSignupResults(result));
        } catch (error) {
                console.log('error: ', error.message);
        }
}

export function* WatchSignup () {
        yield takeLatest(SIGNUP, SignupUser);
}