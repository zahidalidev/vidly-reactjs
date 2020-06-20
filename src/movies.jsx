import React, { Component } from 'react';
import _ from 'lodash';
import {Link} from "react-router-dom";

import Pagination from "./components/common/pagination"
import Paginate from "./components/utils/paginate";
import Genre from './components/common/genre';
import MoviesTable from "./components/moviesTable";
import SearcBox from "./components/common/searchBox"

import {getGenres} from "./services/genreService";
import {getMovies, deleteMovie} from "./services/movieService";
import { toast } from 'react-toastify';

class Movies extends Component {
    state = { 

        movies: [],
        pageSize: 4,
        currentPage: 1,
        genre: [],
        id: "All Genre",
        sortColumn: {path: 'title', order: 'asc'},
        movieSerchedTitle: ''  
    }

    
    handleDelete = async id =>{
        const originalMovies = this.state.movies;
        const movies = originalMovies.filter(mov => mov._id !== id )
        this.setState({movies});

        try{
           await deleteMovie(id);
        } catch(ex){
           if(ex.response && ex.response.status === 404)
               toast.error("this movie has already been deleted");
           this.setState({movies: originalMovies});
        }
    }
    movieLike = movie => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = {...movies[index]};
        movies[index].liked = !movies[index].liked;
        this.setState({movies});
    }
    currenPage = page => {
        this.setState({currentPage: page});
    }
    handleGenre = genreId => {
        this.setState({id: genreId, movieSerchedTitle: ''});
    }

    async componentDidMount(){
        const {data}  = await getGenres();
        const {data: movies} = await getMovies();
    

        const allGenre = [{name: "All Genre", _id: "All Genre"}, ...data];
        this.setState({genre: allGenre, movies});
    }
    handleSort = sortColumn => {
        this.setState({sortColumn});
    }
//filter movies  <------
    searchMovieFun = () => {
        const {movies, movieSerchedTitle} = this.state;
        const searchMovie = movies.filter(movie => 
            movie.title.toLowerCase().startsWith(movieSerchedTitle.toLowerCase()) //return filtered movies according to search box value
        )
        return searchMovie;
    }
    fakeMoviesGenreFun = () => {
        const {movies, id, movieSerchedTitle} = this.state;
        const searchMovie = this.searchMovieFun();
        let fakeMovies;   
        if((searchMovie.length === movies.length) || movieSerchedTitle.length === 0){  //if search box return nothing then length will be same from both 
            fakeMovies = movies.filter(mov => mov.genre._id === id || id === "All Genre" );
        }else{
            fakeMovies = searchMovie;
        }
        return fakeMovies;
    }
    getPageData = () => {  
        const {pageSize, currentPage, sortColumn} = this.state;

        let fakeMovies = this.fakeMoviesGenreFun();   
        //sorting
        const sortedMovies = _.orderBy(fakeMovies, [sortColumn.path], [sortColumn.order]);
        
        const pageMovies = Paginate(currentPage, pageSize, sortedMovies);
        return {totalCount: fakeMovies.length, data: pageMovies};
    }
//  ------->

    searchMovie = ({currentTarget: input}) => {
        if(input.value.length == 0){
            this.setState({movieSerchedTitle: input.value, id: 'All Genre'})
        }else this.setState({movieSerchedTitle: input.value, id: ''})
    }
    
    render() { 
        
        const {movies, pageSize, currentPage, genre, id, sortColumn, movieSerchedTitle} = this.state;
        const {user} = this.props;

        const totalMovies = movies.length;
        let message;
        if(totalMovies === 0){
            message = `there is no movie in the database`; 
        }else{
            message = `Showing ${totalMovies} movies in the database`;
        }


        const {totalCount, data} = this.getPageData(); 
        return ( 
            <div>
               
                <div className="row">
                    <div className="col-2">
                        < Genre
                            onHandleGenre = {this.handleGenre}
                            id={id}
                            genre = {genre}
                        />
                    </div>
                    <div className="col">
                        {user && (
                            <React.Fragment>
                                < Link className="btn btn-primary" to="/movies/new">New Movies</Link><br/><br/>
                            </React.Fragment>
                        )}
                        < SearcBox 
                            onValue={movieSerchedTitle}
                            onAutoFocus = {false}
                            onSearch={this.searchMovie}
                        />
                        
                        <p>{message}</p>
                        < MoviesTable 
                            onTotalMovies = {totalMovies}
                            onPageMovies = {data}
                            onMovieLike = {this.movieLike}
                            onHandleDelete = {this.handleDelete}
                            sortColumn = {this.state.sortColumn}
                            onSort = {this.handleSort}
                        />
                        < Pagination
                            totalMovies = {totalCount}
                            pSize = {pageSize}
                            onCurrentPage = {this.currenPage}
                            currentPage = {currentPage}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Movies;