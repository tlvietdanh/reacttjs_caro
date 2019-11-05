import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router';
import { handleCheckLoginRequest, handleLogout, handleModifyUserInfo } from '../actions/LoginAction';
import { handleChangeSelect } from '../actions/dashboardActions';
import { ReducerType } from '../constants/globalInterface';
import PlayGame from '../components/dashboard/PlayGame';
import UserInfo from '../components/dashboard/UserInfo';
import '../assets/css/dashboard.css';
import play from '../assets/play_icon.png';
import user from '../assets/icon_user.png';
import exit from '../assets/icon_exit.png';

interface MyProps {
    checkLogin: boolean;
    isPlayWithBots: boolean;

    fullname: string;
    username: string;
    password: string;
    email: string;
    avatar: string;
    status: string;

    handleCheckLoginRequest: Function;
    handleChangeSelect: Function;
    handleLogout: Function;
    handleModifyUserInfo: Function;
    history: any;
}

interface MyState {
    isOpen: boolean;
    isFinding: boolean;
    menu: boolean;
}

class Dashboard extends React.Component<MyProps, MyState> {
    constructor(props: MyProps) {
        super(props);
        this.state = {
            isOpen: false,
            isFinding: false,
            menu: true
        };
        this.handleLogout = this.handleLogout.bind(this);
        this.handleHoverOn = this.handleHoverOn.bind(this);
        this.handleHoverOff = this.handleHoverOff.bind(this);
        this.handleFindingMatch = this.handleFindingMatch.bind(this);
        this.handleChangeMenu = this.handleChangeMenu.bind(this);
        this.handleModifyUserInfo = this.handleModifyUserInfo.bind(this);
    }

    UNSAFE_componentWillMount() {
        const { handleCheckLoginRequest, checkLogin } = this.props;
        if (!checkLogin) handleCheckLoginRequest();
    }

    handleLogout() {
        const { handleLogout } = this.props;
        handleLogout();
    }

    handleHoverOn() {
        const { isOpen } = this.state;
        if (!isOpen) {
            this.setState({
                isOpen: true
            });
        }
    }

    handleHoverOff() {
        const { isOpen } = this.state;
        if (isOpen) {
            this.setState({
                isOpen: false
            });
        }
    }

    handleFindingMatch(gameMode: boolean, isPlayWithBots: boolean) {
        const { handleChangeSelect } = this.props;
        const { isFinding } = this.state;
        if (isFinding) {
            this.setState({
                isFinding: false
            });
        } else {
            this.setState(
                {
                    isFinding: true
                },
                () => {
                    if (isPlayWithBots) {
                        const { history } = this.props;
                        if (history) history.push('/game');
                    }
                    handleChangeSelect(isPlayWithBots, gameMode);
                }
            );
        }
    }

    handleChangeMenu(e: any) {
        if (e.currentTarget.name === 'play') {
            this.setState({
                menu: true
            });
        } else {
            this.setState({
                menu: false
            });
        }
    }

    handleModifyUserInfo(tempEmail: string, tempFullname: string, tempAvatar: string, tempOldPass: string, tempNewPass: string) {
        const { handleModifyUserInfo } = this.props;
        handleModifyUserInfo(tempEmail, tempFullname, tempAvatar, tempOldPass, tempNewPass);
    }

    render() {
        const { checkLogin, username, fullname, email, avatar, status } = this.props;
        const { isOpen, isFinding, menu } = this.state;
        if (!checkLogin) {
            return <Redirect to="/login" />;
        }
        return (
            <div className="container-fluid dashboard">
                <img className="img" alt="" />

                <div className="container context">
                    <div className="col-12  LeftNav">
                        <button
                            type="button"
                            name="play"
                            className={menu ? 'btn text-center selected-menu' : 'btn text-center'}
                            onClick={this.handleChangeMenu}
                        >
                            <img src={play} className="icon" alt="..." />
                        </button>
                        <button
                            type="button"
                            name="info"
                            className={!menu ? 'btn text-center selected-menu' : 'btn text-center'}
                            onClick={this.handleChangeMenu}
                        >
                            <img src={user} className="icon" alt="..." />
                        </button>
                        <button type="button" className="btn text-center " onClick={this.handleLogout}>
                            <img src={exit} className="icon" alt="..." />
                        </button>
                        <div className="vl" />
                    </div>
                    {menu ? (
                        <PlayGame handleFindingMatch={this.handleFindingMatch} isFinding={isFinding} />
                    ) : (
                        <UserInfo
                            username={username}
                            fullname={fullname}
                            email={email}
                            avatar={avatar}
                            handleModifyUserInfo={this.handleModifyUserInfo}
                            status={status}
                        />
                    )}

                    <div className={isOpen ? 'RightNav open' : 'RightNav'} onMouseEnter={this.handleHoverOn} onMouseLeave={this.handleHoverOff}>
                        <div className={isFinding ? 'opa isFind' : 'opa'} />
                        <div className="container-fluid">
                            <div className="mt-5 row ">
                                <img src={avatar} className="rounded avatar" alt="..." />
                                <p className="ml-3 mt-3 userText ">{username}</p>
                            </div>
                            <div className="ml-2 mt-5 text-left d-flex">
                                <span className=""> LV: 8</span>
                            </div>
                            <div className="mt-5 text-left">
                                <span className="ml-2"> Rank: Silver</span>
                            </div>
                            <hr className="lineBreak" />
                            <div className="rightFoot" hidden={!isFinding}>
                                <span className="text-success text-left">Waiting...</span>
                                <div className="mt-5 waiting">
                                    <div className="spinner-border text-success" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
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
        checkLogin: state.loginReducer.checkLogin,
        isPlayWithBots: state.dashboard.isPlayWithBots,
        username: state.loginReducer.username,
        password: state.loginReducer.password,
        fullname: state.loginReducer.fullname,
        email: state.loginReducer.email,
        avatar: state.loginReducer.avatar,
        status: state.loginReducer.status
    };
};

const mapDispatchToProps = {
    handleCheckLoginRequest,
    handleChangeSelect,
    handleLogout,
    handleModifyUserInfo,
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Dashboard)
);
