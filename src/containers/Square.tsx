import React from 'react';
import { connect } from 'react-redux';
import { handleClick, handleMouseOver, handleMouseLeaveSquare, handleCheckWinnerChickenDinner } from '../actions/index';
import { ReducerType } from '../constants/globalInterface';

export interface SquaresProps {
    handleClick: Function;
    handleMouseOver: Function;
    handleMouseLeaveSquare: Function;
    handleCheckWinnerChickenDinner: Function;

    disable: boolean;
    index: number;
    value: string;
    isRed: boolean;
}

class Square extends React.Component<SquaresProps> {
    constructor(props: SquaresProps) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.handleMouseOverSquare = this.handleMouseOverSquare.bind(this);
        this.handleMouseLeaveSquare = this.handleMouseLeaveSquare.bind(this);
    }

    handleClick(): void {
        const { value, index, handleClick, handleCheckWinnerChickenDinner } = this.props;
        if (value !== '') {
            return;
        }
        handleClick(index);
        handleCheckWinnerChickenDinner();
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
        const { value, isRed, disable } = this.props;

        return (
            <div>
                <button
                    type="button"
                    className={`btn btn-outline-success ${isRed ? 'redSquare' : 'Square'} ${value === 'X' ? 'PlayerX' : ''} ${
                        value === 'O' ? 'PlayerO' : ''
                    }`}
                    onClick={this.handleClick}
                    disabled={disable}
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
    const { disable } = state.app;
    return { disable };
};

const mapDispatchToProps = {
    handleClick,
    handleMouseOver,
    handleMouseLeaveSquare,
    handleCheckWinnerChickenDinner
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Square);
