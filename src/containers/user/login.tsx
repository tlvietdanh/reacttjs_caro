/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { handleLoginRequest, handleChangeInfo, handleLogout, handleRegisterRequest, handleCheckLoginRequest } from '../../actions/LoginAction';
import { ReducerType } from '../../constants/globalInterface';
import Register from '../../components/user/SignUp';
import '../../assets/css/login.css';
import SignIn from '../../components/user/SignIn';

interface MyProps {
    fullname: string;
    username: string;
    password: string;
    email: string;
    isLogin: boolean;
    isLoginFalse: boolean;
    loading: boolean;
    checkLogin: boolean;
    isRegisterSuccess: boolean;
    status: string;
    handleLoginRequest: Function;
    handleChangeInfo: Function;
    handleLogout: Function;
    handleRegisterRequest: Function;
    history: any;
    handleCheckLoginRequest: Function;
}

interface MyState {
    goToRegister: boolean;
}

class Login extends React.Component<MyProps, MyState> {
    constructor(props: MyProps) {
        super(props);
        this.state = {
            goToRegister: false
        };
        this.handleLogin = this.handleLogin.bind(this);
        this.handleGoToRegister = this.handleGoToRegister.bind(this);
        this.handleChangeInfo = this.handleChangeInfo.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleChangeInfo(type: string, value: string) {
        const { username, password, fullname, handleChangeInfo } = this.props;
        if (type === 'username') {
            handleChangeInfo(value, password, fullname);
        } else if (type === 'password') {
            handleChangeInfo(username, value, fullname);
        } else {
            handleChangeInfo(username, password, value);
        }
    }

    handleRegister(username: string, password: string, fullname: string, email: string, avatar: string) {
        const { handleRegisterRequest } = this.props;
        if (username.length > 0 && password.length > 0 && password.length > 0 && email.length > 0) {
            handleRegisterRequest(username, password, fullname, email, avatar);
        }
    }

    handleLogin(username: string, password: string) {
        const { handleLoginRequest } = this.props;
        if (username.length > 0 && password.length > 0) {
            handleLoginRequest(username, password);
        }
    }

    handleGoToRegister() {
        const { handleChangeInfo, loading } = this.props;
        if (loading) return;
        const { goToRegister } = this.state;
        this.setState(
            {
                goToRegister: !goToRegister
            },
            () => {
                handleChangeInfo('', '', '');
            }
        );
    }

    render() {
        const { username, password, fullname, loading, history, isLogin, email, isRegisterSuccess, status } = this.props;
        const { goToRegister } = this.state;
        if (isLogin) {
            if (history) history.push('/');
        }
        return (
            <div className="Login">
                <img className="img" alt="" />
                <div className={goToRegister ? 'container right-panel-active' : 'container'}>
                    <Register
                        username={username}
                        password={password}
                        fullname={fullname}
                        email={email}
                        loading={loading}
                        isRegisterSuccess={isRegisterSuccess}
                        handleChangeInfo={this.handleChangeInfo}
                        handleRegister={this.handleRegister}
                        handleLogin={this.handleLogin}
                        status={status}
                    />
                    <SignIn
                        username={username}
                        password={password}
                        loading={loading}
                        handleChangeInfo={this.handleChangeInfo}
                        handleLogin={this.handleLogin}
                    />

                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1>Welcome, Friends!</h1>
                                <p>To keep connected with us please sign up with your personal info</p>
                                <button type="button" className="btn btn-outline-success text-white" onClick={this.handleGoToRegister}>
                                    Sign In
                                </button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1>Welcome back, Friend!</h1>
                                <p>Sign in your account to play the Game</p>
                                <button type="button" className="btn btn-outline-success text-white" onClick={this.handleGoToRegister}>
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: ReducerType) => {
    return {
        username: state.loginReducer.username,
        password: state.loginReducer.password,
        fullname: state.loginReducer.fullname,
        isLogin: state.loginReducer.isLogin,
        isLoginFalse: state.loginReducer.isLoginFalse,
        loading: state.loginReducer.loading,
        checkLogin: state.loginReducer.checkLogin,
        email: state.loginReducer.email,
        isRegisterSuccess: state.loginReducer.isRegisterSuccess,
        status: state.loginReducer.status
    };
};

const mapDispatchToProbs = {
    handleLoginRequest,
    handleChangeInfo,
    handleLogout,
    handleRegisterRequest,
    handleCheckLoginRequest
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProbs
    )(Login)
);
