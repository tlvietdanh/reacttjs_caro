/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import bot from '../../assets/bot.jpg';

interface MyProps {
    handleFindingMatch: Function;
    isFinding: boolean;
}

interface MyState {
    isPlayWithBots: boolean;
    gameMode: boolean;
}

class PlayGame extends React.Component<MyProps, MyState> {
    constructor(props: MyProps) {
        super(props);

        this.state = {
            isPlayWithBots: true,
            gameMode: true
        };

        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.handleFindingMatch = this.handleFindingMatch.bind(this);
        this.handleChangeGameMode = this.handleChangeGameMode.bind(this);
    }

    handleChangeSelect(e: any) {
        this.setState({
            isPlayWithBots: !(e.currentTarget.value === '1')
        });
    }

    handleFindingMatch() {
        const { handleFindingMatch } = this.props;
        const { gameMode, isPlayWithBots } = this.state;
        handleFindingMatch(gameMode, isPlayWithBots);
    }

    handleChangeGameMode(e: any) {
        this.setState({
            gameMode: e.currentTarget.name === 'normal'
        });
    }

    render() {
        const { isFinding } = this.props;
        const { isPlayWithBots, gameMode } = this.state;
        return (
            <div className="col-8 container main d-flex">
                <div className="row">
                    <select className="custom-select mSelect" onChange={this.handleChangeSelect} defaultValue={isPlayWithBots ? '2' : '1'}>
                        <option value="1">Play with peoples</option>
                        <option value="2">Play with bots</option>
                    </select>
                </div>
                <div className="row hl mt-4" />
                <div className="row mt-4">
                    <button
                        type="button"
                        className={gameMode ? 'col card mode mr-1 clicked' : 'col card mode mr-1'}
                        data-toggle="tooltip"
                        data-placement="bottom"
                        data-html="true"
                        title="In this mode, you can undo move and no time limit"
                        name="normal"
                        onClick={this.handleChangeGameMode}
                    >
                        <img src={bot} className="card-img-top" alt="In this mode, you can undo move and no time limit" />
                        <div className="card-body">
                            <h5 className="card-title text-left">Normal</h5>
                        </div>
                    </button>
                    <button
                        type="button"
                        className={!gameMode ? 'col card mode mr-1 clicked' : 'col card mode mr-1'}
                        data-toggle="tooltip"
                        data-placement="bottom"
                        data-html="true"
                        title="In this mode, you can't undo move and time limit for each step is 60s"
                        name="competitive"
                        onClick={this.handleChangeGameMode}
                    >
                        <img src={bot} className="card-img-top" alt="In this mode, you can't undo move and time limit for each step is 60s" />
                        <div className="card-body">
                            <h5 className="card-title text-left">Competitive</h5>
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
