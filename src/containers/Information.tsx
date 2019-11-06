import React, { FormEvent } from 'react';
import { connect } from 'react-redux';
import OPlayer from '../assets/o.png';
import XPlayer from '../assets/x.png';
import ASC from '../assets/asc.png';
import DEC from '../assets/dec.png';
import Setting from './Setting';
import * as ConstVar from '../constants/constVariables';
import { History, InfoState, ReducerType, Room, Message } from '../constants/globalInterface';
import Undo from '../assets/undo-arrow.png';
import Redo from '../assets/redo.png';

import {
    countDown,
    handleTapChange,
    handleChangesetting,
    handleResetTime,
    handleListStepClick,
    handleChangeHistoryOrder,
    handleShowModal,
    handleChangeAfterPlayerClick,
    handleAfterRestartTime,
    handleUndoMove,
    handleRedoMove,
    handleChangeMessage,
    handleSendMessage,
    handleAskForUndo
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
    gameMode: boolean;
    io: any;
    Room: Room;
    username: string;
    myTurn: boolean;
    undoIndex: number;
    countDown: Function;
    handleTapChange: Function;
    handleChangesetting: Function;
    handleResetTime: Function;
    handleListStepClick: Function;
    handleChangeHistoryOrder: Function;
    handleShowModal: Function;
    handleChangeAfterPlayerClick: Function;
    handleAfterRestartTime: Function;
    handleUndoMove: Function;
    handleRedoMove: Function;
    handleChangeMessage: Function;
    handleSendMessage: Function;
    handleAskForUndo: Function;
}

interface MyState {
    messages: Array<any>;
}

class Information extends React.Component<MyProps, MyState> {
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
        this.handleUndoMove = this.handleUndoMove.bind(this);
        this.handleRedoMove = this.handleRedoMove.bind(this);
        this.handleSendMessage = this.handleSendMessage.bind(this);
        this.handleChangeMessage = this.handleChangeMessage.bind(this);
    }

    componentWillMount() {
        const { io, handleSendMessage } = this.props;
        io.on('SERVER_SEND_MESSAGE', (res: Message) => {
            handleSendMessage(res);
        });
    }

    componentDidMount(): void {
        this.handleStartTime();
    }

    componentDidUpdate(): void {
        const { isRunningTime, isPlayerClick, infoState, handleAfterRestartTime } = this.props;
        if (!isRunningTime) this.handleStopTime();
        if (infoState.isRestartTime && this.counter === 0) {
            this.handleStopTime();
            this.handleStartTime();
            handleAfterRestartTime();
        }
        if (isPlayerClick) this.handleScrollToBottom();
    }

    componentWillUnmount() {
        this.handleStopTime();
        this.counter = 0;
    }

    handleTimeOut(): void {
        this.handleStopTime();
        const { handleShowModal, handleAfterRestartTime } = this.props;
        handleShowModal(ConstVar.TIE, '');
        handleAfterRestartTime();
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
        this.counter = 1;
        this.interval = window.setInterval(this.countDown, 1000);
    }

    handleStopTime(): void {
        this.counter = 0;
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

    handleUndoMove() {
        const { handleUndoMove, gameMode, io, Room, handleAskForUndo, undoIndex } = this.props;
        if (undoIndex) return;
        if (gameMode) {
            handleUndoMove();
        } else {
            io.emit('CLIENT_ASK_UNDO', Room);
            handleAskForUndo();
        }
    }

    handleRedoMove() {
        const { handleRedoMove } = this.props;
        handleRedoMove();
    }

    handleSendMessage() {
        const { infoState, Room, io, username, handleSendMessage, handleChangeMessage } = this.props;
        const { myMessage } = infoState;
        if (myMessage.length !== 0) {
            handleSendMessage({ name: username, value: myMessage });
            handleChangeMessage('');
            io.emit('CLIENT_SEND_MESSAGE', { Room, value: { name: username, value: myMessage } });
            const scroll = document.getElementById('chatbox');
            if (scroll !== null) {
                scroll.scrollTop = scroll.scrollHeight;
            }
        }
    }

    handleChangeMessage(e: any) {
        const { handleChangeMessage } = this.props;
        handleChangeMessage(e.currentTarget.value);
    }

    render(): JSX.Element {
        const { infoState, steps, checkIndex, disable, whichPlayer, stepOrder, gameMode, username, myTurn } = this.props;

        const { seconds, minutes, hours, isInfo, undoMove, listMessages, myMessage } = infoState;

        const mSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        const mMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const mHours = hours < 10 ? `0${hours}` : `${hours}`;

        const buttonUndo = (
            <button type="button" className="btn btn-outline-success undo" disabled={!undoMove || disable || !myTurn} onClick={this.handleUndoMove}>
                <img className="img-fluid" alt="Undo" src={Undo} />
            </button>
        );

        const buttonRedo = (
            <button type="button" className="btn btn-outline-success undo" disabled={!undoMove || disable} onClick={this.handleRedoMove}>
                <img className="img-fluid" alt="Undo" src={Redo} />
            </button>
        );

        const listStep = (
            <div className="list-group mList" id="listStep">
                {steps.map((el: History) => {
                    return (
                        <button
                            type="button"
                            disabled
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

        const myStep = (
            <div>
                <div className="text-left">
                    <button type="button" className="btn btn-light mText" onClick={this.handleChangeHistoryOrder}>
                        <h5 className="mText d-inline"> History: </h5>
                        <img className="fa fa-life-ring fa-3x iconAsc" src={stepOrder ? DEC : ASC} alt="" />
                    </button>
                </div>
                <div className="text-center d-inline-block mt-1">{listStep}</div>
            </div>
        );
        const chatBox = (
            <div>
                <div className="list-group mList" id="chatbox">
                    {listMessages.map((el: Message, index) => {
                        return (
                            <button
                                type="button"
                                disabled
                                // eslint-disable-next-line react/no-array-index-key
                                key={index}
                                className="list-group-item list-group-item-action nexline"
                                onClick={this.handleChangeStep}
                            >
                                <span className={el.name === username ? 'mtext-left' : 'mtext-right'}>{`${el.name}: `}</span>
                                <span>{el.value}</span>
                            </button>
                        );
                    })}
                </div>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="type your message here"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        value={myMessage}
                        onChange={this.handleChangeMessage}
                    />
                    <div className="input-group-append">
                        <button type="button" className="btn btn-outline-success" onClick={this.handleSendMessage}>
                            send
                        </button>
                    </div>
                </div>
            </div>
        );

        const Infor = (
            <div className="card-body">
                <div className="text-left">
                    <h5 className="mText"> {`Player's turn:`} </h5>
                </div>
                <div className="text-center">
                    {buttonUndo}
                    <img alt="" className="img-fluid img-x" src={whichPlayer ? XPlayer : OPlayer} />
                    {gameMode && buttonRedo}
                </div>
                {gameMode ? myStep : chatBox}
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
    const { steps, checkIndex, disable, whichPlayer, stepOrder, isPlayerClick, isRunningTime, gameMode, Room } = state.app;
    const infoState = state.infoReducer;
    return {
        isRunningTime,
        isPlayerClick,
        stepOrder,
        steps,
        checkIndex,
        disable,
        whichPlayer,
        infoState,
        gameMode,
        io: state.io,
        Room,
        username: state.loginReducer.username,
        myTurn: state.app.myTurn,
        undoIndex: state.app.undoIndex
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
    handleChangeAfterPlayerClick,
    handleAfterRestartTime,
    handleUndoMove,
    handleRedoMove,
    handleChangeMessage,
    handleSendMessage,
    handleAskForUndo
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Information);
