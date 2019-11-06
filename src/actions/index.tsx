import * as type from '../constants/actionType';
import * as ConstVar from '../constants/constVariables';
import { Room, Message } from '../constants/globalInterface';

export const handleInitialBoard = () => ({
    type: type.USER_INITIAL_BOARD,
    payload: {}
});
const action = (type: string, payload: any) => ({ type, payload });

export const handleHostClick = (index: number) => {
    return (dispatch: any) => {
        dispatch(action(type.USER_HANDLE_CLICK, { index }));
        dispatch(action(type.USER_HANDLE_CHECK_WINNER_CHICKEN_DINNER, {}));
    };
};
export const handleGuestClick = (index: number) => {
    return (dispatch: any) => {
        dispatch(action(type.USER_HANDLE_CLICK, { index }));
        dispatch(action(type.USER_HANDLE_CHECK_WINNER_CHICKEN_DINNER, {}));
        dispatch(action(type.HANDLE_CHANGE_PLAYER_TURN, {}));
    };
};

export const handleBotMove = () => {
    return (dispatch: any) => {
        const index = ConstVar.BOT_INDEX;
        dispatch(action(type.USER_HANDLE_CLICK, { index }));
        dispatch(action(type.USER_HANDLE_CHECK_WINNER_CHICKEN_DINNER, {}));
        dispatch(action(type.HANDLE_CHANGE_PLAYER_TURN, {}));
    };
};

export const handleCheckWinnerChickenDinner = () => ({
    type: type.USER_HANDLE_CHECK_WINNER_CHICKEN_DINNER,
    payload: {}
});
export const handlePlayAgains = () => ({
    type: type.USER_HANDLE_PLAY_AGAINS,
    payload: {}
});
export const handleChangesetting = (timeLimit: number, undoMove: boolean) => ({
    type: type.USER_HANLDE_CHANGE_SETTING,
    payload: { timeLimit, undoMove }
});
export const handleTimeOut = () => ({
    type: type.USER_HANLDE_CHANGE_SETTING,
    payload: {}
});
export const handleResetTime = () => ({
    type: type.USER_HANDLE_RESET_TIME,
    payload: {}
});
export const handleCloseModal = () => ({
    type: type.USER_HANDLE_CLOSE_MODAL,
    payload: {}
});
export const handleListStepClick = (index: number, checkIndex: number) => ({
    type: type.USER_HANDLE_STEP_CLICK,
    payload: { index, checkIndex }
});
export const handleChangeAfterPlayerClick = () => ({
    type: type.USER_HANLDE_CHANGLE_AFTER_PLAYER_CLICK,
    payload: {}
});
export const handleChangeHistoryOrder = () => ({
    type: type.USER_HANDLE_CHANGE_HISTORY_ORDER,
    payload: {}
});
export const handleMouseOver = (index: number) => ({
    type: type.USER_HANDLE_MOUSE_OVER,
    payload: { index }
});
export const handleMouseLeaveSquare = () => ({
    type: type.USER_HANDLE_MOUSE_LEAVE,
    payload: {}
});
export const handleShowModal = (modalContext: string, mWinner: string) => ({
    type: type.USER_HANDLE_SHOW_MODAL,
    payload: { modalContext, mWinner }
});

// Information Action
export const countDown = () => ({
    type: type.COUNT_DOWN,
    payload: {}
});
export const handleTapChange = () => ({
    type: type.USER_HANDLE_TAP_CHANGE,
    payload: {}
});
export const handleAfterRestartTime = () => ({
    type: type.USER_HANDLE_AFTER_RESTART_TIME,
    payload: {}
});

export const handleDisableAfterPlayerClick = () => ({
    type: type.HANDLE_DISABLE_AFTER_USER_CLICK,
    payload: {}
});

export const handleUndoMove = () => ({
    type: type.HANDLE_UNDO_MOVE,
    payload: {}
});

export const handleRedoMove = () => ({
    type: type.HANDLE_REDO_MOVE,
    payload: {}
});

export const handleChangeGameMode = (gameMode: boolean) => ({
    type: type.HANDLE_CHANGLE_GAME_MODE,
    payload: { gameMode }
});

export const handleJoinRoom = (room: Room) => ({
    type: type.HANDLE_JOIN_ROOM,
    payload: { room }
});

export const handleChangeMessage = (value: string) => ({
    type: type.HANDLE_CHANGE_MESSAGE,
    payload: { value }
});

export const handleSendMessage = (value: Message) => ({
    type: type.HANDLE_SEND_MESSAGE,
    payload: { value }
});

export const handleChangePlayerTurn = () => ({
    type: type.HANDLE_CHANGE_PLAYER_TURN,
    payload: {}
});

export const handleStartGame = () => ({
    type: type.HANDLE_START_GAME,
    payload: {}
});
export const handleQuitGame = () => {
    return (dispatch: any) => {
        dispatch(action(type.USER_HANDLE_PLAY_AGAINS, {}));
        dispatch(action(type.HANDLE_QUIT_GAME, {}));
        dispatch(action(type.HANDLE_RESTART_INFO, {}));
    };
};

export const handleAskForTie = () => ({
    type: type.HANDLE_ASK_FOR_TIE,
    payload: {}
});

export const handleAskForUndo = () => ({
    type: type.HANDLE_ASK_FOR_UNDO,
    payload: {}
});
