import React from 'react';

import Control from './Control/Control';

const controls = [
    { label: 'Panf', type: 'panf' },
    { label: 'Delta100', type: 'delta100' },
    { label: 'Hp5', type: 'hp5' },
    { label: 'Delta3200', type: 'delta3200' },
];

const Controls = (props) => (
    <div className={classes.Controls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <Control 
                key={ctrl.label} 
                label={ctrl.label}
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]} />
        ))}
        <button 
            className={classes.OrderButton}
            disabled={!props.purchasable}>ORDER NOW</button>
    </div>
);

export default Controls;
