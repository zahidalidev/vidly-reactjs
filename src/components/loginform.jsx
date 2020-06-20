import React from 'react';
import Joi from "joi-browser";
import Form from "./form";
import { Redirect } from 'react-router-dom';

import auth from "../services/authService";

class LoginForm extends Form {
    state = {
        data: {username: "", password: ""},
        errors: {}
    }
    schema = {
        username: Joi.string().required().label("Username"),
        password: Joi.string().required().label("Password")
    }

    doSubmit = async() => {
        //call the server
        try{
            const {data} = this.state;
            await auth.login(data.username, data.password);
            // this.props.history.push("/");
            const {state} = this.props.location;
            window.location = state ? state.from.pathname: "/";
        } catch(ex){
            if(ex.response && ex.response.status === 400){
                const errors = {...this.state.errors}
                errors.username = ex.response.data;
                this.setState({errors});
            }
        }    
    }
    
    render() { 
        if(auth.getCurrentUser()) return <Redirect to="/" />
        return ( 
            <div className="row">
                <div className="col-md-5">
                    <h1>Login</h1><br/>
                    <form onSubmit={this.handleSubmit}>
                        {this.renderInput("username", "Username", "text", true)}
                        {this.renderInput("password", "Password", "password", false)}
                        {this.onSubmitButton("Login")}
                    </form>
                </div>
            </div>
         );
    }
}
 
export default LoginForm;