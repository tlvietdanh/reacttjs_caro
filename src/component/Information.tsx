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
    handleUndoMove: Function;
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
        this.handleUndoMove = this.handleUndoMove.bind(this);
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
        if (!this.props.isRunningTime) this.handleStopTime();
        if (this.props.resetTime) this.handleResetTime();
        if (this.props.isPlayerClick) this.handleScrollToBottom();
    }

    handleTimeOut(): void {
        this.props.handleTimeOut();
    }

    countDown(): void {
        let { seconds, minutes, hours } = this.state;
        if (this.props.timeLimit !== 0) {
            if (hours * 60 + minutes + seconds / 60 >= this.props.timeLimit) {
                if (!this.state.isclear) clearInterval(this.interval);
                this.handleTimeOut();
                return;
            }
        }
        if (minutes === 59) {
            hours++;
            minutes = 0;
        } else if (seconds === 59) {
            minutes++;
            seconds = 0;
        } else {
            seconds++;
        }
        this.setState({ seconds, minutes, hours });
    }

    handleTabChange(): void {
        this.setState({ isInfo: !this.state.isInfo });
    }

    handleChangeSetting(timeLimit: number, undoMove: boolean): void {
        this.props.handleChangeSetting(timeLimit, undoMove);
    }

    handleUndoMove(): void {
        this.props.handleUndoMove();
    }

    handleResetTime(): void {
        clearInterval(this.interval);
        this.interval = setInterval(this.countDown, 1000);
        this.setState({ seconds: 0, minutes: 0, hours: 0 }, () => {
            this.props.handleResetTime();
        });
    }

    handleStartTime(): void {
        this.interval = setInterval(this.countDown, 1000);
    }

    handleStopTime(): void {
        clearInterval(this.interval);
    }

    handleChangeStep(e: FormEvent<HTMLButtonElement>): void {
        e.currentTarget.scrollTop = e.currentTarget.scrollHeight;
        this.props.handleListStepClick(e.currentTarget.value, parseInt(e.currentTarget.value));
    }

    handleScrollToBottom(): void {
        const scroll = document.getElementById('listStep');
        if (scroll !== null) {
            this.props.stepOrder ? (scroll.scrollTop = scroll.scrollHeight) : (scroll.scrollTop = 0);
        }
        this.props.handleChangeAfterPlayerClick();
    }

    handleChangeHistoryOrder(): void {
        this.props.handleChangeHistoryOrder();
    }

    render(): JSX.Element {
        const { seconds, minutes, hours, isInfo } = this.state;

        const mSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        const mMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const mHours = hours < 10 ? `0${hours}` : `${hours}`;

        const listStep = (
            <div className="list-group mList" id="listStep">
                {this.props.steps.map((el: History) => {
                    return (
                        <button
                            disabled={!this.props.undoMove || this.props.disable}
                            key={el.index}
                            className={`list-group-item list-group-item-action ${this.props.checkIndex === el.index ? ' active' : ''}`}
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
                    <img alt="" className="img-fluid img-x" src={this.props.whichPlayer ? XPlayer : OPlayer} />
                </div>
                <div className="text-left">
                    <button className="btn btn-light mText" onClick={this.handleChangeHistoryOrder}>
                        <h5 className="mText d-inline"> History: </h5>
                        <img className="fa fa-life-ring fa-3x iconAsc" src={this.props.stepOrder ? DEC : ASC} alt=""></img>
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
                        <div className={'timeText'}>{`${mHours}:${mMinutes}:${mSeconds}`}</div>
                    </div>
                </div>
                <div className="row">
                    <div className="card text-center info">
                        <div className="card-header">
                            <ul className="nav nav-tabs card-header-tabs">
                                <li className="nav-item">
                                    <button
                                        className={`mText nav-link ${isInfo ? ' active' : ''}`}
                                        onClick={this.handleTabChange}
                                        style={{ outline: 'none' }}
                                    >
                                        Information
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button
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
                                timeLimit={this.props.timeLimit}
                                handleChangeSetting={this.handleChangeSetting}
                                undoMove={this.props.undoMove}
                                handleRestart={this.props.handleRestart}
                            ></Setting>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default Information;
