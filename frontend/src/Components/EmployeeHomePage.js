import React, { useState, useEffect } from 'react';
import AnimalModal from './AnimalModal'
import './EmployeeHomePage.css'
import axios from 'axios'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import AnimalNode from './AnimalNode'

const EmployeeHomePage = () => {

    const [showModal, setShowModal] = useState(false);
    const [animals, setAnimals] = useState([]);

    const setShowModalTrue = () => {
        setShowModal(true)
    }

    const setShowModalFalse = () => {
        setShowModal(false)
    }

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    }
    function onDragEnd(result) {
        if (!result.destination) {
            return;
        }
        const items = reorder(
            animals,
            result.source.index,
            result.destination.index
        );

        setAnimals(items)
    }

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/animals/all_animals/')
            .then((response) => {
                console.log(response.data)
                setAnimals(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    return (
        <div className="EmployeeHomePage">

            <div>
                <button onClick={setShowModalTrue}>
                    Add New Animal
                </button>
                <div>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="allAnimals">
                            {(provided, snapshot) => (
                                <div {...provided.droppableProps} ref={provided.innerRef} className="dragColumn">
                                    {animals.map((item, index) => (
                                        <Draggable key={item.fields['shelter_id']} draggableId={item.fields['shelter_id']} index={index}>
                                            {(provided, snapshot) => (
                                                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                    <AnimalNode></AnimalNode>
                                                </div>
                                            )
                                            }
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
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

