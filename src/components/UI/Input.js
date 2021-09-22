import React from 'react';

import styles from './Input.module.css';

//Need this for refs being passed to custom components
const Input = React.forwardRef((props, ref) => {
    //Using the spread operator will add in element setting referenced in the object
    return (
        <div className={styles.input}>
            <label htmlFor={props.input.id}>{props.label}</label>
            <input ref={ref} {...props.input} />
        </div>
    )
});

export default Input