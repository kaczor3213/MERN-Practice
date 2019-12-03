import {User, UserRole} from "../entity/User";
import {getSaltedPassword, getSaltFromPassword} from "../bin/salting";
import {Dictionary} from "express-serve-static-core";
import {getConnection} from "typeorm";
import {decryptHashedToken} from "../bin/loginToken";
export const validateUserCreate = async (params: Dictionary<string>) => {

    const tmp_connection = getConnection();
    const userRepository = tmp_connection.getRepository(User);
    var USER_ERROR_CODE  = {
        "TOTAL_WARNINGS": 0,
        "WRONG_FIRST_NAME": false,
        "WRONG_LAST_NAME": false,
        "WRONG_EMAIL": false,
        "OCCUPIED_EMAIL": false,
        "WRONG_ADDRESS": false,
        "WRONG_PLACE": false,
        "WRONG_PHONE_NUMBER": false,
        "OCCUPIED_PHONE_NUMBER": false,
        "WRONG_POST_CODE": false,
        "WRONG_PASSWORD": false,
        "PASSWORDS_DONT_MATCH": false,
        "RULES_ERROR": false,
    }
    let nameRegex = /^[a-zA-Z]{1,50}$/;
    let emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
    let phoneNumberRegex = /^[1-9][0-9]{8}$/;
    let postCodeRegex = /^[0-9]{2}-[0-9]{3}$/;
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
        USER_ERROR_CODE.TOTAL_WARNINGS++;
        USER_ERROR_CODE.WRONG_FIRST_NAME=true;
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
        USER_ERROR_CODE.WRONG_LAST_NAME=true;
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
        if(params.phoneNumber === undefined)
            throw new TypeError("Email was not defined for user!");
        if(params.phoneNumber.length === 0)
            throw new TypeError("Email cannot be an empty string!");
        if(!phoneNumberRegex.test(params.phoneNumber))
            throw new SyntaxError("Given email is not valid!");
    }
    catch(e) {
        console.log(e)
        USER_ERROR_CODE.TOTAL_WARNINGS++;
        USER_ERROR_CODE.WRONG_PHONE_NUMBER=true;
    }

    // Phone number uniqueness validation
    try {
        if(await userRepository.findOne({phoneNumber: params.phoneNumber}) != undefined)
            throw new Error("There is user with this phone number in database!");
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
        if(params.postCode === undefined)
            throw new TypeError("Post code was not defined for user!");
        if(params.postCode.length === 0)
            throw new TypeError("Post code cannot be an empty string!");
        if(!postCodeRegex.test(params.postCode))
            throw new SyntaxError("Post code must be in format 99-999");
    }
    catch(e) {
        console.log(e)
        USER_ERROR_CODE.TOTAL_WARNINGS++;
        USER_ERROR_CODE.WRONG_POST_CODE=true;
    }

    try {
        if(params.password !== params.password_r)
            throw new SyntaxError("Passwords don't match.");
        else
            delete params.password_r;
    }
    catch(e) {
        console.log(e)
        USER_ERROR_CODE.TOTAL_WARNINGS++;
        USER_ERROR_CODE.PASSWORDS_DONT_MATCH=true;
    }

    // Password validation
    try {
        if(params.password === undefined)
            throw new TypeError("Password was not defined for user!");
        if(params.password.length === 0)
            throw new TypeError("Password cannot be an empty string!");
        if(!passwordRegex.test(params.password))
            throw new SyntaxError("Password must consist of 9 characters, at least 1 big character and 1 number with no spaces!");
                // Password validation
    }
    catch(e) {
        console.log(e)
        USER_ERROR_CODE.TOTAL_WARNINGS++;
        USER_ERROR_CODE.WRONG_PASSWORD=true;
        USER_ERROR_CODE.PASSWORDS_DONT_MATCH=false;
    }

    try {
        console.log(params.rules)
        if(params.rules !== 'true')
            throw new TypeError("Password was not defined for user!");
    }
    catch(e) {
        console.log(e)
        USER_ERROR_CODE.TOTAL_WARNINGS++;
        USER_ERROR_CODE.RULES_ERROR=true;
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

export const validateLoginToken = async (cookies: Dictionary<string>) => {
    const tmp_connection = getConnection();
    const userRepository = tmp_connection.getRepository(User);

    var ACCESS_TOKEN_INFO = {
        "TIMESTAMP_VALID": false,
        "IS_VALID": false,
        "EMAIL": null
    }
    let token = null;
    let user = null;

    try {
        token = decryptHashedToken(cookies.loginToken);
    } catch(e) {
        return ACCESS_TOKEN_INFO;
    }
    user = await userRepository.findOne({email: token.email});
    
    if(user == undefined)
         return ACCESS_TOKEN_INFO;
    else {
        if(token.date == undefined || Date.parse(token.date) > Date.now())
            return ACCESS_TOKEN_INFO;
        else
            ACCESS_TOKEN_INFO.TIMESTAMP_VALID = true;
            ACCESS_TOKEN_INFO.IS_VALID = true;
            ACCESS_TOKEN_INFO.EMAIL = token.email;
    }
    return ACCESS_TOKEN_INFO;
}
