import {User, UserRole} from "../entity/User";
import {getSaltedPassword, getSaltFromPassword} from "../bin/salting";
import {Dictionary} from "express-serve-static-core";
import {getConnection} from "typeorm";

export const validateUserCreate = async (params: Dictionary<string>) => {

    const tmp_connection = getConnection();
    const userRepository = tmp_connection.getRepository(User);
    var USER_ERROR_CODE  = {
        "TOTAL_WARNINGS": 0,
        "WRONG_NAME": false,
        "WRONG_EMAIL": false,
        "OCCUPIED_EMAIL": false,
        "WRONG_ADDRESS": false,
        "WRONG_PLACE": false,
        "WRONG_PHONE_NUMBER": false,
        "OCCUPIED_PHONE_NUMBER": false,
        "WRONG_POST_CODE": false,
        "WRONG_PASSWORD": false,
    }
    let nameRegex = /^[a-zA-Z]{1,50}$/;
    let emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
    let phone_numberRegex = /^[1-9][0-9]{8}$/;
    let post_codeRegex = /^[0-9]{2}-[0-9]{3}$/;
    let passwordRegex = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{8,})\S$/;
    // First name validation
    try {
        if(params.firstName === undefined)
            throw new TypeError("First name was not defined for user!")
        if(params.firstName.length === 0)
            throw new TypeError("First name cannot be an empty string")
        if(!nameRegex.test(params.firstName))
            throw new SyntaxError("First name must contain only big and small letters!")
    }
    catch(e) {
        console.log(e);
        USER_ERROR_CODE.WRONG_NAME=true;
    }
    // Last name validation
    try {
        if(params.lastName === undefined)
            throw new TypeError("Last name was not defined for user!");
        if(params.lastName.length === 0)
            throw new TypeError("Last name cannot be an empty string");
        if(!nameRegex.test(params.lastName))
            throw new SyntaxError("Last name must contain only big and small letters!");
    }
    catch(e) {
        console.log(e);
        USER_ERROR_CODE.TOTAL_WARNINGS++;
        USER_ERROR_CODE.WRONG_NAME=true;
    }

    // Email validation
    try {
        if(params.email === undefined)
            throw new TypeError("Email was not defined for user!");
        if(params.email.length === 0)
            throw new TypeError("Email cannot be an empty string!");
        if(!emailRegex.test(params.email))
            throw new SyntaxError("Given email is not valid!");
    }
    catch(e) {
        console.log(e)
        USER_ERROR_CODE.TOTAL_WARNINGS++;
        USER_ERROR_CODE.WRONG_EMAIL=true;
    }
    
    // Email uniqueness validation
    try {
        if(await userRepository.findOne({email: params.email}) != undefined)
            throw new Error("There is user with this email in database!");
    }
    catch(e) {
        console.log(e)
        USER_ERROR_CODE.TOTAL_WARNINGS++;
        USER_ERROR_CODE.OCCUPIED_EMAIL=true;
    }
    
    // Phone number validation
    try {
        if(params.phone_number === undefined)
            throw new TypeError("Email was not defined for user!");
        if(params.phone_number.length === 0)
            throw new TypeError("Email cannot be an empty string!");
        if(!phone_numberRegex.test(params.phone_number))
            throw new SyntaxError("Given email is not valid!");
    }
    catch(e) {
        console.log(e)
        USER_ERROR_CODE.TOTAL_WARNINGS++;
        USER_ERROR_CODE.WRONG_PHONE_NUMBER=true;
    }

    // Phone number uniqueness validation
    try {
        if(await userRepository.findOne({phone_number: params.phone_number}) != undefined)
            throw new Error("There is user with this email in database!");
    }
    catch(e) {
        console.log(e)
        USER_ERROR_CODE.TOTAL_WARNINGS++;
        USER_ERROR_CODE.OCCUPIED_PHONE_NUMBER=true;
    }

    // Address validation
    try {
        if(params.address === undefined)
            throw new TypeError("Address was not defined for user!");
        if(params.address.length === 0)
            throw new TypeError("Address cannot be an empty string!");
    }
    catch(e) {
        console.log(e)
        USER_ERROR_CODE.TOTAL_WARNINGS++;
        USER_ERROR_CODE.WRONG_ADDRESS=true;
    }

    // Place validation
    try {
        if(params.place === undefined)
            throw new TypeError("Place was not defined for user!");
        if(params.place.length === 0)
            throw new TypeError("Place cannot be an empty string!");
    }
    catch(e) {
        console.log(e)
        USER_ERROR_CODE.TOTAL_WARNINGS++;
        USER_ERROR_CODE.WRONG_PLACE=true;
    }

    // Post code validation
    try {
        if(params.post_code === undefined)
            throw new TypeError("Post code was not defined for user!");
        if(params.post_code.length === 0)
            throw new TypeError("Post code cannot be an empty string!");
        if(!post_codeRegex.test(params.post_code))
            throw new SyntaxError("Post code must be in format 99-999");
    }
    catch(e) {
        console.log(e)
        USER_ERROR_CODE.TOTAL_WARNINGS++;
        USER_ERROR_CODE.WRONG_POST_CODE=true;
    }

    // Password validation
    try {
        if(params.password === undefined)
            throw new TypeError("Password was not defined for user!");
        if(params.password.length === 0)
            throw new TypeError("Password cannot be an empty string!");
        if(!passwordRegex.test(params.password))
            throw new SyntaxError("Password must consist of 9 characters, at least 1 big character and 1 number with no spaces!");
    }
    catch(e) {
        console.log(e)
        USER_ERROR_CODE.TOTAL_WARNINGS++;
        USER_ERROR_CODE.WRONG_PASSWORD=true;
    }
    // role validation
    try {
        if(params.role == UserRole.ADMIN) {
            // TODO is admin logged?
        }    
    } catch(e) {
        console.log(e)

    }
    
    // Return possible warnings
    return USER_ERROR_CODE
}

export const validateUserLogin = async (params: Dictionary<string>) => {

    const tmp_connection = getConnection();
    const userRepository = tmp_connection.getRepository(User);
    
    var LOGIN_INFO = {
        "EMAIL": null,
        "TOTAL_WARNINGS": 0,
        "LOGIN_ERROR_CODE": {
            "NO_EMAIL": false,
            "WRONG_PASSWORD": false,
        }
    }    
        
    let user = null;
    
    // Email validation
    try {
        if(await userRepository.findOne({email: params.email}) == undefined) {
            throw new Error("There is no user with this email in database!");
        }
        else {
            user = await userRepository.findOne({email: params.email});
            // Password validation
            try {
                if(user.password != getSaltedPassword(params.password,getSaltFromPassword(user.password)))
                    throw new Error("There is no user with this email in database!");
                else
                    LOGIN_INFO.EMAIL = user.email;
            }
            catch(e) {
                console.log(e)
                LOGIN_INFO.TOTAL_WARNINGS++;
                LOGIN_INFO.LOGIN_ERROR_CODE.WRONG_PASSWORD=true;
            }
        }
    }
    catch(e) {
        console.log(e)
        LOGIN_INFO.TOTAL_WARNINGS++;
        LOGIN_INFO.LOGIN_ERROR_CODE.NO_EMAIL=true;
    }

    return LOGIN_INFO;
}

export const validateUserAccessToken = async (cookies: Dictionary<string>) => {
    const tmp_connection = getConnection();
    const userRepository = tmp_connection.getRepository(User);

    var ACCESS_TOKEN_INFO = {
        "EMAIL": null,
        "IS_VALID": false
    }

    let user = await userRepository.findOne({email: cookies.email});

    if(user == undefined)
         return ACCESS_TOKEN_INFO;
    else {
        ACCESS_TOKEN_INFO.EMAIL = user.email;
        if(user.access_token != cookies.access_token)
            return ACCESS_TOKEN_INFO;
        else
            ACCESS_TOKEN_INFO.IS_VALID = true;
            //IF STH WENT WRONG BETTER TO CLEAR COOKIES FOR
            // ACCESS TOKEN AND EMAIL TODO
    }
    return ACCESS_TOKEN_INFO;
}



