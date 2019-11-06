import React from 'react';
import { connect } from 'react-redux';
import {
    handleHostClick,
    handleMouseOver,
    handleMouseLeaveSquare,
    handleCheckWinnerChickenDinner,
    handleDisableAfterPlayerClick,
    handleBotMove
} from '../actions/index';
import { ReducerType, Room } from '../constants/globalInterface';

export interface SquaresProps {
    handleHostClick: Function;
    handleMouseOver: Function;
    handleMouseLeaveSquare: Function;
    handleCheckWinnerChickenDinner: Function;
    handleDisableAfterPlayerClick: Function;
    handleBotMove: Function;

    myTurn: boolean;
    index: number;
    value: string;
    isRed: boolean;
    gameMode: boolean;
    indexOfBot: number;
    Room: Room;
    io: any;
    disable: boolean;
}

class Square extends React.Component<SquaresProps> {
    constructor(props: SquaresProps) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.handleMouseOverSquare = this.handleMouseOverSquare.bind(this);
        this.handleMouseLeaveSquare = this.handleMouseLeaveSquare.bind(this);
    }

    handleClick(): void {
        const { value, index, handleHostClick, gameMode, handleBotMove, io, Room } = this.props;
        if (value !== '') {
            return;
        }
        handleHostClick(index);
        if (gameMode) {
            handleBotMove();
        } else {
            io.emit('CLIENT_SEND_INDEX', { Room, index });
        }
    }

    handleMouseOverSquare(): void {
        const { handleMouseOver, index } = this.props;
        handleMouseOver(index);
    }

    handleMouseLeaveSquare(): void {
        const { handleMouseLeaveSquare } = this.props;
        handleMouseLeaveSquare();
    }

    render(): JSX.Element {
        const { value, isRed, myTurn, disable } = this.props;

        return (
            <div>
                <button
                    type="button"
                    className={`btn btn-outline-success ${isRed ? 'redSquare' : 'Square'} ${value === 'X' ? 'PlayerX' : ''} ${
                        value === 'O' ? 'PlayerO' : ''
                    }`}
                    onClick={this.handleClick}
                    disabled={!myTurn || disable}
                    onMouseOver={this.handleMouseOverSquare}
                    onMouseLeave={this.handleMouseLeaveSquare}
                    onFocus={this.handleMouseOverSquare}
                >
                    {value}
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state: ReducerType) => {
    const { myTurn, gameMode, indexOfBot, Room, disable } = state.app;
    return { myTurn, gameMode, indexOfBot, io: state.io, Room, disable };
};

const mapDispatchToProps = {
    handleHostClick,
    handleMouseOver,
    handleMouseLeaveSquare,
    handleCheckWinnerChickenDinner,
    handleDisableAfterPlayerClick,
    handleBotMove
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Square);
