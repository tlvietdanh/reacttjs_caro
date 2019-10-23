/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Container } from 'react-bootstrap';
import { Redirect } from 'react-router';
import { handleLoginRequest, handleChangeInfo, handleLogout } from '../../actions/LoginAction';
import { ReducerType } from '../../constants/globalInterface';

interface MyProps {
    username: string;
    password: string;
    isLogin: boolean;
    isLoginFalse: boolean;

    handleLoginRequest: Function;
    handleChangeInfo: Function;
    handleLogout: Function;
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
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleGoToRegister = this.handleGoToRegister.bind(this);
    }

    componentWillUnmount() {
        const { handleLogout, isLogin } = this.props;
        if (!isLogin) handleLogout();
    }

    handleLogin(e: any) {
        e.preventDefault();
        const { username, password, handleLoginRequest } = this.props;
        if (username.length > 0 && password.length > 0) {
            handleLoginRequest(username, password);
        }
    }

    handleChangeUsername(e: any) {
        const { username, password, handleChangeInfo } = this.props;
        if (e.currentTarget.name === 'username') {
            handleChangeInfo(e.currentTarget.value, password);
        } else if (e.currentTarget.name === 'password') {
            handleChangeInfo(username, e.currentTarget.value);
        }
    }

    handleGoToRegister() {
        this.setState({
            goToRegister: true
        });
    }

    render() {
        const { username, password, isLogin, isLoginFalse } = this.props;
        const { goToRegister } = this.state;
        if (isLogin) {
            return <Redirect to="/" />;
        }
        if (goToRegister) {
            return <Redirect to="/register" />;
        }
        return (
            <div className="App">
                <img className="img" alt="" />
                <Container className="Login">
                    <h1>Tic Tac Toe Account Login</h1>
                    <br />
                    <Form className="login-input">
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                className="login-input"
                                type="username"
                                placeholder="Username"
                                onChange={this.handleChangeUsername}
                                value={username}
                                name="username"
                                isInvalid={username.length === 0}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                onChange={this.handleChangeUsername}
                                value={password}
                                name="password"
                                isInvalid={password.length === 0}
                            />
                        </Form.Group>
                        <Form.Label className="login-text" hidden={!isLoginFalse}>
                            Your username or password are incorrect
                        </Form.Label>
                    </Form>
                    <Button className="login-button" variant="outline-success" onClick={this.handleLogin}>
                        Login
                    </Button>
                    <Button className="home-button" variant="outline-danger" onClick={this.handleGoToRegister}>
                        Register
                    </Button>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state: ReducerType) => {
    return {
        username: state.loginReducer.username,
        password: state.loginReducer.password,
        isLogin: state.loginReducer.isLogin,
        isLoginFalse: state.loginReducer.isLoginFalse
    };
};

const mapDispatchToProbs = {
    handleLoginRequest,
    handleChangeInfo,
    handleLogout
};

export default connect(
    mapStateToProps,
    mapDispatchToProbs
)(Login);
