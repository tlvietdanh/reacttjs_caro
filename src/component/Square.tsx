import React from 'react';

interface MyProps {
    handleClick: Function;
    index: number;
    value: string;
    whichPlayer: boolean;
    disable: boolean;
    isRed: boolean;
    handleMouseOver: Function;
    handleMouseLeaveSquare: Function;
}

class Square extends React.Component<MyProps> {
    constructor(props: MyProps) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.handleMouseOverSquare = this.handleMouseOverSquare.bind(this);
        this.handleMouseLeaveSquare = this.handleMouseLeaveSquare.bind(this);
    }

    handleClick(): void {
        const { value, index, whichPlayer, handleClick } = this.props;
        if (value !== '') {
            return;
        }
        this.setState({}, () => {
            handleClick(index, whichPlayer ? 'X' : 'O');
        });
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

export default Square;
