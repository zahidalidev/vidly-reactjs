import React, { Component } from 'react';
import Joi from "joi-browser";
import Form from "./components/form";

import { getGenres } from './services/genreService';
import {getMovie, getMovies, saveMovie} from "./services/movieService";

class MovieForm extends Form {
    state = {
        data: {title: "", genre: "", numberInStock: "", dailyRentalRate: ""},
        errors: {},
        movies: [],
        movieId: "",
        genres: []
    }
    schema = {
        title: Joi.string().required().label("Title"),
        genre: Joi.string().required().label("Genre"),
        numberInStock: Joi.string().required().min(0).max(100).label("Number in Stock"),
        dailyRentalRate: Joi.string().required().min(0).max(10).label("Daily Rental Rate")
    }

    doSubmit = () => {
        //  this.deleteMovie();
        //call server
        console.log("Submitted");
        this.addMovie();
        this.props.history.push("/movies"); //to go back to movies page
        
    }
    addMovie = async() => {
        const {title, genre, numberInStock, dailyRentalRate} = this.state.data;
        const genreMovie = this.state.genres.filter(genr => {
            return genr.name === genre
        });
        const genreId = genreMovie[0]._id;
        const data2 = {
        _id: this.state.movieId,
        title: title,
        genreId: genreId,
        numberInStock: numberInStock,
        dailyRentalRate: dailyRentalRate
        };
        await saveMovie(data2);
    }
    
    populateMovie = async() => {
        try{
            const {data} = await getMovie(this.props.match.params.id);
            const title = data.title;
            const genre = data.genre.name;
            const numberInStock = data.numberInStock;
            const dailyRentalRate = data.dailyRentalRate;
            
            this.state.data.title=title;
            this.state.data.genre=genre;
            this.state.data.numberInStock=numberInStock;
            this.state.data.dailyRentalRate=dailyRentalRate;
            this.state.movieId = data._id; 
            this.setState({movieId: data._id})
        } catch(ex){
            if(ex.response && ex.response.status === 404)
                return this.props.history.replace("/not-found");
        }
    }

    async componentDidMount(){
        await this.populateMovie();
        const {data: movies} = await getMovies();
        const {data: getgenre} = await getGenres();
        const genres = [{name: ""}, ...getgenre];
        this.setState({genres, movies});
    }
    
    render() { 
        
        return ( 
            <div className="row">
                <div className="col-md-5">
                    <h1>Movie Form to Update</h1><br/>
                    <form onSubmit={this.handleSubmit}>
                        {this.renderInput("title", "Title", "text", true)}
                        {/* {this.renderInput("genre", "Genre", "text", false)} */}
                        {this.renderSelect("genre", "Genre", this.state.genres)}
                        {this.renderInput("numberInStock", "Number in Stock", "text", false)}
                        {this.renderInput("dailyRentalRate", "Rate", "text", false)}
                        {this.onSubmitButton("Update")}
                    </form>
                </div>
            </div>
        );
    }
}
 
export default MovieForm; 
