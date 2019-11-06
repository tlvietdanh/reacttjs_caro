/* eslint-disable no-loop-func */
import * as type from '../constants/actionType';
import { AppState, History, ActionType } from '../constants/globalInterface';
import * as ConstVar from '../constants/constVariables';

const initialState: AppState = {
    squares: [],
    whichPlayer: true,
    lastStep: [],
    disable: false,
    isPlayerClick: false,
    modalContext: '',
    mWinner: '',
    showModal: false,
    checkIndex: -1,
    steps: [],
    stepOrder: true, // true: dec, false: asc
    isRunningTime: true,
    numberIndex: -1,
    charIndex: '',
    myTurn: false,
    botIndex: -1,
    undoIndex: 0,
    gameMode: true, // true: play with bot, false: play with human;
    indexOfBot: -1,
    Room: { id: '', host: '', guest: '' },
    askTie: false,
    askUndo: false
};

function handleCheckIsValidCell(index: number, direction: number): boolean {
    const currentRow = Math.floor(index / ConstVar.MAX_COL);
    const currentCol = index - ConstVar.MAX_COL * currentRow;

    switch (direction) {
        case 1:
            if (currentCol > ConstVar.MAX_COL - 5) return false;
            break;
        case ConstVar.MAX_COL + 1:
            if (currentCol > ConstVar.MAX_COL - 5) return false;
            break;
        case ConstVar.MAX_COL - 1:
            if (currentCol - 4 < 0) return false;
            break;
        default:
            break;
    }
    return true;
}
function handleGetStepName(index: number, whichPlayer: boolean): string {
    const row = Math.floor(index / ConstVar.MAX_COL);
    const col = index - ConstVar.MAX_COL * row;
    const char = String.fromCharCode(65 + row);
    return `${whichPlayer ? 'PlayerX' : 'PlayerO'} moving at [${char}-${col + 1}]`;
}

export default function app(state: AppState = initialState, action: ActionType): AppState {
    switch (action.type) {
        case type.USER_INITIAL_BOARD: {
            const { squares } = state;
            for (let i = 0; i < ConstVar.MAX_COL * ConstVar.MAX_ROW; i += 1) {
                squares.push({ index: i, value: '', isRed: false });
            }
            return { ...state, squares };
        }
        case type.USER_HANDLE_CLICK: {
            let { index } = action.payload;
            const { lastStep, squares, steps, checkIndex, stepOrder, whichPlayer } = state;
            let { undoIndex, myTurn } = state;
            if (index === ConstVar.BOT_INDEX) {
                const myArray = [...squares];
                index = myArray[Math.floor(Math.random() * myArray.length)].index;
            }
            const value = whichPlayer ? 'X' : 'O';

            // assign value of square.
            const object = [...squares];
            object[index].value = value;
            let object2 = lastStep.slice(0, undoIndex);
            let nSteps = steps.slice(0, undoIndex);

            nSteps.sort((a: History, b: History) => {
                return a.index - b.index;
            });
            if (checkIndex !== -1) {
                object2 = [...nSteps[checkIndex].squares];
                nSteps = nSteps.slice(0, checkIndex + 1);
            }
            object2.push({ index, value, isRed: false });
            undoIndex += 1;
            nSteps.push({ index: nSteps.length, name: handleGetStepName(index, whichPlayer), squares: object2 });

            if (object2.length >= ConstVar.MAX_COL * ConstVar.MAX_ROW) {
                return {
                    ...state,
                    showModal: true,
                    modalContext: ConstVar.TIE
                };
            }
            // check winner
            nSteps.sort((a: History, b: History) => {
                return stepOrder ? a.index - b.index : b.index - a.index;
            });
            myTurn = false;
            return {
                ...state,
                squares: object,
                lastStep: object2,
                whichPlayer: !whichPlayer,
                isPlayerClick: true,
                checkIndex: -1,
                steps: nSteps,
                undoIndex,
                myTurn
            };
        }
        case type.HANDLE_CHANGE_PLAYER_TURN: {
            return { ...state, myTurn: true };
        }
        case type.USER_HANDLE_CHECK_WINNER_CHICKEN_DINNER: {
            const { lastStep, squares, whichPlayer } = state;
            // whichPlay has been changed in handleClick Action
            const value = whichPlayer ? 'O' : 'X';
            const mSquare = [...lastStep];
            mSquare.sort(function mSort(a, b) {
                return b.index - a.index;
            });
            const visited: number[] = [];
            const directions = [1, ConstVar.MAX_COL, ConstVar.MAX_COL + 1, ConstVar.MAX_COL - 1];
            const sqa = mSquare.slice(0).filter(e => e.value === value);

            while (sqa.length > 0) {
                const temp = sqa.pop();
                if (temp !== undefined && temp.value === value && visited.filter(e => e === temp.index).length === 0) {
                    visited.push(temp.index);
                    let count = 1;
                    for (let q = 0; q < directions.length; q += 1) {
                        if (handleCheckIsValidCell(temp.index, directions[q])) {
                            count = 1;
                            for (let i = 0; i < 5; i += 1) {
                                if (sqa.filter(e => e.index === temp.index + directions[q] * (i + 1)).length > 0) {
                                    count += 1;
                                } else {
                                    break;
                                }
                            }
                            if (count >= 5) {
                                if (
                                    mSquare.filter(e => e.index === temp.index - directions[q] && e.value !== value).length === 0 ||
                                    mSquare.filter(e => e.index === temp.index + directions[q] * count && e.value !== value).length === 0
                                ) {
                                    for (let i = 0; i < 5; i += 1) {
                                        squares[temp.index + directions[q] * i].isRed = true;
                                    }
                                    return {
                                        ...state,
                                        mWinner: value,
                                        showModal: true,
                                        isRunningTime: false,
                                        modalContext: 'The winner is:',
                                        squares
                                    };
                                }
                            }
                        }
                    }
                }
            }
            return { ...state };
        }
        case type.USER_HANDLE_BOT_MOVE: {
            const { squares } = state;
            const myArray = [...squares];
            const { index } = myArray[Math.floor(Math.random() * myArray.length)];
            return { ...state, indexOfBot: index };
        }
        case type.USER_HANDLE_PLAY_AGAINS: {
            const { squares, gameMode } = state;
            const object = [...squares];
            for (let i = 0; i < ConstVar.MAX_COL * ConstVar.MAX_ROW; i += 1) {
                object[i].value = '';
                object[i].isRed = false;
            }
            if (gameMode) {
                return { ...initialState, myTurn: true };
            }
            return initialState;
        }
        case type.USER_HANDLE_CLOSE_MODAL: {
            return { ...state, showModal: false, disable: false };
        }
        case type.USER_HANDLE_STEP_CLICK: {
            const { steps, squares } = state;
            const { index, checkIndex } = action.payload;
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
            return { ...state, squares: newSquares, checkIndex, whichPlayer };
        }
        case type.USER_HANLDE_CHANGLE_AFTER_PLAYER_CLICK: {
            return { ...state, isPlayerClick: false };
        }
        case type.USER_HANDLE_CHANGE_HISTORY_ORDER: {
            const { stepOrder, steps } = state;
            const object = [...steps];
            object.sort((a: History, b: History) => {
                return stepOrder ? b.index - a.index : a.index - b.index;
            });
            return { ...state, steps: object, stepOrder: !stepOrder };
        }
        case type.USER_HANDLE_SHOW_MODAL: {
            const { modalContext, mWinner } = action.payload;
            return { ...state, showModal: true, mWinner, modalContext };
        }
        case type.USER_HANDLE_MOUSE_OVER: {
            const { index } = action.payload;
            const row = Math.floor(index / ConstVar.MAX_COL);
            const col = index - ConstVar.MAX_COL * row;
            const char = String.fromCharCode(65 + row);
            return { ...state, numberIndex: col, charIndex: char };
        }
        case type.USER_HANDLE_MOUSE_LEAVE: {
            return { ...state, numberIndex: -1, charIndex: '' };
        }
        case type.HANDLE_UNDO_MOVE: {
            const { squares, lastStep, whichPlayer, myTurn } = state;
            let { undoIndex } = state;
            if (lastStep.length > 0 && undoIndex > 0) {
                undoIndex -= 1;
                const arrObject = [...squares];
                arrObject[lastStep[undoIndex].index].value = '';
                return {
                    ...state,
                    squares: arrObject,
                    whichPlayer: !whichPlayer,
                    myTurn: !myTurn,
                    undoIndex
                };
            }
            return { ...state };
        }
        case type.HANDLE_REDO_MOVE: {
            const { squares, lastStep, whichPlayer, myTurn } = state;
            let { undoIndex } = state;
            if (lastStep.length > 0 && undoIndex <= lastStep.length - 1) {
                const arrObject = [...squares];
                arrObject[lastStep[undoIndex].index].value = lastStep[undoIndex].value;
                undoIndex += 1;
                return {
                    ...state,
                    squares: arrObject,
                    whichPlayer: !whichPlayer,
                    myTurn: !myTurn,
                    undoIndex
                };
            }
            return { ...state };
        }
        case type.HANDLE_CHANGLE_GAME_MODE: {
            const { gameMode } = action.payload;
            return { ...state, gameMode };
        }
        case type.HANDLE_JOIN_ROOM: {
            const { room } = action.payload;
            return { ...state, Room: room };
        }
        case type.HANDLE_ASK_FOR_TIE: {
            const { askTie, disable } = state;
            return { ...state, askTie: !askTie, disable: !disable };
        }
        case type.HANDLE_ASK_FOR_UNDO: {
            const { askUndo, disable } = state;
            return { ...state, askUndo: !askUndo, disable: !disable };
        }
        default:
            return { ...state };
    }
}
