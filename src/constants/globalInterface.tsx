export interface MySquare {
    index: number;
    value: string;
    isRed: boolean;
}

export interface History {
    index: number;
    name: string;
    squares: MySquare[];
}

export interface ActionType {
    type: string;
    payload: any;
}
export interface AppRedu {
    appState: AppState;
}
export interface AppState {
    squares: MySquare[];
    whichPlayer: boolean;
    lastStep: MySquare[];
    disable: boolean;
    isPlayerClick: boolean;
    modalContext: string;
    mWinner: string;
    showModal: boolean;
    steps: History[];
    checkIndex: number;
    stepOrder: boolean;
    isRunningTime: boolean;
    numberIndex: number;
    charIndex: string;
}

// *-------------- Modal --------------*
export interface InfoState {
    seconds: number;
    minutes: number;
    hours: number;
    isInfo: boolean;
    isclear: boolean;
    timeLimit: number;
    undoMove: boolean;
    isRestartTime: boolean;
}

// *-------------- Modal --------------*

export interface ReducerType {
    app: AppState;
    infoReducer: InfoState;
    loginReducer: Login;
}

export interface Login {
    id: string;
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    isLogin: boolean;
    token: string;
    isLoginFalse: boolean;
    isRegisterFalse: boolean;
}

export interface RegisterInfo {
    username: string;
    firstname: string;
    lastname: string;
    password: string;
}
