import React, {Component} from 'react';
import Like from "./like";
import Table from "./common/table";
import {Link} from "react-router-dom";
import auth from "../services/authService";

class MoviesTable extends Component {    
    column = [
        {path: 'title', label: "Title", content: movie => (<Link to = {`/movies/${movie._id}`}>{movie.title}</Link>)},
        {path: 'genre.name', label: "Genre"},
        {path: 'numberInStock', label: "Stock"},
        {path: 'dailyRentalRate', label: "Rate"},
        {key: 'like', content: movie =>  <Like liked = {movie.liked} onClick={()=> this.props.onMovieLike(movie)} />},
        
    ]

    deleteColumn = {
        key: 'delete',
        content: movie => (
            <button onClick={()=>this.props.onHandleDelete(movie._id)} className="btn btn-danger btn-sm">
                Delete
            </button>
        )
    } 

    constructor(){
        super()
        const user = auth.getCurrentUser();
        if(user && user.isAdmin) this.column.push(this.deleteColumn);
    }
    render() {
        const {onPageMovies, onMovieLike, onHandleDelete, onSort, sortColumn} = this.props;
        return ( 
            <Table
                columns={this.column}
                sortColumn={sortColumn}
                onSort={onSort}
                data = {onPageMovies}
                onMovieLike = {onMovieLike}
                onHandleDelete = {onHandleDelete}
            />
        );    
    }
}

export default MoviesTable;
