import React, { Component } from 'react';

const Input = ({name, label, formType, error, focus, ...rest}) => {
    return ( 
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input
                {...rest}
                className="form-control"
                id={name} type={formType} 
                className="form-control"
                name={name}
                autoFocus = {focus}
            />
        {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
}
 
export default Input;