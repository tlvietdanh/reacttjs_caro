import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Square from './Square';
import Modal from './Modal';
import Information from './Information';
import { ReducerType, MySquare, Room } from '../constants/globalInterface';
import * as ConstVar from '../constants/constVariables';
import { handleLogout, handleCheckLoginRequest } from '../actions/LoginAction';

import {
    handleInitialBoard,
    handleGuestClick,
    handleCheckWinnerChickenDinner,
    handlePlayAgains,
    handleChangeAfterPlayerClick,
    handleCloseModal,
    handleListStepClick,
    handleChangeHistoryOrder,
    handleResetTime,
    handleChangePlayerTurn,
    handleShowModal,
    handleQuitGame,
    handleAskForTie,
    handleAskForUndo,
    handleUndoMove
} from '../actions/index';

export interface AppProps {
    charIndex: string;
    numberIndex: number;
    squares: MySquare[];
    isLogin: boolean;
    checkLogin: boolean;
    io: any;
    Room: Room;
    username: string;
    gameMode: boolean;
    startGame: boolean;
    askTie: boolean;
    askUndo: boolean;

    handleInitialBoard: Function;
    handleGuestClick: Function;
    handleCheckWinnerChickenDinner: Function;
    handlePlayAgains: Function;
    handleCloseModal: Function;
    handleListStepClick: Function;
    handleChangeAfterPlayerClick: Function;
    handleChangeHistoryOrder: Function;
    handleResetTime: Function;
    handleLogout: Function;
    handleCheckLoginRequest: Function;
    handleChangePlayerTurn: Function;
    handleShowModal: Function;
    handleQuitGame: Function;
    history: any;
    handleAskForTie: Function;
    handleAskForUndo: Function;
    handleUndoMove: Function;
}

class App extends React.Component<AppProps> {
    constructor(props: AppProps) {
        super(props);

        this.handlePlayAgains = this.handlePlayAgains.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleListStepClick = this.handleListStepClick.bind(this);
        this.handleChangeAfterPlayerClick = this.handleChangeAfterPlayerClick.bind(this);
        this.handleChangeHistoryOrder = this.handleChangeHistoryOrder.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    UNSAFE_componentWillMount(): void {
        const {
            handleInitialBoard,
            handleGuestClick,
            Room,
            username,
            handleChangePlayerTurn,
            handleShowModal,
            gameMode,
            handleQuitGame,
            io,
            handleAskForTie,
            handleAskForUndo,
            handleUndoMove
        } = this.props;
        handleInitialBoard();
        if (Room.host === username || gameMode) {
            handleChangePlayerTurn();
        }
        io.on('SERVER_SEND_INDEX', (index: number) => {
            handleGuestClick(index);
        });
        io.on('SERVER_PLAYER_QUIT_GAME', () => {
            handleShowModal('The enemy has left the game. You are the winner now', username === Room.host ? 'X' : 'O');
        });
        io.on('SERVER_SURRENDER', () => {
            handleShowModal('The enemy is surrenderd, you are the winner now', username === Room.host ? 'X' : 'O');
        });
        io.on('SERVER_ASK_FOR_TIE_GAME', () => {
            handleShowModal('The enemy is asking for a tie game, would you accept it?', 'ask');
            handleAskForTie();
        });
        io.on('SERVER_ASK_UNDO', () => {
            handleShowModal('The enemy is asking for undo lasted step, would you accept it?', 'ask');
            handleAskForUndo();
        });
        io.on('disconnect', () => {
            handleQuitGame();
        });
        io.on('SERVER_ACCEPT_TIE', () => {
            handleShowModal('The game is ended in tie', '');
        });
        io.on('SERVER_ACCEPT_UNDO', () => {
            handleUndoMove();
            handleAskForUndo();
        });
        io.on('SERVER_REJECT_UNDO', () => {
            handleAskForUndo();
        });
        io.on('CLIENT_REJECT_TIE', () => {
            handleAskForTie();
        })
    }

    componentWillUnmount(): void {
        const { io, Room, handleQuitGame, gameMode, startGame } = this.props;
        if (!gameMode && !startGame) {
            io.emit('CLIENT_PLAYER_QUIT_GAME', Room);
        }
        handleQuitGame();
    }

    handlePlayAgains(): void {
        const { handlePlayAgains, handleResetTime } = this.props;
        handlePlayAgains();
        handleResetTime();
    }

    handleCloseModal(): void {
        const { handleCloseModal } = this.props;
        handleCloseModal();
    }

    handleListStepClick(index: number, checkIndex: number): void {
        const { handleListStepClick } = this.props;
        handleListStepClick(index, checkIndex);
    }

    handleChangeAfterPlayerClick(): void {
        const { handleChangeAfterPlayerClick } = this.props;
        handleChangeAfterPlayerClick();
    }

    handleChangeHistoryOrder(): void {
        const { handleChangeHistoryOrder } = this.props;
        handleChangeHistoryOrder();
    }

    handleLogout(): void {
        const { handleLogout } = this.props;
        handleLogout();
    }

    render(): JSX.Element {
        const { charIndex, numberIndex, squares, startGame, history } = this.props;
        if (!startGame) {
            if (history) history.replace('/');
        }
        const mSquares = [];

        for (let i = 0; i < ConstVar.MAX_COL; i += 1) {
            const row = [];
            for (let j = 0; j < ConstVar.MAX_ROW; j += 1) {
                const temp = (
                    <Square
                        key={i * ConstVar.MAX_COL + j}
                        index={squares[i * ConstVar.MAX_COL + j].index}
                        value={squares[i * ConstVar.MAX_COL + j].value}
                        isRed={squares[i * ConstVar.MAX_COL + j].isRed}
                    />
                );
                row.push(temp);
            }
            const tempCol = (
                <div className="row" key={i}>
                    {row}
                </div>
            );
            mSquares.push(tempCol);
        }

        const indexChar = [];
        for (let i = 0; i < ConstVar.MAX_ROW; i += 1) {
            const char = String.fromCharCode('A'.charCodeAt(0) + i);
            indexChar.push(
                <div className="row" key={i}>
                    <span className={`index-char ${i === 0 ? 'first' : ''} ${charIndex === char ? 'turnRed' : ''}`}>{char}</span>
                </div>
            );
        }
        const number = [];
        for (let i = 0; i < ConstVar.MAX_ROW; i += 1) {
            number.push(
                <div key={i} className={`"d-inline text-center index " ${i + 1 > 10 ? 'bIndex' : 'sIndex'} ${numberIndex === i ? 'turnRed' : ''}`}>
                    {i + 1}
                </div>
            );
        }

        return (
            <div className="App disable">
                <img className="img" alt="" />
                <div className="container mContainer">
                    <div className="row">
                        <div className="col-8 Squares custom">
                            <div className="char">{indexChar}</div>
                            <div className="number">{number}</div>
                            <div className="container SetMargin">{mSquares} </div>
                        </div>
                        <div className="col-4">
                            <Information />
                        </div>
                    </div>
                    <Modal />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: ReducerType) => {
    return {
        charIndex: state.app.charIndex,
        numberIndex: state.app.numberIndex,
        squares: state.app.squares,
        isLogin: state.loginReducer.isLogin,
        checkLogin: state.loginReducer.checkLogin,
        io: state.io,
        Room: state.app.Room,
        username: state.loginReducer.username,
        gameMode: state.app.gameMode,
        startGame: state.dashboard.startGame,
        askTie: state.app.askTie,
        askUndo: state.app.askUndo
    };
};

const mapDispatchToProps = {
    handleInitialBoard,
    handleGuestClick,
    handlePlayAgains,
    handleCheckWinnerChickenDinner,
    handleChangeAfterPlayerClick,
    handleCloseModal,
    handleListStepClick,
    handleResetTime,
    handleChangeHistoryOrder,
    handleLogout,
    handleCheckLoginRequest,
    handleChangePlayerTurn,
    handleShowModal,
    handleQuitGame,
    handleAskForTie,
    handleAskForUndo,
    handleUndoMove
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(App)
);
