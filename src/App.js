import React, { Component } from 'react';
import {ToastContainer} from "react-toastify";
import {Switch, Route, Redirect} from "react-router-dom";

import Movies from "./movies";
import NavBar from './components/navBar';
import Customers from './customers';
import Rentals from './rentals';
import NotFound from './notfound';
import MovieForm from './moveiForm';
import LoginForm from './components/loginform';
import RegisterForm from './components/registerform';
import NewMovie from './components/newmovieform';
import Logout from "./components/logout";
import auth from "./services/authService";
import ProtectedRoute from './components/protectedRouts';

import "react-toastify/dist/ReactToastify.css"


class App extends Component {
    state = {}
    
    componentDidMount(){
        const user = auth.getCurrentUser();
        this.setState({user});
    }
    

    render() { 
        const {user} = this.state;

        console.log(this.state.user);
        return ( 
            <div>
                <ToastContainer />
                <NavBar user = {user} />
                <div className="content">
                    <Switch>
                        <Route path="/register" component={RegisterForm} />
                        <Route path="/login" component={LoginForm} />
                        <Route path="/logout" component={Logout} />
                        <ProtectedRoute path="/movies/new" component={NewMovie} />
                        <ProtectedRoute path="/movies/:id" exact component={MovieForm} />
                        <Route path="/movies" render={(props) => <Movies {...props} user={this.state.user} />} />                       
                        <Route path="/customers" component={Customers} />
                        <Route path="/rentals" component={Rentals} />
                        <Route path="/not-found/" component={NotFound} />
                        <Redirect from = "/" exact to="movies" />
                        
                        <Redirect to="not-found" />
                    </Switch>
                </div>
            </div>
         );
    }
}
 
export default App;