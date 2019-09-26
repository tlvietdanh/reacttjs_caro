import React from 'react';
import X from '../assets/x.png';
import O from '../assets/o.png';

interface MyProps {
    context: string;
    mWinner: string;
    handlePlayAgains: Function;
    showModal: boolean;
    handleCloseModal: Function;
}

class Modal extends React.Component<MyProps> {
    constructor(props: MyProps) {
        super(props);

        this.handlePlayAgains = this.handlePlayAgains.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handlePlayAgains(): void {
        const { handlePlayAgains } = this.props;
        handlePlayAgains();
    }

    handleCloseModal(): void {
        const { handleCloseModal } = this.props;
        handleCloseModal();
    }

    render(): JSX.Element {
        const { mWinner, showModal, context } = this.props;
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
                                <div className="text-center">{context}</div>
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
export default Modal;
