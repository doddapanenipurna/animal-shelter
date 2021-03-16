import React, { useState } from 'react';
import NewAnimalModal from './NewAnimalModal'

const EmployeeHomePage = () => {

    const [showModal, setShowModal] = useState(false)

    const setShowModalTrue = () => {
        setShowModal(true)
    }

    const setShowModalFalse = () => {
        setShowModal(false)
    }

    return (
        <div>
            <button onClick={setShowModalTrue}>
                Add New Animal
            </button>
            {
                showModal ? (
                    <NewAnimalModal showModal={showModal} closeModal={setShowModalFalse} appElement={document.getElementById('app')} />
                ) : (
                        <>
                        </>
                    )
            }
        </div>
    )
}

export default EmployeeHomePage;

