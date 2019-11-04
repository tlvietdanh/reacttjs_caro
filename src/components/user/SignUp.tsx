/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

interface MyProps {
    username: string;
    fullname: string;
    password: string;
    email: string;
    loading: boolean;
    isRegisterSuccess: boolean;
    status: string;
    // isLogin: boolean;
    // isRegisterFalse: boolean;

    handleChangeInfo: Function;
    // handleRegisterRequest: Function;
    // handleLoginRequest: Function;
    handleRegister: Function;
    handleLogin: Function;
}

interface MyState {
    isFacebook: boolean;
}

class Register extends React.Component<MyProps, MyState> {
    constructor(props: MyProps) {
        super(props);
        this.state = {
            isFacebook: false
        };

        this.handleRegister = this.handleRegister.bind(this);
        this.handleChangeInfo = this.handleChangeInfo.bind(this);
        this.handleLoginByFacebook = this.handleLoginByFacebook.bind(this);
        this.handleLoginByGoogle = this.handleLoginByGoogle.bind(this);

        this.handleFacebookBtnClick = this.handleFacebookBtnClick.bind(this);
    }

    componentWillMount() {
        const { handleLogin, isRegisterSuccess, username, password } = this.props;
        if (isRegisterSuccess) {
            handleLogin(username, password);
        }
    }

    handleRegister(e: React.FormEvent<HTMLButtonElement>) {
        e.preventDefault();
        const { username, password, fullname, email, handleRegister } = this.props;
        handleRegister(username, password, fullname, email, '');
    }

    handleChangeInfo(e: React.FormEvent<HTMLInputElement>) {
        const { handleChangeInfo } = this.props;
        handleChangeInfo(e.currentTarget.name, e.currentTarget.value);
    }

    handleLoginByFacebook(response: any) {
        this.setState({
            isFacebook: false
        });
        if (!response.status) {
            const { handleRegister } = this.props;
            handleRegister(response.email, response.id, response.name, response.email, response.picture.data.url);
        }
    }

    handleLoginByGoogle(response: any) {
        const { profileObj } = response;
        if (profileObj) {
            const { handleRegister } = this.props;
            handleRegister(profileObj.email, profileObj.googleId, profileObj.name, profileObj.email, profileObj.imageUrl);
        }
    }

    handleFacebookBtnClick() {
        this.setState({
            isFacebook: true
        });
    }

    render() {
        const { username, password, fullname, loading, email, status } = this.props;
        const { isFacebook } = this.state;
        const facebook = (
            <FacebookLogin
                appId="572752733493843" // APP ID NOT CREATED YET
                fields="name,email,picture"
                callback={this.handleLoginByFacebook}
                cssClass="social-button d-none"
                autoLoad
            />
        );
        return (
            <div className="form-container sign-up-container">
                <form action="#">
                    <h1>Sign Up</h1>
                    <div className="social-container">
                        <button type="button" className="btn" onClick={this.handleFacebookBtnClick}>
                            <i className="fab fa-facebook-f" />
                        </button>
                        {isFacebook && facebook}
                        <GoogleLogin
                            clientId="264218692025-aqmc5agm1fmun0d793hl39ctugaa8jgu.apps.googleusercontent.com"
                            render={renderProps => (
                                <button type="button" className="btn" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                    <i className="fab fa-google-plus-g" />
                                </button>
                            )}
                            onSuccess={this.handleLoginByGoogle}
                            onFailure={this.handleLoginByGoogle}
                        />
                    </div>
                    <span>or create your own account for registration</span>
                    <input
                        type="text"
                        name="fullname"
                        placeholder="Full Name"
                        className="form-control"
                        value={fullname}
                        onChange={this.handleChangeInfo}
                    />
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        className="form-control"
                        value={username}
                        onChange={this.handleChangeInfo}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        className="form-control"
                        value={email}
                        onChange={this.handleChangeInfo}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="form-control"
                        value={password}
                        onChange={this.handleChangeInfo}
                    />
                    <button type="button" className="btn btn-success" onClick={this.handleRegister}>
                        <span className={loading ? 'spinner-border spinner-border-sm mr-2' : 'd-none'} role="status" aria-hidden="true" />
                        Sign Up
                    </button>
                    <div className={status === '' ? 'd-none' : 'invalid-feedback d-block small'}> {status}</div>
                </form>
            </div>
        );
    }
}

export default Register;
