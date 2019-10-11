import { API } from './API';
import { put, takeLatest } from 'redux-saga/effects';
import { SIGNUP } from '../actions/action_types';
import { onSignupFailed, onSignupSucceeded } from '../actions';

function* signupUser (action) {
        try {
                const result = yield API.SignUp(action.data);
                if (result.error) {
                        yield put(onSignupFailed(result.message));
                } else {
                        yield put(onSignupSucceeded(result.message));
                }
        } catch (error) {
                yield put(onSignupFailed(error.message));
        }
}

export function* watchSignup () {
        yield takeLatest(SIGNUP, signupUser);
}