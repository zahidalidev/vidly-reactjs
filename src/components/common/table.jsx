import React, { Component } from 'react';
import TableHeaders from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({columns, sortColumn, onSort, data, onMovieLike, onHandleDelete}) => {
    return ( 
        <table className="table">
            <TableHeaders
                column={columns}
                sortColumn={sortColumn}
                onSort={onSort}
            />
            <TableBody
                data = {data}
                onMovieLike = {onMovieLike}
                onHandleDelete = {onHandleDelete}
                columns = {columns}
            />
        </table> 
    );
} 
export default Table;
