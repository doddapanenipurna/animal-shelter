import React from 'react';
import Modal from 'react-modal';

const NewAnimalModal = ({showModal, closeModal}) => {

    //Due to the render order in the Document, we need to attach this element to the HTML body
    // see https://github.com/reactjs/react-modal/issues/133
    Modal.setAppElement('body');

    return (
        <Modal isOpen={showModal ? true : false}
            isClosed={!showModal ? true : false}
        >
            <button onClick={closeModal}>
                X
            </button>
            <p> Howdy</p>
        </Modal>
    )
}

export default NewAnimalModal;