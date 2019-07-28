import { all } from 'redux-saga/effects';
import { WatchLogin } from '../login/sagas';
import { WatchSignup } from '../sign_up/sagas';

export default function* RootSaga () {
        yield all([
                WatchLogin(),
                WatchSignup()
        ]);
}