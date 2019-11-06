import React from 'react';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

interface MyProps {
    username: string;
    password: string;
    loading: boolean;
    status: string;
    isFacebook: boolean;
    handleLogin: Function;
    handleChangeInfo: Function;
    handleIsFacebookClick: Function;
}

interface MyState {
    isFacebookState: boolean;
}

class SignIn extends React.Component<MyProps, MyState> {
    constructor(props: MyProps) {
        super(props);

        this.state = {
            isFacebookState: false
        };
        this.handleChangeInfo = this.handleChangeInfo.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLoginByFacebook = this.handleLoginByFacebook.bind(this);
        this.handleLoginByGoogle = this.handleLoginByGoogle.bind(this);
        this.handleFacebookBtnClick = this.handleFacebookBtnClick.bind(this);
    }

    handleChangeInfo(e: React.FormEvent<HTMLInputElement>) {
        const { handleChangeInfo } = this.props;
        handleChangeInfo(e.currentTarget.name, e.currentTarget.value);
    }

    handleLogin() {
        const { handleLogin, username, password } = this.props;
        handleLogin(username, password);
    }

    handleFacebookBtnClick() {
        this.setState({
            isFacebookState: true
        });
    }

    handleLoginByFacebook(response: any) {
        const { handleLogin } = this.props;
        if (!response.status) {
            handleLogin(response.email, response.id);
        }
    }

    handleLoginByGoogle(response: any) {
        const { handleLogin } = this.props;
        const { profileObj } = response;
        if (profileObj) {
            handleLogin(profileObj.email, profileObj.googleId);
        }
    }

    render() {
        const { username, password, loading, status } = this.props;
        const { isFacebookState } = this.state;
        const facebook = (
            <FacebookLogin
                appId="572752733493843" // APP ID NOT CREATED YET
                fields="name,email,picture"
                callback={this.handleLoginByFacebook}
                cssClass="social-button"
                icon="fa-facebook-f"
                textButton=""
                autoLoad
            />
        );
        const myButton = (
            <button type="button" className="btn" onClick={this.handleFacebookBtnClick}>
                <i className="fab fa-facebook-f" />
            </button>
        );
        return (
            <div className="form-container sign-in-container">
                <form>
                    <h1>Sign in</h1>
                    <div className="social-container">
                        {isFacebookState ? facebook : myButton}
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
                    <span>or use your account</span>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        className="form-control"
                        value={username}
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
                    <a href="/">Forgot your password?</a>
                    <button type="button" className="btn btn-success" onClick={this.handleLogin}>
                        <span className={loading ? 'spinner-border spinner-border-sm mr-2' : 'd-none'} role="status" aria-hidden="true" />
                        Sign In
                    </button>
                    <div className={status === '' ? 'd-none' : 'invalid-feedback d-block small'}> {status}</div>
                </form>
            </div>
        );
    }
}

export default SignIn;
