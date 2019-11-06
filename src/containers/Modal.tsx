import React from 'react';
import { connect } from 'react-redux';
import X from '../assets/x.png';
import O from '../assets/o.png';
import { ReducerType, Room } from '../constants/globalInterface';
import {
    handleCloseModal,
    handlePlayAgains,
    handleResetTime,
    handleQuitGame,
    handleAskForTie,
    handleAskForUndo,
    handleShowModal,
    handleUndoMove
} from '../actions/index';

interface ModalProps {
    modalContext: string;
    mWinner: string;
    showModal: boolean;
    gameMode: boolean;
    handleCloseModal: Function;
    handlePlayAgains: Function;
    handleResetTime: Function;
    handleQuitGame: Function;
    handleAskForTie: Function;
    handleAskForUndo: Function;
    Room: Room;
    io: any;
    startGame: boolean;
    askTie: boolean;
    askUndo: boolean;
    handleShowModal: Function;
    handleUndoMove: Function;
}

class Modal extends React.Component<ModalProps> {
    constructor(props: ModalProps) {
        super(props);
        this.handlePlayAgains = this.handlePlayAgains.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleQuit = this.handleQuit.bind(this);
        this.handleAccept = this.handleAccept.bind(this);
        this.handleReject = this.handleReject.bind(this);
    }

    handlePlayAgains(): void {
        const { handlePlayAgains, handleResetTime } = this.props;
        handlePlayAgains();
        handleResetTime();
    }

    handleCloseModal(): void {
        const { handleCloseModal } = this.props;
        handleCloseModal();
    }

    handleQuit() {
        const { gameMode, handleQuitGame, io, Room, startGame } = this.props;
        if (!gameMode && !startGame) {
            io.emit('CLIENT_PLAYER_QUIT_GAME', Room);
            handleQuitGame();
        }
        handleQuitGame();
    }

    handleAccept() {
        const { io, Room, handleCloseModal, askTie, askUndo, handleAskForUndo, handleShowModal, handleUndoMove } = this.props;
        if (askTie) {
            io.emit('CLIENT_ACCEPT_TIE', Room);
            handleCloseModal();
            handleShowModal('The game is ended in tie', '');
        }
        if (askUndo) {
            io.emit('CLIENT_ACCEPT_UNDO', Room);
            handleAskForUndo();
            handleUndoMove();
            handleCloseModal();
        }
    }

    handleReject() {
        const { io, Room, handleCloseModal } = this.props;
        io.emit('CLIENT_REJECT', Room);
        handleCloseModal();
    }

    render(): JSX.Element {
        const { mWinner, showModal, modalContext, gameMode } = this.props;
        let pic = '';
        if (mWinner === 'X') pic = X;
        else if (mWinner === 'O') pic = O;

        const quitBtn = (
            <button type="button" className="btn btn-success" data-dismiss="modal" onClick={this.handleQuit}>
                Quit
            </button>
        );
        const acceptBtn = (
            <button type="button" className="btn btn-success" data-dismiss="modal" onClick={this.handleAccept}>
                Accept
            </button>
        );
        const rejecttBtn = (
            <button type="button" className="btn btn-danger ml-2" data-dismiss="modal" onClick={this.handleReject}>
                Reject
            </button>
        );
        const playBtn = (
            <button type="button" className="btn btn-success" data-dismiss="modal" onClick={this.handlePlayAgains}>
                Play Agains
            </button>
        );

        return (
            <div
                className={`modal fade ${showModal ? 'show' : ''}`}
                id="exampleModalCenter"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
                style={{ display: `${showModal ? 'block' : 'none'}` }}
            >
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title" id="exampleModalLongTitle">
                                Result
                            </h3>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.handleCloseModal}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="container">
                                <div className="text-center">{modalContext}</div>
                                <img className="img-fluid" src={pic} alt="" />
                                {mWinner === 'ask' && acceptBtn}
                                {mWinner === 'ask' && rejecttBtn}
                                {mWinner !== 'ask' && !gameMode && quitBtn}
                                {mWinner !== 'ask' && gameMode && playBtn}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: ReducerType) => {
    const { modalContext, mWinner, showModal, gameMode, Room } = state.app;
    return {
        modalContext,
        mWinner,
        showModal,
        gameMode,
        io: state.io,
        Room,
        startGame: state.dashboard.startGame,
        askTie: state.app.askTie,
        askUndo: state.app.askUndo
    };
};

const mapDispatchToProps = {
    handleCloseModal,
    handlePlayAgains,
    handleResetTime,
    handleQuitGame,
    handleAskForTie,
    handleAskForUndo,
    handleShowModal,
    handleUndoMove
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Modal);
