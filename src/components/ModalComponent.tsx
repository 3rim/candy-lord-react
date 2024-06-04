import React from 'react';
import Player from '../classes/Player';

interface ModalProps {
    player: Player
    title: string;
    children: React.ReactNode;
    show: boolean;
    handleClose: () => void;
}

function Modal ({ title, children, show, handleClose }: ModalProps){
    return (
        <>
        <div className={`modal ${show ? 'd-block' : 'd-none'}`} tabIndex={-1}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button type="button" className="btn-close" onClick={handleClose}></button>
                    </div>
                    <div className="modal-body">
                        {children}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Modal;
