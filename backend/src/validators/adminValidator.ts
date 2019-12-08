import {User, UserRole} from "../entity/User";
import {decryptHashedToken} from "../bin/adminLoginToken";
import {getSaltedPassword, getSaltFromPassword} from "../bin/salting";
import {Dictionary} from "express-serve-static-core";
import {getConnection} from "typeorm";

export const validateAdminLogin = async (params: Dictionary<string>) => {

    const tmp_connection = getConnection();
    const userRepository = tmp_connection.getRepository(User);

    
    var LOGIN_INFO = {
        "TOTAL_WARNINGS": 0,
        "LOGIN_ERROR_CODE": {
            "ADMIN": true,
            "NO_EMAIL": false,
            "WRONG_PASSWORD": false,
        }
    }    
        
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
                console.log(e)
                LOGIN_INFO.TOTAL_WARNINGS++;
                LOGIN_INFO.LOGIN_ERROR_CODE.ADMIN=false;
            }
            // Password validation
            try {
                if(admin.password != getSaltedPassword(params.password,getSaltFromPassword(admin.password)))
                    throw new Error("Wrong password for this user: " + admin.email);
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
        LOGIN_INFO.LOGIN_ERROR_CODE.ADMIN=false;
        LOGIN_INFO.TOTAL_WARNINGS++;
        LOGIN_INFO.LOGIN_ERROR_CODE.NO_EMAIL=true;
    }

    return LOGIN_INFO;
}

export const validateAdminLoginToken = async (cookies: Dictionary<string>) => {
    const tmp_connection = getConnection();
    const userRepository = tmp_connection.getRepository(User);

    var ACCESS_TOKEN_INFO = {
        "TIMESTAMP_VALID": false,
        "IS_VALID": false
    }

    let token = decryptHashedToken(cookies.adminLoginToken);
    let admin = await userRepository.findOne({email: token.email});

    if(admin == undefined || admin.role != UserRole.ADMIN)
         return ACCESS_TOKEN_INFO;
    else {
        if(token.date == undefined || Date.parse(token.date) > Date.now())
            return ACCESS_TOKEN_INFO;
        else
            ACCESS_TOKEN_INFO.TIMESTAMP_VALID = true;
            ACCESS_TOKEN_INFO.IS_VALID = true;
    }
    return ACCESS_TOKEN_INFO;
}