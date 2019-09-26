import React from 'react';
import '../assets/App.css';
import Square from './Square';
import Modal from './Modal';
import Information from './Information';
import { History, MySquare } from './Global';

interface MyProps {}

interface MyState {
    mWinner: string; // X or O or ''
    squares: MySquare[];
    whichPlayer: boolean; // true: X flase: O
    lastStep: MySquare[];
    timeLimit: number;
    undoMove: boolean;
    modalContext: string;
    showModal: boolean;
    isRunningTime: boolean;
    resetTime: boolean;
    disable: boolean;
    steps: History[];
    isPlayerClick: boolean;
    checkIndex: number;
    stepOrder: boolean;
    numberIndex: number;
    charIndex: string;
}

class App extends React.Component<MyProps, MyState> {
    private MAX_COL = 20;
    private MAX_ROW = 20;
    constructor(props: MyProps) {
        super(props);
        this.state = {
            mWinner: '',
            squares: new Array<MySquare>(),
            whichPlayer: true,
            lastStep: new Array<MySquare>(),
            timeLimit: 0,
            undoMove: true,
            modalContext: '',
            showModal: false,
            isRunningTime: true,
            resetTime: false,
            disable: false,
            steps: new Array<History>(),
            isPlayerClick: false,
            checkIndex: -1,
            stepOrder: true, // true: dec, false: asc
            numberIndex: -1,
            charIndex: ''
        };
        const { squares } = this.state;
        for (let i = 0; i < this.MAX_COL * this.MAX_ROW; i++) {
            squares.push({ index: i, value: '', isRed: false });
        }

        this.handleClick = this.handleClick.bind(this);
        this.handlePlayAgains = this.handlePlayAgains.bind(this);
        this.handleChangesetting = this.handleChangesetting.bind(this);
        this.handleUndoMove = this.handleUndoMove.bind(this);
        this.handleTimeOut = this.handleTimeOut.bind(this);
        this.handleResetTime = this.handleResetTime.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleListStepClick = this.handleListStepClick.bind(this);
        this.handleChangeAfterPlayerClick = this.handleChangeAfterPlayerClick.bind(this);
        this.handleChangeHistoryOrder = this.handleChangeHistoryOrder.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseLeaveSquare = this.handleMouseLeaveSquare.bind(this);
    }

    handleClick(index: number, value: string): void {
        const { squares, lastStep, steps, checkIndex, whichPlayer, stepOrder } = this.state;
        const object = [...squares];
        object[index].value = value;
        let object2 = [...lastStep];
        let nSteps = [...steps];
        nSteps.sort((a: History, b: History) => {
            return a.index - b.index;
        });
        if (checkIndex !== -1) {
            object2 = [...nSteps[checkIndex].squares];
            nSteps = nSteps.slice(0, checkIndex + 1);
        }
        object2.push({ index: index, value: value, isRed: false });
        nSteps.push({ index: nSteps.length, name: this.handleGetStepName(index), squares: object2 });

        if (object2.length >= this.MAX_COL * this.MAX_ROW) {
            this.setState({
                showModal: true,
                isRunningTime: false,
                modalContext: 'The game is ended in a draw'
            });
        }
        //check winner
        this.handleCheckWinnerChickenDinner(object2.slice(0), value);
        nSteps.sort((a: History, b: History) => {
            return stepOrder ? a.index - b.index : b.index - a.index;
        });
        this.setState({
            whichPlayer: !whichPlayer,
            squares: object,
            lastStep: object2,
            steps: nSteps,
            checkIndex: -1,
            isPlayerClick: true
        });
    }

    handleGetStepName(index: number): string {
        const row = Math.floor(index / this.MAX_COL);
        const col = index - this.MAX_COL * row;
        const char = String.fromCharCode(65 + row);
        return `${this.state.whichPlayer ? 'PlayerX' : 'PlayerO'} moving at [${char}-${col + 1}]`;
    }

    handleCheckWinnerChickenDinner(mSquares: MySquare[], value: string): void {
        const { squares } = this.state;
        mSquares.sort(function(a, b) {
            return b.index - a.index;
        });
        const visited: number[] = [];
        const directions = [1, this.MAX_COL, this.MAX_COL + 1, this.MAX_COL - 1];
        const sqa = mSquares.slice(0).filter(e => e.value === value);

        while (sqa.length > 0) {
            const temp = Object.assign({}, sqa.pop());
            if (temp.value === value && visited.filter(e => e === temp.index).length === 0) {
                visited.push(temp.index);
                let count = 1;
                directions.forEach(dir => {
                    if (this.handleCheckIsValidCell(temp.index, dir)) {
                        count = 1;
                        for (let i = 0; i < 5; i++) {
                            if (sqa.filter(e => e.index === temp.index + dir * (i + 1)).length > 0) {
                                count++;
                            } else {
                                break;
                            }
                        }
                        if (count >= 5) {
                            if (
                                mSquares.filter(e => e.index === temp.index - dir && e.value !== value).length === 0 ||
                                mSquares.filter(e => e.index === temp.index + dir * count && e.value !== value).length === 0
                            ) {
                                //highline the cells which are winner.
                                for (let i = 0; i < 5; i++) {
                                    squares[temp.index + dir * i].isRed = true;
                                }
                                this.setState({
                                    mWinner: value,
                                    showModal: true,
                                    isRunningTime: false,
                                    modalContext: 'The winner is:'
                                });
                            }
                        }
                    }
                });
            }
        }
    }

    handleCheckIsValidCell(index: number, direction: number): boolean {
        const currentRow = Math.floor(index / this.MAX_COL);
        const currentCol = index - this.MAX_COL * currentRow;

        switch (direction) {
            case 1:
                if (currentCol > this.MAX_COL - 5) return false;
                break;
            case this.MAX_COL + 1:
                if (currentCol > this.MAX_COL - 5) return false;
                break;
            case this.MAX_COL - 1:
                if (currentCol - 5 < 0) return false;
                break;
        }
        return true;
    }

    handlePlayAgains(): void {
        const { squares } = this.state;
        const object = [...squares];
        for (let i = 0; i < this.MAX_COL * this.MAX_ROW; i++) {
            object[i].value = '';
            object[i].isRed = false;
        }
        this.setState({
            squares: object,
            mWinner: '',
            whichPlayer: true,
            lastStep: [],
            showModal: false,
            modalContext: '',
            resetTime: true,
            isRunningTime: true,
            disable: false,
            steps: [],
            isPlayerClick: false,
            checkIndex: -1,
            stepOrder: true
        });
    }

    handleChangesetting(timeLimit: number, undoMove: boolean): void {
        this.setState({ timeLimit, undoMove });
    }

    handleUndoMove(): void {
        const { squares, lastStep } = this.state;
        const object = Object.assign([], { ...lastStep });
        object.pop();
        const arrObject = Object.assign({}, { ...squares });
        arrObject[lastStep[lastStep.length - 1].index].value = '';
        this.setState({
            squares: arrObject,
            lastStep: object,
            whichPlayer: !this.state.whichPlayer
        });
    }

    handleTimeOut(): void {
        this.setState({
            modalContext: 'Time out! The game is ended in a draw',
            showModal: true,
            isRunningTime: false
        });
    }

    handleResetTime(): void {
        this.setState({ resetTime: false });
    }

    handleCloseModal(): void {
        this.setState({ disable: true, showModal: false });
    }

    handleListStepClick(index: number, checkIndex: number): void {
        const { steps, squares } = this.state;
        let whichPlayer;
        const object = [...steps];
        object.sort((a: History, b: History) => {
            return a.index - b.index;
        });
        const thisStep = [...object[index].squares];
        const newSquares = squares.slice(0);
        newSquares.forEach(el => {
            const temp = thisStep.filter(ne => ne.index === el.index);
            if (temp.length === 0) {
                el.value = '';
            } else {
                el.value = temp[0].value;
            }
        });
        thisStep[thisStep.length - 1].value === 'X' ? (whichPlayer = false) : (whichPlayer = true);
        this.setState({ squares: newSquares, checkIndex, whichPlayer });
    }

    handleChangeAfterPlayerClick(): void {
        this.setState({ isPlayerClick: false });
    }

    handleChangeHistoryOrder(): void {
        const { stepOrder, steps } = this.state;
        const object = [...steps];
        object.sort((a: History, b: History) => {
            return stepOrder ? b.index - a.index : a.index - b.index;
        });
        this.setState({ steps: object, stepOrder: !stepOrder });
    }

    handleMouseOver(index: number): void {
        const row = Math.floor(index / this.MAX_COL);
        const col = index - this.MAX_COL * row;
        const char = String.fromCharCode(65 + row);
        this.setState({ numberIndex: col, charIndex: char });
    }

    handleMouseLeaveSquare(): void {
        console.log('hihi');
        this.setState({ numberIndex: -1, charIndex: '' });
    }

    render(): JSX.Element {
        const { squares, mWinner, showModal } = this.state;
        const mSquares = [];

        for (let i = 0; i < this.MAX_COL; i++) {
            const row = [];
            for (let j = 0; j < this.MAX_ROW; j++) {
                const temp = (
                    <Square
                        key={squares[i * this.MAX_COL + j].index}
                        handleClick={this.handleClick}
                        value={squares[i * this.MAX_COL + j].value}
                        index={squares[i * this.MAX_COL + j].index}
                        isRed={squares[i * this.MAX_COL + j].isRed}
                        whichPlayer={this.state.whichPlayer}
                        disable={this.state.disable}
                        handleMouseOver={this.handleMouseOver}
                        handleMouseLeaveSquare={this.handleMouseLeaveSquare}
                    ></Square>
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
        for (let i = 0; i < this.MAX_ROW; i++) {
            const char = String.fromCharCode('A'.charCodeAt(0) + i);
            indexChar.push(
                <div className="row" key={i}>
                    <span className={`index-char ${i === 0 ? 'first' : ''} ${this.state.charIndex === char ? 'turnRed' : ''}`}>{char}</span>
                </div>
            );
        }
        const number = [];
        for (let i = 0; i < this.MAX_ROW; i++) {
            number.push(
                <div className={`"d-inline text-center index " ${i + 1 > 10 ? 'bIndex' : 'sIndex'} ${this.state.numberIndex === i ? 'turnRed' : ''}`}>
                    {i + 1}
                </div>
            );
        }

        return (
            <div className="App disable">
                <img className="img" alt=""></img>
                <div className="container mContainer">
                    <div className="row">
                        <div className="col-8 Squares custom">
                            <div className="char">{indexChar}</div>
                            <div className="number">{number}</div>
                            <div className="container SetMargin">{mSquares} </div>
                        </div>
                        <div className="col-4">
                            <Information
                                whichPlayer={this.state.whichPlayer}
                                lastStep={this.state.lastStep}
                                timeLimit={this.state.timeLimit}
                                undoMove={this.state.undoMove}
                                handleChangeSetting={this.handleChangesetting}
                                handleUndoMove={this.handleUndoMove}
                                isRunningTime={this.state.isRunningTime}
                                resetTime={this.state.resetTime}
                                handleTimeOut={this.handleTimeOut}
                                handleResetTime={this.handleResetTime}
                                handleRestart={this.handlePlayAgains}
                                disable={this.state.disable}
                                steps={this.state.steps}
                                handleListStepClick={this.handleListStepClick}
                                checkIndex={this.state.checkIndex}
                                isPlayerClick={this.state.isPlayerClick}
                                handleChangeAfterPlayerClick={this.handleChangeAfterPlayerClick}
                                handleChangeHistoryOrder={this.handleChangeHistoryOrder}
                                stepOrder={this.state.stepOrder}
                            ></Information>
                        </div>
                    </div>
                    <Modal
                        context={this.state.modalContext}
                        mWinner={mWinner}
                        handlePlayAgains={this.handlePlayAgains}
                        showModal={showModal}
                        handleCloseModal={this.handleCloseModal}
                    ></Modal>
                </div>
            </div>
        );
    }
}

export default App;
