import React from 'react';
import './AnimalNode.css'
const AnimalNode = ({animal}) => {

    return(
        <div className='node'>
            <p>{animal.fields['name']}</p>
        </div>
    )
}

export default AnimalNode;