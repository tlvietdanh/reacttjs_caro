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
        this.props.handlePlayAgains();
    }

    handleCloseModal(): void {
        this.props.handleCloseModal();
    }

    render(): JSX.Element {
        let pic = '';
        if (this.props.mWinner === 'X') pic = X;
        else if (this.props.mWinner === 'O') pic = O;
        return (
            <div
                className={`modal fade ${this.props.showModal ? 'show' : ''}`}
                id="exampleModalCenter"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
                style={{ display: `${this.props.showModal ? 'block' : 'none'}` }}
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
                                <div className="text-center">{this.props.context}</div>
                                <img className="img-fluid" src={pic} alt=""></img>
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
