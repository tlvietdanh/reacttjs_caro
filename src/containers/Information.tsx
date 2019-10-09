import React, { FormEvent } from 'react';
import { connect } from 'react-redux';
import OPlayer from '../assets/o.png';
import XPlayer from '../assets/x.png';
import ASC from '../assets/asc.png';
import DEC from '../assets/dec.png';
import Setting from './Setting';
import * as ConstVar from '../constants/constVariables';
import { History, InfoState, ReducerType } from '../constants/globalInterface';
import {
    countDown,
    handleTapChange,
    handleChangesetting,
    handleResetTime,
    handleListStepClick,
    handleChangeHistoryOrder,
    handleShowModal,
    handleChangeAfterPlayerClick
} from '../actions/index';

interface MyProps {
    isRunningTime: boolean;
    stepOrder: boolean;
    isPlayerClick: boolean;
    checkIndex: number;
    steps: History[];
    disable: boolean;
    whichPlayer: boolean;
    infoState: InfoState;

    countDown: Function;
    handleTapChange: Function;
    handleChangesetting: Function;
    handleResetTime: Function;
    handleListStepClick: Function;
    handleChangeHistoryOrder: Function;
    handleShowModal: Function;
    handleChangeAfterPlayerClick: Function;
}

class Information extends React.Component<MyProps> {
    private interval: number;

    private counter: number;

    constructor(props: MyProps) {
        super(props);

        this.interval = 0;
        this.counter = 0;
        this.handleTabChange = this.handleTabChange.bind(this);
        this.handleChangeSetting = this.handleChangeSetting.bind(this);
        this.handleStartTime = this.handleStartTime.bind(this);
        this.countDown = this.countDown.bind(this);
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
        const { isRunningTime, isPlayerClick } = this.props;
        if (!isRunningTime) this.handleStopTime();

        if (isRunningTime) {
            if (this.counter % 3 === 0) this.handleStartTime();
        }
        if (isPlayerClick) this.handleScrollToBottom();
    }

    handleTimeOut(): void {
        clearInterval(this.interval);
        const { handleShowModal } = this.props;
        handleShowModal(ConstVar.TIE, '');
    }

    countDown(): void {
        const { infoState } = this.props;
        const { timeLimit, seconds, hours, minutes, isclear } = infoState;
        if (timeLimit !== 0) {
            if (hours * 60 + minutes + seconds / 60 >= timeLimit) {
                if (!isclear) clearInterval(this.interval);
                this.handleTimeOut();
                return;
            }
        }
        const { countDown } = this.props;
        countDown();
    }

    handleTabChange(): void {
        const { handleTapChange } = this.props;
        handleTapChange();
    }

    handleChangeSetting(timeLimit: number, undoMove: boolean): void {
        const { handleChangesetting } = this.props;
        handleChangesetting(timeLimit, undoMove);
    }

    handleStartTime(): void {
        this.interval = window.setInterval(this.countDown, 1000);
        this.counter += 1;
    }

    handleStopTime(): void {
        clearInterval(this.interval);
        this.counter += 1;
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
        const { infoState, steps, checkIndex, disable, whichPlayer, stepOrder } = this.props;

        const { seconds, minutes, hours, isInfo, undoMove } = infoState;

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
                                        disabled={isInfo}
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
                                        disabled={!isInfo}
                                    >
                                        Game Setting
                                    </button>
                                </li>
                            </ul>
                        </div>
                        {isInfo ? Infor : <Setting />}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: ReducerType) => {
    const { steps, checkIndex, disable, whichPlayer, stepOrder, isPlayerClick, isRunningTime } = state.app;
    const infoState = state.infoReducer;
    return {
        isRunningTime,
        isPlayerClick,
        stepOrder,
        steps,
        checkIndex,
        disable,
        whichPlayer,
        infoState
    };
};

const mapDispatchToProps = {
    countDown,
    handleTapChange,
    handleChangesetting,
    handleResetTime,
    handleListStepClick,
    handleChangeHistoryOrder,
    handleShowModal,
    handleChangeAfterPlayerClick
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Information);
