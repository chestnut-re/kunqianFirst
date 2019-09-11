import LoginState from './LoginState';
import {
    LOGIN_ACTION,
    LOGIN_ACTION_OUT
} from './LoginAction';

function LoginReducer(state = LoginState, action) {
    switch (action.type) {
        case LOGIN_ACTION:

            break;
        case LOGIN_ACTION_OUT:

            break;
        default:
            return state;
    }
}

export default LoginReducer;