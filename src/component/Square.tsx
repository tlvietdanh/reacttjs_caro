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

interface MyState {
    componentValue: string;
}
class Square extends React.Component<MyProps, MyState> {
    constructor(props: MyProps) {
        super(props);

        this.state = {
            componentValue: ''
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleMouseOverSquare = this.handleMouseOverSquare.bind(this);
        this.handleMouseLeaveSquare = this.handleMouseLeaveSquare.bind(this);
    }

    handleClick(): void {
        if (this.props.value !== '') {
            return;
        }
        this.setState({}, () => {
            this.props.handleClick(this.props.index, this.props.whichPlayer ? 'X' : 'O');
        });
    }

    handleMouseOverSquare(): void {
        this.props.handleMouseOver(this.props.index);
    }

    handleMouseLeaveSquare(): void {
        this.props.handleMouseLeaveSquare();
    }

    render(): JSX.Element {
        return (
            <div>
                <button
                    type="button"
                    className={`btn btn-outline-success ${this.props.isRed ? 'redSquare' : 'Square'} ${this.props.value === 'X' ? 'PlayerX' : ''} ${
                        this.props.value === 'O' ? 'PlayerO' : ''
                    }`}
                    onClick={this.handleClick}
                    disabled={this.props.disable}
                    onMouseOver={this.handleMouseOverSquare}
                    onMouseLeave={this.handleMouseLeaveSquare}
                >
                    {this.props.value}
                </button>
            </div>
        );
    }
}

export default Square;
