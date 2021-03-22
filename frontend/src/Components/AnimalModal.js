import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './AnimalModal.css';
import ColoredLine from './ColoredLine';
import axios from 'axios';
import moment from 'moment'

const AnimalModal = ({ showModal, closeModal, animalId }) => {

    //Due to the render order in the Document, we need to attach this element to the HTML body
    // see https://github.com/reactjs/react-modal/issues/133
    Modal.setAppElement('body');

    const [formState, setFormState] = useState({
        intakeDate: moment().format("YYYY-MM-DDTkk:mm"),
        intakeType: "",
        intakeEmployee: "",
        animalName: "",
        animalBreed: "",
        animalGender: "",
        animalAge: "",
        animalWeight: "",
        animalId: "",
        animalNeuSpay: "",
        medicalNotes: "",
        otherNotes: "",
    })

    useEffect(() => {
        if (!animalId) {
            axios.get('http://127.0.0.1:8000/animals/generateid/')
                .then((response) => {
                    setFormState({
                        ...formState,
                        animalId: response.data
                    })
                })
                .catch((error) => {
                    console.error(error)
                })
        } else {
            axios.get('http://127.0.0.1:8000/animals/animal/' + animalId)
                .then((response) => {
                    var data = response.data[0].fields
                    console.log(data)
                    setFormState({
                        ...formState,
                        intakeDate: moment(data['intake_date']).format("YYYY-MM-DDTkk:mm"),
                        intakeType: data['intake_type'],
                        intakeEmployee: data['intake_employee'],
                        animalName: data['name'],
                        animalBreed: data['breed'],
                        animalGender: data['gender'],
                        animalAge: data['age'],
                        animalWeight: data['weight'] || 0,
                        animalId: animalId,
                        animalNeuSpay: data['neutered_or_spayed'],
                        medicalNotes: data['medical_notes'],
                        otherNotes: data['other_notes'],
                    })
                })
        }
    }, [])

    function post() {
        if (!animalId) {
            axios.post(`http://127.0.0.1:8000/animals/add/`, { formState })
                .catch((error) => {
                    console.error(error)
                })
        } else {
            axios.post(`http://127.0.0.1:8000/animals/update_all/` + animalId + '/', { formState })
                .catch((error) => {
                    console.error(error)
                })
        }
    }

    function handleChange(e) {
        const value = e.target.value
        setFormState({
            ...formState,
            [e.target.name]: value
        })
        console.log(formState)
    }

    return (

        <Modal isOpen={showModal ? true : false} isClosed={!showModal ? true : false} className="Modal">
            <div className="headerContainer">
                <div className="buttonsHeader">
                    <button type="submit" onClick={closeModal} className="closeButton">X</button>
                </div>
                <div className="header">
                    <h1>Animal Intake Form</h1>
                </div>
            </div>
            <div className="content">
                <form onSubmit={post} id="animalForm">
                    <div>
                        <h2>Intake</h2>
                        <ColoredLine color="lightgray" className="content" onChange={handleChange}></ColoredLine>
                    </div>
                    <ul className="wrapper">
                        <li className="form-row">
                            <label>Intake Date</label>
                            <input
                                type="datetime-local"
                                name="intakeDate"
                                value={formState.intakeDate}
                                onChange={handleChange} />
                        </li>
                        <li className="form-row">
                            <label>Intake type</label>
                            <input
                                type="text"
                                name="intakeType"
                                value={formState.intakeType}
                                onChange={handleChange} />
                        </li>
                        <li className="form-row">
                            <label>Receiving Employee</label>
                            <input
                                type="text"
                                name="intakeEmployee"
                                value={formState.intakeEmployee}
                                onChange={handleChange}
                            />
                        </li>
                    </ul>
                    <div>
                        <h2>Animal Information</h2>
                        <ColoredLine color="lightgray" className="content" onChange={handleChange}></ColoredLine>
                    </div>
                    <ul className="wrapper">
                        <li className="form-row">
                            <label>Animal ID</label>
                            <input
                                type="text"
                                name="animalId"
                                value={formState.animalId}
                                onChange={handleChange}
                            />
                        </li>
                        <li className="form-row">
                            <label>Animal's Name</label>
                            <input
                                type="text"
                                name="animalName"
                                value={formState.animalName}
                                onChange={handleChange} />
                        </li>
                        <li className="form-row">
                            <label>Breed</label>
                            <input
                                type="text"
                                name="animalBreed"
                                value={formState.animalBreed}
                                onChange={handleChange} />
                        </li>
                        <li className="form-row">
                            <label>Gender</label>
                            <input
                                type="text"
                                name="animalGender"
                                value={formState.animalGender}
                                onChange={handleChange}
                            />
                        </li>
                        <li className="form-row">
                            <label>Age</label>
                            <input
                                type="number"
                                name="animalAge"
                                value={formState.animalAge}
                                onChange={handleChange}
                            />
                        </li>
                        <li className="form-row">
                            <label>Weight (lbs)</label>
                            <input
                                type="number"
                                name="animalWeight"
                                value={formState.animalWeight}
                                onChange={handleChange}
                            />
                        </li>
                    </ul>
                    <div>
                        <h2>Medical</h2>
                        <ColoredLine color="lightgray" className="content" onChange={handleChange}></ColoredLine>
                    </div>
                    <ul className="wrapper">
                        <li className="form-row">
                            <label>Medical Notes</label>
                            <textarea name="medicalNotes" form="animalForm" value={formState.medicalNotes} onChange={handleChange}></textarea>
                        </li>
                    </ul>
                    <div>
                        <h2>Other</h2>
                        <ColoredLine color="lightgray" className="content"></ColoredLine>
                    </div>
                    <ul className="wrapper">
                        <li className="form-row">
                            <label>Other Notes</label>
                            <textarea name="otherNotes" form="animalForm" value={formState.otherNotes} onChange={handleChange}></textarea>
                        </li>
                    </ul>
                    <div className="bottomButtons">
                        <div className="submitButtonWrapper">
                            <button type="submit" className="deleteButton" form="animalForm">Delete</button>
                        </div>
                        <div className="submitButtonWrapper">
                            <button type="submit" className="submitButton" form="animalForm">Submit</button>
                        </div>
                    </div>
                </form>
            </div>

        </Modal>
    )
}

export default AnimalModal;