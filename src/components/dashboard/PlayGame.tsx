/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import bot from '../../assets/bot.jpg';

interface MyProps {
    handleFindingMatch: Function;
    isFinding: boolean;
    gameMode: boolean;
    handleChangeGameMode: Function;
}

class PlayGame extends React.Component<MyProps> {
    constructor(props: MyProps) {
        super(props);

        this.handleFindingMatch = this.handleFindingMatch.bind(this);
        this.handleChangeGameMode = this.handleChangeGameMode.bind(this);
    }

    handleFindingMatch() {
        const { handleFindingMatch } = this.props;
        handleFindingMatch();
    }

    handleChangeGameMode(e: any) {
        const { handleChangeGameMode, isFinding } = this.props;
        if (isFinding) return;
        handleChangeGameMode(e.currentTarget.name === 'bot');
    }

    render() {
        const { isFinding, gameMode } = this.props;
        return (
            <div className="col-8 container main d-flex">
                <div className="row">Wellcome to TicTacToe</div>
                <div className="row hl mt-4" />
                <div className="row mt-4">
                    <button
                        type="button"
                        className={gameMode ? 'col card mode mr-1 clicked' : 'col card mode mr-1'}
                        data-toggle="tooltip"
                        data-placement="bottom"
                        data-html="true"
                        title="In this mode, you can undo move and no time limit"
                        name="bot"
                        onClick={this.handleChangeGameMode}
                    >
                        <img src={bot} className="card-img-top" alt="In this mode, you can undo move and no time limit" />
                        <div className="card-body">
                            <h5 className="card-title text-left">Play With Bot</h5>
                        </div>
                    </button>
                    <button
                        type="button"
                        className={!gameMode ? 'col card mode mr-1 clicked' : 'col card mode mr-1'}
                        data-toggle="tooltip"
                        data-placement="bottom"
                        data-html="true"
                        title="In this mode, you can't undo move and time limit for each step is 60s"
                        name="human"
                        onClick={this.handleChangeGameMode}
                    >
                        <img src={bot} className="card-img-top" alt="In this mode, you can't undo move and time limit for each step is 60s" />
                        <div className="card-body">
                            <h5 className="card-title text-left">Play With Human</h5>
                        </div>
                    </button>
                </div>
                <div className="mt-5 row findmatch ">
                    <button type="button" className={!isFinding ? 'btn btn-success' : 'btn btn-danger'} onClick={this.handleFindingMatch}>
                        {!isFinding ? 'FIND MATCH' : 'CANCEL FINDING'}
                    </button>
                </div>
            </div>
        );
    }
}

export default PlayGame;
