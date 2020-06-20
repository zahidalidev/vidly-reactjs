import React, { Component } from 'react';
import Joi from "joi-browser";
import Form from "./form";

import * as userService from "../services/userService";
import auth from "../services/authService";

class RegisterForm extends Form {
    state = {
        data: {username: "", password: "", name: ""},
        errors: {}
    }
    schema = {
        username: Joi.string().email({ minDomainAtoms: 2 }).required().label("Username"),
        password: Joi.string().min(5).required().label("Password"),
        name: Joi.string().required().label("Name")
    }

    doSubmit = async() => {
        //call the server
        try{
            const response =  await userService.registerUser(this.state.data);
            auth.loginWithJwt(response.headers["x-auth-token"]);
            // this.props.history.push("/");
            window.location = "/";
        } catch(ex){
            if(ex.response && ex.response.status === 400){
                const errors = {...this.state.errors};
                errors.username = ex.response.data;
                this.setState({errors});
            }
        }
    }

    render() { 
        return ( 
            <div className="row">
                <div className="col-md-5">
                    <h1>Register</h1><br/>
                    <form onSubmit={this.handleSubmit}>
                        {this.renderInput("username", "Username", "text", true)}
                        {this.renderInput("password", "Password", "password", false)}
                        {this.renderInput("name", "Name", "text", false)}
                        {this.onSubmitButton("Register")}
                    </form>
                </div>
            </div>
         );
    }
}
 
export default RegisterForm;