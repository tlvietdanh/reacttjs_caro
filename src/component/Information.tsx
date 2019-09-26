import React, { FormEvent } from 'react';
import OPlayer from '../assets/o.png';
import XPlayer from '../assets/x.png';
import ASC from '../assets/asc.png';
import DEC from '../assets/dec.png';
import Setting from './Setting';
import { History, MySquare } from './Global';

interface MyProps {
    whichPlayer: boolean;
    lastStep: MySquare[];
    timeLimit: number;
    undoMove: boolean;
    handleChangeSetting: Function;
    isRunningTime: boolean;
    resetTime: boolean;
    handleTimeOut: Function;
    handleResetTime: Function;
    handleRestart: Function;
    disable: boolean;
    steps: History[];
    handleListStepClick: Function;
    checkIndex: number;
    isPlayerClick: boolean;
    handleChangeAfterPlayerClick: Function;
    stepOrder: boolean;
    handleChangeHistoryOrder: Function;
}

interface MyState {
    seconds: number;
    minutes: number;
    hours: number;
    isInfo: boolean;
    isclear: boolean;
}

class Information extends React.Component<MyProps, MyState> {
    private interval: number;

    constructor(props: MyProps) {
        super(props);

        this.state = {
            seconds: 0,
            minutes: 0,
            hours: 0,
            isInfo: true,
            isclear: true
        };
        this.interval = 0;

        this.handleTabChange = this.handleTabChange.bind(this);
        this.handleChangeSetting = this.handleChangeSetting.bind(this);
        this.handleStartTime = this.handleStartTime.bind(this);
        this.countDown = this.countDown.bind(this);
        this.handleResetTime = this.handleResetTime.bind(this);
        this.handleStopTime = this.handleStopTime.bind(this);
        this.handleTimeOut = this.handleTimeOut.bind(this);
        this.handleChangeStep = this.handleChangeStep.bind(this);
        this.handleScrollToBottom = this.handleScrollToBottom.bind(this);
        this.handleChangeHistoryOrder = this.handleChangeHistoryOrder.bind(this);
    }

    componentDidMount(): void {
        this.handleStartTime();
    }

    componentDidUpdate(): void {
        const { isRunningTime, resetTime, isPlayerClick } = this.props;
        if (!isRunningTime) this.handleStopTime();
        if (resetTime) this.handleResetTime();
        if (isPlayerClick) this.handleScrollToBottom();
    }

    handleTimeOut(): void {
        const { handleTimeOut } = this.props;
        handleTimeOut();
    }

    countDown(): void {
        const { timeLimit } = this.props;
        const { isclear } = this.state;
        let { seconds, minutes, hours } = this.state;
        if (timeLimit !== 0) {
            if (hours * 60 + minutes + seconds / 60 >= timeLimit) {
                if (!isclear) clearInterval(this.interval);
                this.handleTimeOut();
                return;
            }
        }
        if (minutes === 59) {
            hours += 1;
            minutes = 0;
        } else if (seconds === 59) {
            minutes += 1;
            seconds = 0;
        } else {
            seconds += 1;
        }
        this.setState({ seconds, minutes, hours });
    }

    handleTabChange(): void {
        const { isInfo } = this.state;
        this.setState({ isInfo: !isInfo });
    }

    handleChangeSetting(timeLimit: number, undoMove: boolean): void {
        const { handleChangeSetting } = this.props;
        handleChangeSetting(timeLimit, undoMove);
    }

    handleResetTime(): void {
        const { handleResetTime } = this.props;
        clearInterval(this.interval);
        this.interval = window.setInterval(this.countDown, 1000);
        this.setState({ seconds: 0, minutes: 0, hours: 0 }, () => {
            handleResetTime();
        });
    }

    handleStartTime(): void {
        this.interval = window.setInterval(this.countDown, 1000);
    }

    handleStopTime(): void {
        clearInterval(this.interval);
    }

    handleChangeStep(e: FormEvent<HTMLButtonElement>): void {
        const { handleListStepClick } = this.props;
        e.currentTarget.scrollTop = e.currentTarget.scrollHeight;
        handleListStepClick(e.currentTarget.value, parseInt(e.currentTarget.value, 10));
    }

    handleScrollToBottom(): void {
        const { stepOrder, handleChangeAfterPlayerClick } = this.props;
        const scroll = document.getElementById('listStep');
        if (scroll !== null) {
            if (stepOrder) scroll.scrollTop = scroll.scrollHeight;
            else scroll.scrollTop = 0;
        }
        handleChangeAfterPlayerClick();
    }

    handleChangeHistoryOrder(): void {
        const { handleChangeHistoryOrder } = this.props;
        handleChangeHistoryOrder();
    }

    render(): JSX.Element {
        const { seconds, minutes, hours, isInfo } = this.state;
        const { steps, undoMove, checkIndex, disable, whichPlayer, stepOrder, timeLimit, handleRestart } = this.props;

        const mSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        const mMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const mHours = hours < 10 ? `0${hours}` : `${hours}`;

        const listStep = (
            <div className="list-group mList" id="listStep">
                {steps.map((el: History) => {
                    return (
                        <button
                            type="button"
                            disabled={!undoMove || disable}
                            key={el.index}
                            className={`list-group-item list-group-item-action ${checkIndex === el.index ? ' active' : ''}`}
                            onClick={this.handleChangeStep}
                            value={el.index}
                        >
                            {el.name}
                        </button>
                    );
                })}
            </div>
        );

        const Infor = (
            <div className="card-body">
                <div className="text-left">
                    <h5 className="mText"> {`Player's turn:`} </h5>
                </div>
                <div className="text-center">
                    <img alt="" className="img-fluid img-x" src={whichPlayer ? XPlayer : OPlayer} />
                </div>
                <div className="text-left">
                    <button type="button" className="btn btn-light mText" onClick={this.handleChangeHistoryOrder}>
                        <h5 className="mText d-inline"> History: </h5>
                        <img className="fa fa-life-ring fa-3x iconAsc" src={stepOrder ? DEC : ASC} alt="" />
                    </button>
                </div>
                <div className="text-center d-inline-block mt-1">{listStep}</div>
            </div>
        );

        return (
            <div className="container-fluid">
                <div className="row mb-1">
                    <div className="card time">
                        <div className="card-header name">Tic Tac Toe</div>
                        <div className="card-body">
                            <div className="text-left">
                                <h5 className="mText">Time Counter: </h5>
                            </div>
                        </div>
                        <div className="timeText">{`${mHours}:${mMinutes}:${mSeconds}`}</div>
                    </div>
                </div>
                <div className="row">
                    <div className="card text-center info">
                        <div className="card-header">
                            <ul className="nav nav-tabs card-header-tabs">
                                <li className="nav-item">
                                    <button
                                        type="button"
                                        className={`mText nav-link ${isInfo ? ' active' : ''}`}
                                        onClick={this.handleTabChange}
                                        style={{ outline: 'none' }}
                                    >
                                        Information
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button
                                        type="button"
                                        className={`mText nav-link ${isInfo ? '' : ' active'}`}
                                        onClick={this.handleTabChange}
                                        style={{ outline: 'none' }}
                                    >
                                        Game Setting
                                    </button>
                                </li>
                            </ul>
                        </div>
                        {isInfo ? (
                            Infor
                        ) : (
                            <Setting
                                timeLimit={timeLimit}
                                handleChangeSetting={this.handleChangeSetting}
                                undoMove={undoMove}
                                handleRestart={handleRestart}
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default Information;
