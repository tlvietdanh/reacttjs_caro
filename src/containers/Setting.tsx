import React from 'react';
import { connect } from 'react-redux';
import { handleChangesetting, handlePlayAgains } from '../actions/index';
import { ReducerType } from '../constants/globalInterface';

interface SettingProps {
    timeLimit: number;
    undoMove: boolean;
    handleChangesetting: Function;
    handlePlayAgains: Function;
}

interface MyState {
    timeLimit: number;
    undoMove: boolean;
}

class Setting extends React.Component<SettingProps, MyState> {
    constructor(props: SettingProps) {
        super(props);

        this.state = {
            timeLimit: props.timeLimit,
            undoMove: props.undoMove
        };

        this.handleChangeLimit = this.handleChangeLimit.bind(this);
        this.handleChangeUndoMove = this.handleChangeUndoMove.bind(this);
        this.handleSaveSetting = this.handleSaveSetting.bind(this);
        this.handleRestart = this.handleRestart.bind(this);
    }

    handleChangeLimit(e: React.FormEvent<HTMLInputElement>): void {
        const min = Number.isNaN(Number(e.currentTarget.value)) ? 0 : parseInt(e.currentTarget.value, 10);
        this.setState({ timeLimit: min });
    }

    handleChangeUndoMove(e: React.FormEvent<HTMLInputElement>): void {
        this.setState({ undoMove: e.currentTarget.value === '1' });
    }

    handleSaveSetting(): void {
        const { handleChangesetting } = this.props;
        const { timeLimit, undoMove } = this.state;
        handleChangesetting(timeLimit, undoMove);
    }

    handleRestart(): void {
        const { handlePlayAgains } = this.props;
        handlePlayAgains();
    }

    render(): JSX.Element {
        const { timeLimit, undoMove } = this.state;

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
                        checked={timeLimit === 0}
                    />
                    <span className="ml-4">None</span>
                </div>
                <div className="text-left">
                    <input className="input ml-5" type="radio" name="limit" value="5" onChange={this.handleChangeLimit} checked={timeLimit === 5} />
                    <span className="ml-4">5 mins</span>
                </div>
                <div className="text-left">
                    <input className="input ml-5" type="radio" name="limit" value="15" onChange={this.handleChangeLimit} checked={timeLimit === 15} />
                    <span className="ml-4">15 mins</span>
                </div>
                <div className="text-left">
                    <input className="input ml-5" type="radio" name="limit" value="30" onChange={this.handleChangeLimit} checked={timeLimit === 30} />
                    <span className="ml-4">30 mins</span>
                </div>

                <div className="text-left">
                    <h5 className="mText">Undo Move: </h5>
                </div>
                <div className="text-left">
                    <input className="input ml-5" type="radio" name="player" value="1" onChange={this.handleChangeUndoMove} checked={undoMove} />
                    <span className="ml-4">On</span>
                </div>
                <div className="text-left">
                    <input className="input ml-5" type="radio" name="player" value="2" onChange={this.handleChangeUndoMove} checked={!undoMove} />
                    <span className="ml-4">Off</span>
                </div>
                <div className="text-center mt-5">
                    <button className="btn btn-outline-success" style={{ width: '200px' }} onClick={this.handleSaveSetting} type="button">
                        Save
                    </button>
                    <button className="btn btn-outline-success mt-3" style={{ width: '200px' }} onClick={this.handleRestart} type="button">
                        Restart
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: ReducerType) => {
    const { timeLimit, undoMove } = state.infoReducer;
    return {
        timeLimit,
        undoMove
    };
};

const mapDispatchToProps = {
    handleChangesetting,
    handlePlayAgains
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Setting);
