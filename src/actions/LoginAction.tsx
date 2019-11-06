/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable no-return-await */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Axios from 'axios';
import * as type from '../constants/actionType';
import { RegisterInfo } from '../constants/globalInterface';
import { baseURL } from '../constants/constVariables';

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

export const handleChangeInfo = (username: string, password: string, fullname: string, email: string) => ({
    type: type.HANDLE_CHANGE_INFO,
    payload: { username, password, fullname, email }
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

export const handleModifyUserInfo = (email: string, fullname: string, avatar: string, oldPass: string, newPass: string) => {
    let data;
    const auth = localStorage.getItem('auth');
    if (auth) {
        return async (dispatch: any) => {
            if (avatar !== '') {
                if (oldPass !== '' && newPass !== '') {
                    data = { email, fullname, avatar, oldPass, newPass };
                } else {
                    data = { email, fullname, avatar };
                }
                const files = new FormData();
                files.append('file', avatar);
                files.append('upload_preset', 'danhdanh');
                files.append('clound_name', 'dilzn2blz');
                files.append('api_key', '213964643219572');
                return Axios.post(`https://api.cloudinary.com/v1_1/dilzn2blz/image/upload`, files).then((res: any) => {
                    const { secure_url } = res.data;
                    data = { email, fullname, avatar: secure_url };
                    return Axios.post(`${baseURL}/me/edit`, data, { headers: { Authorization: `Bearer ${JSON.parse(auth).token}` } }).then(
                        (response: any) => {
                            dispatch(action(type.HANDLE_UPDATE_USER_INFO, response));
                        }
                    );
                });
            }
            if (oldPass !== '' && newPass !== '') {
                data = { email, fullname, oldPass, newPass };
            } else {
                data = { email, fullname };
            }
            return await Axios.post(`${baseURL}/me/edit`, data, { headers: { Authorization: `Bearer ${JSON.parse(auth).token}` } }).then(
                (data: any) => {
                    dispatch(action(type.HANDLE_UPDATE_USER_INFO, data));
                }
            );
        };
    }
    return (dispatch: any) => {
        dispatch(action(type.HANDLE_CHECK_LOGIN, null));
    };
};

export const handleIsFacebookClick = () => ({
    type: type.HANDLE_CHANGE_IS_FACEBOOK,
    payload: {}
});
