const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = validateRegisterInput=(data)=>{
    let errors={};
    data.name = !isEmpty(data.name)?data.name:"";
    data.email = !isEmpty(data.email)?data.email:"";
    data.password = !isEmpty(data.password)?data.password:"";
    data.address = !isEmpty(data.address)?data.address:"";

    if(Validator.isEmpty(data.name)){
        errors.name = "Namefield is required";
    }
    if(Validator.isEmpty(data.email)){
        errors.email = 'Email field is required';
    }
    else if(!Validator.isEmail(data.email))
    {
        errors.email='Email is not valid';
    }
    if(Validator.isEmpty(data.password))
    {
        errors.password='Password is required';
    }

    return {
        errors,
        isValid :isEmpty(errors)
    }    
};