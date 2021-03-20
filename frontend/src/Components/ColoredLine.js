import React from 'react';

const ColoredLine = ({ color }) => {
    return (
        <hr
            style={{
                color: color,
                backgroundColor: color,
                height: 1,
                border: 0
            }}
        />
    )
}

export default ColoredLine;