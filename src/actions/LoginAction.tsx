/* eslint-disable @typescript-eslint/no-explicit-any */
import Axios from 'axios';
import * as type from '../constants/actionType';
import { RegisterInfo } from '../constants/globalInterface';
import { baseURL } from '../constants/constVariables';

const action = (type: string, payload: any) => ({ type, payload });

export const handleLoginRequest = (username: string, password: string) => {
    const data = { username, password };

    return (dispatch: any) => {
        return Axios.post(`${baseURL}/user/login`, data).then((res: any) => {
            dispatch(action(type.HANDLE_LOGIN, res.data));
        });
    };
};

export const handleLogin = (username: string, password: string) => ({
    type: type.HANDLE_LOGIN,
    payload: { username, password }
});

export const handleChangeInfo = (username: string, password: string) => ({
    type: type.HANDLE_CHANGE_INFO,
    payload: { username, password }
});

export const handleChangeRegisterInfo = (info: RegisterInfo) => ({
    type: type.HANDLE_CHANGE_REGISTER_INFO,
    payload: { info }
});

export const handleRegisterRequest = (info: RegisterInfo) => {
    return (dispatch: any) => {
        return Axios.post(`${baseURL}/user/register`, info).then((res: any) => {
            dispatch(action(type.HANDLE_REGISTER, res.data));
        });
    };
};

export const handleLogout = () => ({
    type: type.HANDLE_LOGOUT,
    payload: {}
});

export const handleCheckLoginRequest = () => {
    const auth = localStorage.getItem('auth');
    if (auth) {
        const AuthStr = 'Bearer '.concat(JSON.parse(auth).token);
        return (dispatch: any) => {
            return Axios.get(`${baseURL}/me`, { headers: { Authorization: AuthStr } }).then(response => {
                return dispatch(action(type.HANDLE_CHECK_LOGIN, response));
            });
        };
    }
    return action(type.HANDLE_CHECK_LOGIN, null);
};
