import * as type from '../constants/actionType';

export const handleInitialBoard = () => ({
    type: type.USER_INITIAL_BOARD,
    payload: {}
});

export const handleClick = (index: number) => ({
    type: type.USER_HANDLE_CLICK,
    payload: { index }
});
export const handleCheckWinnerChickenDinner = () => ({
    type: type.USER_HANDLE_CHECK_WINNER_CHICKEN_DINNER,
    payload: { }
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
