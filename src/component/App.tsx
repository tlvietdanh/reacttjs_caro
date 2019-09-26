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
            squares: [],
            whichPlayer: true,
            lastStep: [],
            timeLimit: 0,
            undoMove: true,
            modalContext: '',
            showModal: false,
            isRunningTime: true,
            resetTime: false,
            disable: false,
            steps: [],
            isPlayerClick: false,
            checkIndex: -1,
            stepOrder: true, // true: dec, false: asc
            numberIndex: -1,
            charIndex: ''
        };
        const { squares } = this.state;
        for (let i = 0; i < this.MAX_COL * this.MAX_ROW; i += 1) {
            squares.push({ index: i, value: '', isRed: false });
        }

        this.handleClick = this.handleClick.bind(this);
        this.handlePlayAgains = this.handlePlayAgains.bind(this);
        this.handleChangesetting = this.handleChangesetting.bind(this);
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
        object2.push({ index, value, isRed: false });
        nSteps.push({ index: nSteps.length, name: this.handleGetStepName(index), squares: object2 });

        if (object2.length >= this.MAX_COL * this.MAX_ROW) {
            this.setState({
                showModal: true,
                isRunningTime: false,
                modalContext: 'The game is ended in a draw'
            });
        }
        // check winner
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
        const { whichPlayer } = this.state;

        const row = Math.floor(index / this.MAX_COL);
        const col = index - this.MAX_COL * row;
        const char = String.fromCharCode(65 + row);
        return `${whichPlayer ? 'PlayerX' : 'PlayerO'} moving at [${char}-${col + 1}]`;
    }

    handleCheckWinnerChickenDinner(mSquares: MySquare[], value: string): void {
        const { squares } = this.state;
        mSquares.sort(function mSort(a, b) {
            return b.index - a.index;
        });
        const visited: number[] = [];
        const directions = [1, this.MAX_COL, this.MAX_COL + 1, this.MAX_COL - 1];
        const sqa = mSquares.slice(0).filter(e => e.value === value);

        while (sqa.length > 0) {
            const temp = sqa.pop();
            if (temp !== undefined && temp.value === value && visited.filter(e => e === temp.index).length === 0) {
                visited.push(temp.index);
                let count = 1;
                directions.forEach(dir => {
                    if (this.handleCheckIsValidCell(temp.index, dir)) {
                        count = 1;
                        for (let i = 0; i < 5; i += 1) {
                            if (sqa.filter(e => e.index === temp.index + dir * (i + 1)).length > 0) {
                                count += 1;
                            } else {
                                break;
                            }
                        }
                        if (count >= 5) {
                            if (
                                mSquares.filter(e => e.index === temp.index - dir && e.value !== value).length === 0 ||
                                mSquares.filter(e => e.index === temp.index + dir * count && e.value !== value).length === 0
                            ) {
                                // highline the cells which are winner.
                                for (let i = 0; i < 5; i += 1) {
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
            default:
                break;
        }
        return true;
    }

    handlePlayAgains(): void {
        const { squares } = this.state;
        const object = [...squares];
        for (let i = 0; i < this.MAX_COL * this.MAX_ROW; i += 1) {
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
        let whichPlayer = true;
        const object = [...steps];
        object.sort((a: History, b: History) => {
            return a.index - b.index;
        });
        const thisStep = [...object[index].squares];
        const newSquares = squares.slice(0);
        newSquares.forEach(el => {
            const temp = thisStep.filter(ne => ne.index === el.index);
            const tempElement = el;
            if (temp.length === 0) {
                tempElement.value = '';
            } else {
                tempElement.value = temp[0].value;
            }
        });
        if (thisStep[thisStep.length - 1].value === 'X') whichPlayer = false;
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
        this.setState({ numberIndex: -1, charIndex: '' });
    }

    render(): JSX.Element {
        const {
            squares,
            mWinner,
            showModal,
            whichPlayer,
            disable,
            timeLimit,
            undoMove,
            charIndex,
            numberIndex,
            lastStep,
            isRunningTime,
            resetTime,
            stepOrder,
            steps,
            checkIndex,
            isPlayerClick,
            modalContext
        } = this.state;
        const mSquares = [];

        for (let i = 0; i < this.MAX_COL; i += 1) {
            const row = [];
            for (let j = 0; j < this.MAX_ROW; j += 1) {
                const temp = (
                    <Square
                        key={squares[i * this.MAX_COL + j].index}
                        handleClick={this.handleClick}
                        value={squares[i * this.MAX_COL + j].value}
                        index={squares[i * this.MAX_COL + j].index}
                        isRed={squares[i * this.MAX_COL + j].isRed}
                        whichPlayer={whichPlayer}
                        disable={disable}
                        handleMouseOver={this.handleMouseOver}
                        handleMouseLeaveSquare={this.handleMouseLeaveSquare}
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
        for (let i = 0; i < this.MAX_ROW; i += 1) {
            const char = String.fromCharCode('A'.charCodeAt(0) + i);
            indexChar.push(
                <div className="row" key={i}>
                    <span className={`index-char ${i === 0 ? 'first' : ''} ${charIndex === char ? 'turnRed' : ''}`}>{char}</span>
                </div>
            );
        }
        const number = [];
        for (let i = 0; i < this.MAX_ROW; i += 1) {
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
                            <Information
                                whichPlayer={whichPlayer}
                                lastStep={lastStep}
                                timeLimit={timeLimit}
                                undoMove={undoMove}
                                handleChangeSetting={this.handleChangesetting}
                                isRunningTime={isRunningTime}
                                resetTime={resetTime}
                                handleTimeOut={this.handleTimeOut}
                                handleResetTime={this.handleResetTime}
                                handleRestart={this.handlePlayAgains}
                                disable={disable}
                                steps={steps}
                                handleListStepClick={this.handleListStepClick}
                                checkIndex={checkIndex}
                                isPlayerClick={isPlayerClick}
                                handleChangeAfterPlayerClick={this.handleChangeAfterPlayerClick}
                                handleChangeHistoryOrder={this.handleChangeHistoryOrder}
                                stepOrder={stepOrder}
                            />
                        </div>
                    </div>
                    <Modal
                        context={modalContext}
                        mWinner={mWinner}
                        handlePlayAgains={this.handlePlayAgains}
                        showModal={showModal}
                        handleCloseModal={this.handleCloseModal}
                    />
                </div>
            </div>
        );
    }
}

export default App;
