import React, { useState, useEffect } from 'react';
import AnimalModal from './AnimalModal'
import './EmployeeHomePage.css'
import AdoptionProcessChart from './AdoptionProcessChart'

const EmployeeHomePage = () => {

    const [showModal, setShowModal] = useState(false);

    const setShowModalTrue = () => {
        setShowModal(true)
    }

    const setShowModalFalse = () => {
        setShowModal(false)
    }

    return (
        <div className="EmployeeHomePage">
            <button onClick={setShowModalTrue} className='newButton'>
                Add New Animal
            </button>
            <div>
                <AdoptionProcessChart></AdoptionProcessChart>
            </div>
            {
                showModal ? (
                    <AnimalModal showModal={showModal} closeModal={setShowModalFalse} appElement={document.getElementById('app')} />
                ) : (
                        <>
                        </>
                    )
            }
        </div >
    )
}

export default EmployeeHomePage;

