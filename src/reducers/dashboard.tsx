import * as type from '../constants/actionType';
import { DashBoard, ActionType } from '../constants/globalInterface';

const initialState: DashBoard = {
    isPlayWithBots: true,
    startGame: false
};

export default function dashboard(state = initialState, action: ActionType) {
    switch (action.type) {
        case type.HANDLE_CHANGE_SELECT: {
            const { value } = action.payload;
            if (value === '1') {
                return { ...state, isPlayWithBots: false };
            }
            return { ...state, isPlayWithBots: true };
        }
        case type.HANDLE_FINDING_MATCH: {
            const { gameMode, isPlayWithBots } = action.payload;
            if (isPlayWithBots) {
                
            }
        }
        default:
            return state;
    }
}
