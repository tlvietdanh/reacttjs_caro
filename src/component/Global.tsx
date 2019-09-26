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
