import React from 'react';
import { connect } from 'react-redux';
import X from '../assets/x.png';
import O from '../assets/o.png';
import { ReducerType } from '../constants/globalInterface';
import { handleCloseModal, handlePlayAgains, handleResetTime } from '../actions/index';

interface ModalProps {
    modalContext: string;
    mWinner: string;
    showModal: boolean;
    handleCloseModal: Function;
    handlePlayAgains: Function;
    handleResetTime: Function;
}

class Modal extends React.Component<ModalProps> {
    constructor(props: ModalProps) {
        super(props);
        this.handlePlayAgains = this.handlePlayAgains.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
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

    render(): JSX.Element {
        const { mWinner, showModal, modalContext } = this.props;
        let pic = '';
        if (mWinner === 'X') pic = X;
        else if (mWinner === 'O') pic = O;
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
                                <button type="button" className="btn btn-success" data-dismiss="modal" onClick={this.handlePlayAgains}>
                                    Play Agains
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: ReducerType) => {
    const { modalContext, mWinner, showModal } = state.app;
    return {
        modalContext,
        mWinner,
        showModal
    };
};

const mapDispatchToProps = {
    handleCloseModal,
    handlePlayAgains,
    handleResetTime
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Modal);
