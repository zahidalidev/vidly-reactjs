import React, { Component } from 'react';
import Joi from "joi-browser";
import Form from "./form";
import {saveMovie, getMovies} from "../services/movieService";
import { getGenres } from './../services/genreService';

class NewMovie extends Form {
    state = {
        data: {title: "", genre: "", numberInStock: "", dailyRentalRate: ""},
        errors: {},
        movies: [],
        genres: []
    }
    schema = {
        title: Joi.string().required().label("Title"),
        genre: Joi.string().required().label("Genre"),
        numberInStock: Joi.string().required().min(0).max(100).label("Number in Stock"),
        dailyRentalRate: Joi.string().required().min(0).max(10).label("Daily Rental Rate")
    }

    doSubmit = () => {
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
        title: title,
        genreId: genreId,
        numberInStock: numberInStock,
        dailyRentalRate: dailyRentalRate
        };
        await saveMovie(data2);
    }

    async componentDidMount(){
        const {data: movies} = await getMovies();
        const {data: getgenre} = await getGenres();
        const genres = [{name: ""}, ...getgenre];
        this.setState({genres, movies});
    }

    render(){ 
        return ( 
            <div className="row">
                <div className="col-md-5">
                    <h1>Movie Form</h1><br/>
                    <form onSubmit={this.handleSubmit}>
                        {this.renderInput("title", "Title", "text", true)}
                        {/* {this.renderInput("genre", "Genre", "text", false)} */}
                        {this.renderSelect("genre", "Genre", this.state.genres)}
                        {this.renderInput("numberInStock", "Number in Stock", "text", false)}
                        {this.renderInput("dailyRentalRate", "Rate", "text", false)}
                        {this.onSubmitButton("Save")}
                    </form>
                </div>
            </div>
         );
    }
}
 
export default NewMovie;