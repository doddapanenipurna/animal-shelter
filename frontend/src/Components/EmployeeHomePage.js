import React, { useState } from 'react';
import AnimalModal from './AnimalModal'
import './EmployeeHomePage.css'

const EmployeeHomePage = () => {

    const [showModal, setShowModal] = useState(false)

    const setShowModalTrue = () => {
        setShowModal(true)
    }

    const setShowModalFalse = () => {
        setShowModal(false)
    }

    return (
        <div className="EmployeeHomePage">
            <button onClick={setShowModalTrue}>
                Add New Animal
            </button>
            {
                showModal ? (
                    <AnimalModal showModal={showModal} closeModal={setShowModalFalse} appElement={document.getElementById('app')} />
                ) : (
                        <>
                        </>
                    )
            }
        </div>
    )
}

export default EmployeeHomePage;

