import React from 'react';
import './AnimalNode.css'
const AnimalNode = ({ animal, setShowModalTrue, animalId}) => {

    const handleClick = () =>{
        console.log("test", animal.fields['shelter_id'])
        animalId(animal.fields['shelter_id'])
        setShowModalTrue(true)
    }
    return (
        <div className='node'>
            <div className="name">
                <p>{animal.fields['name']}</p>
            </div>
            <div>
            <button onClick={handleClick}>
                Edit
            </button>
            </div>
        </div>
    )
}

export default AnimalNode;