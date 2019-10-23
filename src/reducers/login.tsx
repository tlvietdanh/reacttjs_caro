import * as type from '../constants/actionType';
import { Login, ActionType } from '../constants/globalInterface';

const initialState: Login = {
    id: '',
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    isLogin: false,
    token: '',
    isLoginFalse: false,
    isRegisterFalse: false
};

export default function loginReducer(state = initialState, action: ActionType) {
    switch (action.type) {
        case type.HANDLE_CHECK_LOGIN: {
            const user = action.payload;
            if (user) {
                return { ...state, id: user.id, username: user.username, firstname: user.firstname, lastname: user.lastname, isLogin: true };
            }
            return { ...state };
        }
        case type.HANDLE_CHANGE_INFO: {
            const { username, password } = action.payload;
            return { ...state, username, password };
        }
        case type.HANDLE_LOGIN: {
            const { user, token } = action.payload;
            if (user && token) {
                const { username, password } = state;
                let { isLogin } = state;
                if (username === user.username && password === user.password) {
                    localStorage.setItem(
                        'auth',
                        JSON.stringify({
                            token
                        })
                    );
                    isLogin = true;
                    return { ...state, isLogin, token };
                }
            }
            return { ...state, isLoginFalse: true };
        }
        case type.HANDLE_LOGOUT: {
            return initialState;
        }
        case type.HANDLE_CHANGE_REGISTER_INFO: {
            const { info } = action.payload;
            return { ...state, ...info };
        }
        case type.HANDLE_REGISTER: {
            // check register sucess
            const user = action.payload;
            if (typeof user === 'string') {
                return { ...state, isRegisterFalse: true };
            }
            return { ...state, id: user.id, username: user.username, firstname: user.firstname, lastname: user.lastname };
        }
        default:
            return state;
    }
}
