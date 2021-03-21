import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import AnimalNode from './AnimalNode';
import './AdoptionProcessChart.css';
import axios from 'axios';


const AdoptionProcessChart = () => {

    var dict = new Object();

    const [intake, setIntake] = useState([]);
    const [medical, setMedical] = useState([])

    dict['intake'] = [intake,setIntake]
    dict['medical'] = [medical,setMedical]

    const onDragEnd = (result) => { 
        const {source, destination} = result
        if (!result.destination) {
            return;
        }

        if(source.droppableId === destination.droppableId){
            const items = reorder(
                dict[source.droppableId][0],
                result.source.index,
                result.destination.index
            );

            dict[source.droppableId][1](items)
        } else {
            console.log("Howdy",source.index,destination.index)
            move(
                dict[source.droppableId],
                dict[destination.droppableId],
                source.index,
                destination.index
            )
        }
    }

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/animals/all_animals/')
            .then((response) => {
                setIntake(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    }

    const move = (source, destination, droppableSource,droppableDestination) =>{

        const sourceClone = [...source[0]]
        const destClone = [...destination[0]]

        const [removed] = sourceClone.splice(droppableSource, 1)
        destClone.splice(droppableDestination,0,removed)

        source[1](sourceClone)
        destination[1](destClone)
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="chart">
                <div className="columnWrapper">
                    <h2>Intake</h2>
                    <Droppable droppableId="intake">
                        {(provided, snapshot) => (
                            <div {...provided.droppableProps} ref={provided.innerRef} className="droppableColumn">
                                {intake.map((item, index) => (
                                    <Draggable key={item.fields['shelter_id']} draggableId={item.fields['shelter_id']} index={index}>
                                        {(provided, snapshot) => (
                                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                <AnimalNode animal={item}></AnimalNode>
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
                    <h2>Medical</h2>
                    <Droppable droppableId="medical">
                        {(provided, snapshot) => (
                            <div {...provided.droppableProps} ref={provided.innerRef} className="droppableColumn">
                                {medical.map((item, index) => (
                                    <Draggable key={item.fields['shelter_id']} draggableId={item.fields['shelter_id']} index={index}>
                                        {(provided, snapshot) => (
                                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                <AnimalNode animal={item}></AnimalNode>
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