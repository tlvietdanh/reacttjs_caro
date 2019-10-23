/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Container } from 'react-bootstrap';
import { Redirect } from 'react-router';
import { handleLoginRequest, handleChangeRegisterInfo, handleRegisterRequest } from '../../actions/LoginAction';
import { ReducerType, RegisterInfo } from '../../constants/globalInterface';

interface MyProps {
    username: string;
    firstname: string;
    lastname: string;
    password: string;
    isLogin: boolean;
    isRegisterFalse: boolean;

    handleChangeRegisterInfo: Function;
    handleRegisterRequest: Function;
    handleLoginRequest: Function;
}

interface MyState {
    confPassword: string;
    goToLogin: boolean;
}

class Register extends React.Component<MyProps, MyState> {
    constructor(props: MyProps) {
        super(props);
        this.state = {
            confPassword: '',
            goToLogin: false
        };
        this.handleRegister = this.handleRegister.bind(this);
        this.handleChangeInfo = this.handleChangeInfo.bind(this);
        this.handleChangeConfPass = this.handleChangeConfPass.bind(this);
        this.handleGoToLogin = this.handleGoToLogin.bind(this);
    }

    handleRegister(e: any) {
        e.preventDefault();
        const { username, password, firstname, lastname, handleRegisterRequest, isRegisterFalse } = this.props;
        const { confPassword } = this.state;
        if (username.length > 0 && password.length > 0 && firstname.length > 0 && lastname.length > 0 && password === confPassword) {
            const info: RegisterInfo = {
                username,
                firstname,
                lastname,
                password
            };
            handleRegisterRequest(info);
            if (!isRegisterFalse) {
                this.setState({
                    goToLogin: true
                });
            }
        }
    }

    handleChangeInfo(e: any) {
        const { username, password, firstname, lastname, handleChangeRegisterInfo } = this.props;
        const info: RegisterInfo = {
            username,
            firstname,
            lastname,
            password
        };
        if (e.currentTarget.name === 'username') {
            handleChangeRegisterInfo({ ...info, username: e.currentTarget.value });
        } else if (e.currentTarget.name === 'password') {
            handleChangeRegisterInfo({ ...info, password: e.currentTarget.value });
        } else if (e.currentTarget.name === 'firstname') {
            handleChangeRegisterInfo({ ...info, firstname: e.currentTarget.value });
        } else if (e.currentTarget.name === 'lastname') {
            handleChangeRegisterInfo({ ...info, lastname: e.currentTarget.value });
        }
    }

    handleChangeConfPass(e: any) {
        this.setState({
            confPassword: e.currentTarget.value
        });
    }

    handleGoToLogin() {
        this.setState({
            goToLogin: true
        });
    }

    render() {
        const { username, password, isLogin, firstname, lastname } = this.props;
        const { confPassword, goToLogin } = this.state;
        if (isLogin) {
            return <Redirect to="/" />;
        }
        if (goToLogin) {
            return <Redirect to="/login" />;
        }
        return (
            <div className="App">
                <img className="img" alt="" />
                <Container className="Login">
                    <h1>Register Tic Tac Toe Account</h1>
                    <br />
                    <Form className="login-input">
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                className="login-input"
                                type="username"
                                placeholder="Username"
                                onChange={this.handleChangeInfo}
                                value={username}
                                name="username"
                                isInvalid={username.length === 0}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>First Name:</Form.Label>
                            <Form.Control
                                className="login-input"
                                type="text"
                                placeholder="Your first name"
                                onChange={this.handleChangeInfo}
                                value={firstname}
                                name="firstname"
                                isInvalid={firstname.length === 0}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Last Name:</Form.Label>
                            <Form.Control
                                className="login-input"
                                type="text"
                                placeholder="Your last name"
                                onChange={this.handleChangeInfo}
                                value={lastname}
                                name="lastname"
                                isInvalid={lastname.length === 0}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                onChange={this.handleChangeInfo}
                                value={password}
                                name="password"
                                isInvalid={password.length === 0}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm your password"
                                onChange={this.handleChangeConfPass}
                                value={confPassword}
                                name="confPassword"
                                isInvalid={confPassword !== password}
                            />
                        </Form.Group>
                    </Form>
                    <Button className="login-button" variant="outline-success" onClick={this.handleRegister}>
                        Login
                    </Button>
                    <Button className="home-button" variant="outline-danger" onClick={this.handleGoToLogin}>
                        Login
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
        firstname: state.loginReducer.firstname,
        lastname: state.loginReducer.lastname,
        isRegisterFalse: state.loginReducer.isRegisterFalse
    };
};

const mapDispatchToProbs = {
    handleRegisterRequest,
    handleChangeRegisterInfo,
    handleLoginRequest
};

export default connect(
    mapStateToProps,
    mapDispatchToProbs
)(Register);
