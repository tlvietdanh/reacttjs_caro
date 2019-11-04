/* eslint-disable no-return-await */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Axios from 'axios';
import * as type from '../constants/actionType';
import { RegisterInfo } from '../constants/globalInterface';
import { baseURL } from '../constants/constVariables';
import { async } from 'q';

const action = (type: string, payload: any) => ({ type, payload });

export const handleLoginRequest = (username: string, password: string) => {
    const data = { username, password };
    return async (dispatch: any) => {
        dispatch(action(type.HANLDE_LOADING_LOGIN_ON, null));
        return await Axios.post(`${baseURL}/user/login`, data).then((res: any) => {
            dispatch(action(type.HANLDE_LOADING_LOGIN_OFF, null));
            dispatch(action(type.HANDLE_LOGIN, res.data));
        });
    };
};

export const handleLogin = (username: string, password: string) => ({
    type: type.HANDLE_LOGIN,
    payload: { username, password }
});

export const handleChangeInfo = (username: string, password: string, fullname: string) => ({
    type: type.HANDLE_CHANGE_INFO,
    payload: { username, password, fullname }
});

export const handleChangeRegisterInfo = (info: RegisterInfo) => ({
    type: type.HANDLE_CHANGE_REGISTER_INFO,
    payload: { info }
});

export const handleRegisterRequest = (username: string, password: string, fullname: string, email: string, avatar: string) => {
    const data = { fullname, username, password, email, avatar };

    return (dispatch: any) => {
        dispatch(action(type.HANLDE_LOADING_LOGIN_ON, null));
        return Axios.post(`${baseURL}/user/register`, data).then((res: any) => {
            dispatch(action(type.HANLDE_LOADING_LOGIN_OFF, null));
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
        return async (dispatch: any) => {
            dispatch(action(type.HANLDE_LOADING_LOGIN_ON, null));
            return await Axios.get(`${baseURL}/me`, { headers: { Authorization: `Bearer ${JSON.parse(auth).token}` } })
                .then(response => {
                    return dispatch(action(type.HANDLE_CHECK_LOGIN, response));
                })
                .catch((err: any) => {
                    return dispatch(action(type.HANDLE_CHECK_LOGIN, err));
                });
        };
    }
    return (dispatch: any) => {
        dispatch(action(type.HANDLE_CHECK_LOGIN, null));
    };
};
