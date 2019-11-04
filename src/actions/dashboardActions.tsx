/* eslint-disable @typescript-eslint/no-explicit-any */
import * as type from '../constants/actionType';

const action = (type: string, payload: any) => ({ type, payload });

export const handleChangeSelect = (value: string) => ({
    type: type.HANDLE_CHANGE_SELECT,
    payload: { value }
});

export const handleFindingMatch = (gameMode: boolean, isPlayWithBots: boolean) => {
    return (dispatch: any) => {
        dispatch(action(type.HANDLE_FINDING_MATCH, { gameMode, isPlayWithBots }));
    };
};

export default action;
