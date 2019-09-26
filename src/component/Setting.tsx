import React from 'react';

interface MyProps {
    timeLimit: number;
    undoMove: boolean;
    handleChangeSetting: Function;
    handleRestart: Function;
}

interface MyState {
    timeLimit: number;
    undoMove: boolean;
}

class Setting extends React.Component<MyProps, MyState> {
    constructor(props: MyProps) {
        super(props);

        this.state = {
            timeLimit: this.props.timeLimit,
            undoMove: this.props.undoMove
        };

        this.handleChangeLimit = this.handleChangeLimit.bind(this);
        this.handleChangeUndoMove = this.handleChangeUndoMove.bind(this);
        this.handleSaveSetting = this.handleSaveSetting.bind(this);
        this.handleRestart = this.handleRestart.bind(this);
    }

    handleChangeLimit(e: React.FormEvent<HTMLInputElement>): void {
        const min = isNaN(Number(e.currentTarget.value)) ? 0 : parseInt(e.currentTarget.value);
        this.setState({ timeLimit: min });
    }

    handleChangeUndoMove(e: React.FormEvent<HTMLInputElement>): void {
        this.setState({ undoMove: e.currentTarget.value === '1' });
    }

    handleSaveSetting(): void {
        this.props.handleChangeSetting(this.state.timeLimit, this.state.undoMove);
    }

    handleRestart(): void {
        this.props.handleRestart();
    }

    render(): JSX.Element {
        return (
            <div className="card-body">
                <div className="text-left">
                    <h5 className="mText">Time Limit:</h5>
                </div>
                <div className="text-left">
                    <input
                        className="input ml-5"
                        type="radio"
                        name="limit"
                        value="none"
                        onChange={this.handleChangeLimit}
                        checked={this.state.timeLimit === 0}
                    />
                    <span className="ml-4">None</span>
                </div>
                <div className="text-left">
                    <input
                        className="input ml-5"
                        type="radio"
                        name="limit"
                        value="5"
                        onChange={this.handleChangeLimit}
                        checked={this.state.timeLimit === 5}
                    />
                    <span className="ml-4">5 mins</span>
                </div>
                <div className="text-left">
                    <input
                        className="input ml-5"
                        type="radio"
                        name="limit"
                        value="15"
                        onChange={this.handleChangeLimit}
                        checked={this.state.timeLimit === 15}
                    />
                    <span className="ml-4">15 mins</span>
                </div>
                <div className="text-left">
                    <input
                        className="input ml-5"
                        type="radio"
                        name="limit"
                        value="30"
                        onChange={this.handleChangeLimit}
                        checked={this.state.timeLimit === 30}
                    />
                    <span className="ml-4">30 mins</span>
                </div>

                <div className="text-left">
                    <h5 className="mText">Undo Move: </h5>
                </div>
                <div className="text-left">
                    <input
                        className="input ml-5"
                        type="radio"
                        name="player"
                        value="1"
                        onChange={this.handleChangeUndoMove}
                        checked={this.state.undoMove}
                    />
                    <span className="ml-4">On</span>
                </div>
                <div className="text-left">
                    <input
                        className="input ml-5"
                        type="radio"
                        name="player"
                        value="2"
                        onChange={this.handleChangeUndoMove}
                        checked={!this.state.undoMove}
                    />
                    <span className="ml-4">Off</span>
                </div>
                <div className="text-center mt-5">
                    <button className="btn btn-outline-success" style={{ width: '200px' }} onClick={this.handleSaveSetting}>
                        Save
                    </button>
                    <button className="btn btn-outline-success mt-3" style={{ width: '200px' }} onClick={this.handleRestart}>
                        Restart
                    </button>
                </div>
            </div>
        );
    }
}

export default Setting;
