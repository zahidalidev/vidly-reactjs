import React, { Component } from 'react';

const SearcBox = ({onValue, onAutoFocus, onSearch}) => {
    return ( 
        <input 
            className="form-control mb-3 col-md-4"
            value={onValue}
            type="text" 
            name="search"
            autoFocus = {onAutoFocus}
            placeholder="Search..."
            onChange={onSearch}
        />
     );
}
 
export default SearcBox;