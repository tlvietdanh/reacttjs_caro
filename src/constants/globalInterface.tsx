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

export interface Room {
    id: string;
    host: string;
    guest: string;
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
    myTurn: boolean;
    botIndex: number;
    undoIndex: number;
    gameMode: boolean;
    indexOfBot: number;
    Room: Room;
    askTie: boolean;
    askUndo: boolean;
}

export interface Message {
    name: string;
    value: string;
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
    listMessages: Message[];
    myMessage: string;
}

// *-------------- Modal --------------*

export interface ReducerType {
    app: AppState;
    infoReducer: InfoState;
    loginReducer: Login;
    dashboard: DashBoard;
    io: any;
}

export interface Login {
    id: string;
    username: string;
    password: string;
    fullname: string;
    email: string;
    avatar: string;
    isLogin: boolean;
    token: string;
    isLoginFalse: boolean;
    isRegisterSuccess: boolean;
    loading: boolean;
    checkLogin: boolean;
    status: string;
    isFacebook: boolean;
}

export interface RegisterInfo {
    username: string;
    firstname: string;
    lastname: string;
    password: string;
}

export interface DashBoard {
    isPlayWithBots: boolean;
    startGame: boolean;
}
