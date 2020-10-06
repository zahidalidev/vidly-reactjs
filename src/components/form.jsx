import React, { Component } from 'react';
import Joi from "joi-browser";
import Input from "./common/input";
import {Link} from "react-router-dom";
import Select from "./common/select";

class Form extends Component {
//     state of the component
    state = { 
        data: {},
        errors: {}
     }
     validate = () => {
        const options = {abortEarly: false};
        const {error} = Joi.validate(this.state.data, this.schema, options);
        if(!error) return null;  //if there is no error then return 
        //if there is error then iterate over error and save error mesage in errors object then return errors 
        const errors = {};
        for(let item of error.details) errors[item.path[0]] = item.message;
        return errors;
    }
    handleSubmit = e => {
        e.preventDefault();

        //hanling error of empty input feilds at submt time
        const errors = this.validate(); 
        this.setState({errors: errors || {}});
        if(errors) return
        this.doSubmit();
    }
    
    validateProperty = ({name, value}) => {   //distructuring name and value from input that is currentTarget
        const schema = {[name]: this.schema[name]};
        const obj = {[name]: value};
        const {error} = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;

    }
    handleChange = ({currentTarget: input}) => {

        const errors = {...this.state.errors};

        const errorMessage = this.validateProperty(input);
        if(errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const data = {...this.state.data};
        data[input.name] = input.value;
        this.setState({data, errors});
    }
    renderSelect = (name, label, options) => {
        const {data, errors} = this.state;
        return(
            <Select 
                name={name}
                value={data[name]}
                label={label}
                options={options}
                onChange={this.handleChange}
                error = {errors[name]}
            />
        );
    }
    renderInput = (name, label, formType = "text", onFocus = false) => {
        const {data, errors} = this.state;
        return (                         
            <Input 
                name={name}
                label={label}
                value={data[name]}
                onChange={this.handleChange}
                formType={formType}
                error = {errors[name]}
                focus = {onFocus}
            />
        );

    }
    onSubmitButton = (label) => {
        return ( 
            <button 
                className="btn btn-primary"
                disabled = {this.validate()}  //validate funtion will return null or some error message, null will be consider as false and string as true
            >{label}</button> 
        );
    }
    onUpdateButton = (label) => {
        return ( 
            <button 
                className="btn btn-primary"
            >{label}</button> 
        );
    }


}
 
//default export
export default Form;
