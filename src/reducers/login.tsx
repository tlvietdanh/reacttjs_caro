import * as type from '../constants/actionType';
import { Login, ActionType } from '../constants/globalInterface';
import * as constants from '../constants/constVariables';

const initialState: Login = {
    id: '',
    username: '',
    password: '',
    fullname: '',
    email: '',
    avatar: '',
    isLogin: false,
    token: '',
    isLoginFalse: false,
    isRegisterSuccess: false,
    loading: false,
    checkLogin: false,
    status: ''
};

export default function loginReducer(state = initialState, action: ActionType) {
    switch (action.type) {
        case type.HANLDE_LOADING_LOGIN_ON: {
            return { ...state, loading: true };
        }
        case type.HANLDE_LOADING_LOGIN_OFF: {
            return { ...state, loading: false };
        }
        case type.HANDLE_CHECK_LOGIN: {
            const user = action.payload;
            let { checkLogin } = state;
            if (user) {
                const { data } = user;

                if (!checkLogin && data) {
                    checkLogin = true;
                    return {
                        ...state,
                        id: data.id,
                        username: data.username,
                        fullname: data.fullname,
                        email: data.email,
                        avatar: data.avatar,
                        checkLogin: true,
                        status: '',
                        loading: false,
                        isLogin: true
                    };
                }
                checkLogin = false;
                return { ...state, checkLogin, loading: false };
            }
            return { ...state, checkLogin: false, loading: false, state: constants.CONNECT_FAIL };
        }
        case type.HANDLE_CHANGE_INFO: {
            const { username, password, fullname, email } = action.payload;
            return { ...state, username, password, fullname, email, status: '' };
        }
        case type.HANDLE_LOGIN: {
            const data = action.payload;
            if (data) {
                const { user, token } = data;
                if (user && token) {
                    let { isLogin } = state;
                    localStorage.setItem(
                        'auth',
                        JSON.stringify({
                            token
                        })
                    );
                    isLogin = true;
                    return {
                        ...state,
                        id: user.id,
                        username: user.username,
                        fullname: user.fullname,
                        email: user.email,
                        avatar: user.avatar,
                        loading: false,
                        isLogin,
                        token,
                        checkLogin: true,
                        status: ''
                    };
                }
                return { ...state, isLogin: false, status: constants.INVALID_USERNAME, loading: false };
            }
            return { ...state, isLogin: false, status: constants.CONNECT_FAIL };
        }
        case type.HANDLE_LOGOUT: {
            localStorage.setItem('auth', '');
            return initialState;
        }
        case type.HANDLE_CHANGE_REGISTER_INFO: {
            const { info } = action.payload;
            return { ...state, ...info };
        }
        case type.HANDLE_REGISTER: {
            // check register sucess
            const respond = action.payload;
            if (respond) {
                if (typeof respond === 'string') {
                    return { ...state, isRegisterSuccess: true, loading: false, status: constants.SAME_USERNAME };
                }
                const { user, token } = respond;
                let { isLogin } = state;
                localStorage.setItem(
                    'auth',
                    JSON.stringify({
                        token
                    })
                );
                isLogin = true;
                return {
                    ...state,
                    id: user.id,
                    username: user.username,
                    fullname: user.fullname,
                    email: user.email,
                    avatar: user.avatar,
                    loading: false,
                    isRegisterSuccess: true,
                    isLogin,
                    token,
                    status: ''
                };
            }
            return { ...state, status: constants.CONNECT_FAIL };
        }
        case type.HANDLE_UPDATE_USER_INFO: {
            const res = action.payload;
            if (res.data) {
                const { data } = res;
                if (typeof data === 'string') {
                    return { ...state, loading: false, status: data };
                }
                return {
                    ...state,
                    id: data.id,
                    username: data.username,
                    fullname: data.fullname,
                    email: data.email,
                    avatar: data.avatar,
                    loading: false,
                    status: ''
                };
            }
            return { ...state, status: constants.CONNECT_FAIL };
        }
        default:
            return state;
    }
}
