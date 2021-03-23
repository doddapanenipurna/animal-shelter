import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import AnimalNode from './AnimalNode';
import './AdoptionProcessChart.css';
import axios from 'axios';


const AdoptionProcessChart = ({ setShowModal, setCurrAnimalId }) => {

    var dict = Object();

    const [intake, setIntake] = useState([]);
    const [medical, setMedical] = useState([])
    const [listings, setListings] = useState([])
    const [other, setOther] = useState([])

    dict['intake'] = [intake, setIntake]
    dict['medical'] = [medical, setMedical]
    dict['listings'] = [listings, setListings]
    dict['other'] = [other, setOther]

    const onDragEnd = (result) => {
        const { source, destination } = result
        if (!result.destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                dict[source.droppableId][0],
                result.source.index,
                result.destination.index
            );

            dict[source.droppableId][1](items)
        } else {
            console.log("Howdy", source.index, destination.index)
            move(
                dict[source.droppableId],
                dict[destination.droppableId],
                source.index,
                destination.index,
                source.droppableId,
                destination.droppableId,
            )
        }
    }

    useEffect(() => {
        const categories = ['intake', 'medical', 'listings', 'other']
        categories.forEach(input => {
            axios.post('http://127.0.0.1:8000/animals/all_animals/', { input })
                .then((response) => {
                    dict[input][1](response.data)
                })
                .catch((error) => {
                    console.error(error)
                })
        })
    }, [])

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    }

    const move = (source, destination, droppableSource, droppableDestination, sourceCategory, destCategory) => {

        const sourceClone = [...source[0]]
        const destClone = [...destination[0]]

        const [removed] = sourceClone.splice(droppableSource, 1)
        destClone.splice(droppableDestination, 0, removed)

        axios.post('http://127.0.0.1:8000/animals/update/' + removed.fields['shelter_id'] + '/', { 'sourceCategory': sourceCategory, 'destinationCategory': destCategory })
            .then((response) => {
            })
        source[1](sourceClone)
        destination[1](destClone)
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="chart">
                <div className="columnWrapper">
                    <h2 className="columnHeader">Intake</h2>
                    <Droppable droppableId="intake">
                        {(provided, snapshot) => (
                            <div {...provided.droppableProps} ref={provided.innerRef} className="droppableColumn">
                                {intake.map((item, index) => (
                                    <Draggable key={item.fields['shelter_id']} draggableId={item.fields['shelter_id']} index={index}>
                                        {(provided, snapshot) => (
                                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                <AnimalNode animal={item} setShowModalTrue={setShowModal} animalId={setCurrAnimalId}></AnimalNode>
                                            </div>
                                        )
                                        }
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
                <div className="columnWrapper">
                    <h2 className="columnHeader">Medical</h2>
                    <Droppable droppableId="medical">
                        {(provided, snapshot) => (
                            <div {...provided.droppableProps} ref={provided.innerRef} className="droppableColumn">
                                {medical.map((item, index) => (
                                    <Draggable key={item.fields['shelter_id']} draggableId={item.fields['shelter_id']} index={index}>
                                        {(provided, snapshot) => (
                                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                <AnimalNode animal={item} setShowModalTrue={setShowModal} animalId={setCurrAnimalId}></AnimalNode>
                                            </div>
                                        )
                                        }
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
                <div className="columnWrapper">
                    <h2 className="columnHeader">Listings</h2>
                    <Droppable droppableId="listings">
                        {(provided, snapshot) => (
                            <div {...provided.droppableProps} ref={provided.innerRef} className="droppableColumn">
                                {listings.map((item, index) => (
                                    <Draggable key={item.fields['shelter_id']} draggableId={item.fields['shelter_id']} index={index}>
                                        {(provided, snapshot) => (
                                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                <AnimalNode animal={item} setShowModalTrue={setShowModal} animalId={setCurrAnimalId}></AnimalNode>
                                            </div>
                                        )
                                        }
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
                <div className="columnWrapper">
                    <h2 className="columnHeader">Other</h2>
                    <Droppable droppableId="other">
                        {(provided, snapshot) => (
                            <div {...provided.droppableProps} ref={provided.innerRef} className="droppableColumn">
                                {other.map((item, index) => (
                                    <Draggable key={item.fields['shelter_id']} draggableId={item.fields['shelter_id']} index={index}>
                                        {(provided, snapshot) => (
                                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                <AnimalNode animal={item} setShowModalTrue={setShowModal} animalId={setCurrAnimalId}></AnimalNode>
                                            </div>
                                        )
                                        }
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            </div>
        </DragDropContext>
    )
}

export default AdoptionProcessChart;