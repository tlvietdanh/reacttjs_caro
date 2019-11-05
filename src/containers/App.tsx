import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import Square from './Square';
import Modal from './Modal';
import Information from './Information';
import { ReducerType, MySquare } from '../constants/globalInterface';
import * as ConstVar from '../constants/constVariables';
import { handleLogout, handleCheckLoginRequest } from '../actions/LoginAction';

import {
    handleInitialBoard,
    handleClick,
    handleCheckWinnerChickenDinner,
    handlePlayAgains,
    handleChangeAfterPlayerClick,
    handleCloseModal,
    handleListStepClick,
    handleChangeHistoryOrder,
    handleResetTime
} from '../actions/index';

export interface AppProps {
    charIndex: string;
    numberIndex: number;
    squares: MySquare[];
    isLogin: boolean;
    checkLogin: boolean;

    handleInitialBoard: Function;
    handleClick: Function;
    handleCheckWinnerChickenDinner: Function;
    handlePlayAgains: Function;
    handleCloseModal: Function;
    handleListStepClick: Function;
    handleChangeAfterPlayerClick: Function;
    handleChangeHistoryOrder: Function;
    handleResetTime: Function;
    handleLogout: Function;
    handleCheckLoginRequest: Function;
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
        const { handleInitialBoard, handleCheckLoginRequest, checkLogin } = this.props;
        if (!checkLogin) handleCheckLoginRequest();
        handleInitialBoard();
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
        const { charIndex, numberIndex, squares, checkLogin } = this.props;
        if (!checkLogin) {
            return <Redirect to="/login" />;
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
        checkLogin: state.loginReducer.checkLogin
    };
};

const mapDispatchToProps = {
    handleInitialBoard,
    handleClick,
    handlePlayAgains,
    handleCheckWinnerChickenDinner,
    handleChangeAfterPlayerClick,
    handleCloseModal,
    handleListStepClick,
    handleResetTime,
    handleChangeHistoryOrder,
    handleLogout,
    handleCheckLoginRequest
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
