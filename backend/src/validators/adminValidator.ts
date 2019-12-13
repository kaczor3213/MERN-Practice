import {User, UserRole} from "../entity/User";
import {decryptHashedToken} from "../bin/loginToken";
import {getSaltedPassword, getSaltFromPassword} from "../bin/salting";
import {Dictionary} from "express-serve-static-core";
import {getConnection} from "typeorm";

export const validateAdminLogin = async (params: Dictionary<string>) => {

    const tmp_connection = getConnection();
    const userRepository = tmp_connection.getRepository(User);

    
    var LOGIN_INFO = {
        "EMAIL": null,
        "TOTAL_WARNINGS": 0,
        "LOGIN_ERROR_CODE": {
            "ADMIN": true,
            "NO_EMAIL": false,
            "WRONG_PASSWORD": false,
        }
    }    
    let errors = '';
    let admin = null;
    // Email validation
    try {
        if(await userRepository.findOne({email: params.email}) == undefined) {
            throw new Error("There is no user with this email in database!");
        }
        else {
            admin = await userRepository.findOne({email: params.email});
            // Privilege validation
            try {
                if(admin.role != UserRole.ADMIN)
                    throw new Error("Not an admin: " + admin.email);
            }
            catch(e) {
                errors += e+'\n';
                LOGIN_INFO.TOTAL_WARNINGS++;
                LOGIN_INFO.LOGIN_ERROR_CODE.ADMIN=false;
            }
            // Password validation
            try {
                if(admin.password != getSaltedPassword(params.password,getSaltFromPassword(admin.password)))
                    throw new Error("Wrong password for this user: " + admin.email);
                else
                    LOGIN_INFO.EMAIL = admin.email;
            }
            catch(e) {
                errors += e+'\n';
                LOGIN_INFO.TOTAL_WARNINGS++;
                LOGIN_INFO.LOGIN_ERROR_CODE.WRONG_PASSWORD=true;
            }
        }
    }
    catch(e) {
        errors += e+'\n';
        LOGIN_INFO.TOTAL_WARNINGS++;
        LOGIN_INFO.LOGIN_ERROR_CODE.ADMIN=false;
        LOGIN_INFO.TOTAL_WARNINGS++;
        LOGIN_INFO.LOGIN_ERROR_CODE.NO_EMAIL=true;
    }
    console.log(errors);
    return LOGIN_INFO;
}

export const validateAdminLoginToken = async (cookies: Dictionary<string>) => {
    const tmp_connection = getConnection();
    const userRepository = tmp_connection.getRepository(User);

    var ACCESS_TOKEN_INFO = {
        "TIMESTAMP_VALID": false,
        "IS_VALID": false,
        "EMAIL": null
    }
    let token = null;
    let admin = null;

    try {
        token = decryptHashedToken(cookies.adminLoginToken,'ADMIN_KEY');
    } catch(e) {
        return ACCESS_TOKEN_INFO;
    }
    admin = await userRepository.findOne({email: token.email});

    if(admin == undefined || admin.role != UserRole.ADMIN)
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