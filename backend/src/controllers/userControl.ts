import {validateUserCreate, validateUserLogin, validateLoginToken} from "../validators/userValidator";
import {generateHashedToken} from "../bin/loginToken";
import {Request, Response} from "express";
import {getConnection} from "typeorm";
import {User} from "../entity/User";
import {getSaltedPassword, getSaltFromPassword} from "../bin/salting";
export const LOGIN_TIMEOUT = 60 * 60 * 1000;

// Login controller (takes request, response from route call)
export const Login = async (req: Request, res: Response) => {
    const results = await validateUserLogin(req.body);
    if(results["TOTAL_WARNINGS"] == 0) {
        let hashedToken = generateHashedToken(results["EMAIL"], req.headers["user-agent"]);
        // SET AUTHORIZATION COOKIE FOR USER
        res.cookie("loginToken", hashedToken, { expires: new Date(Date.now() + LOGIN_TIMEOUT)});
        return res.json(results);       
    }
    res.clearCookie("loginToken");
    return res.json(results);
}

// Logout controller (takes request, response from route call)
export const Logout = async (req: Request, res: Response) => {
    console.log(req.cookies)
    const results = await validateLoginToken(req.cookies);
    console.log(results);
    if(results["IS_VALID"] == true) {
        res.cookie("shouldBeLogout", true);
        return res.json(results);
    }
    return res.json(results);
}

// SingUp controller (takes request, response from route call)
export const SignUp = async (req: Request, res: Response) => {
    const userRepository = getConnection().getRepository(User);
    const results = await validateUserCreate(req.body);
    console.log(results);
    if(results["TOTAL_WARNINGS"] == 0) {
        let user = await userRepository.create(req.body);
        user['password']=getSaltedPassword(user['password']);
        await userRepository.save(user);
        return res.json(results);
    }
    return res.json(results);
}

// Profile controller (takes request, response from route call)
export const Profile = async (req: Request, res: Response) => {
    const userRepository = getConnection().getRepository(User);
    const results = await validateLoginToken(req.cookies);
    console.log(results);
    if(results["IS_VALID"] == true ) {
        let user = await userRepository.findOne({
            select: ["firstName", "lastName", "email"],
            where: { 
                email: results["EMAIL"]
            }
        });
        return res.json(user);       
    }
    return res.json(results);
}

// Orders controller (takes request, response from route call)
export const Orders = async (req: Request, res: Response) => {
    const userRepository = getConnection().getRepository(User);     
    const results = await validateLoginToken(req.cookies);

    console.log(results);
    if(results["IS_VALID"] == true) {
        let user = await userRepository.find({ 
            select: ["firstName", "lastName", "email"],
            relations: ["orders"],
            where: { 
                email: results["EMAIL"]
            }
        });
        
        var USER_ORDERS = {
            "USER": user[0],
            "ORDERS": user[0].orders
        }
        return res.json(USER_ORDERS);
    }
    return res.json(results);
}

// Specific order controller (takes request, response from route call)
export const Order = async (req: Request, res: Response) => {
    const userRepository = getConnection().getRepository(User);     
    const results = await validateLoginToken(req.cookies);

    console.log(results);
    if(results["IS_VALID"] == true ) {
        let user = await userRepository.find({ 
            select: ["firstName", "lastName", "email"],
            relations: ["orders"],
            where: {
                email: results["EMAIL"]
            }
        });
        let _order = null
        user[0].orders.forEach(function (order) {
            if(order.id == parseInt(req.params.id))
                _order = order;
        }); 
        var USER_ORDER = {
            "USER": user[0],
            "ORDER": _order
        }
        return res.json(USER_ORDER);
    }
    return res.json(results);
}

// SettingsView controller (takes request, response from route call)
export const SettingsView = async (req: Request, res: Response) => {
    const userRepository = getConnection().getRepository(User);
    const results = await validateLoginToken(req.cookies);
    console.log(results);
    if(results["IS_VALID"] == true ) {
        let user = await userRepository.findOne({
            select: ["firstName", "lastName", "email", "address", "phoneNumber", "place", "postCode"],
            where: { 
                email: results["EMAIL"]
            }
        });
        return res.json(user);       
    }
    return res.json(results);
}

// SettingsHandle controller (takes request, response from route call)
export const SettingsHandle = async (req: Request, res: Response) => {
    const userRepository = getConnection().getRepository(User);
    const results = await validateLoginToken(req.cookies);
    console.log(results);
    if(results["IS_VALID"] == true ) {
        let user = await userRepository.findOne({
            select: ["firstName", "lastName", "email", "address", "phoneNumber", "place", "postCode"],
            where: { 
                email: results["EMAIL"]
            }
        });
        var USER_SETTINGS = {
            "USER": user,
            "PASSWORD_VALID": false,
            "NEW_PASSWORD_VALID": false,
        }

        if(getSaltedPassword(req.body.old_password, getSaltFromPassword(user.password))==user.password) {
            USER_SETTINGS.PASSWORD_VALID = true;
            let passwordRegex = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{8,})\S$/;
            if(passwordRegex.test(req.body.new_password)) {
                USER_SETTINGS.NEW_PASSWORD_VALID = true;
                await userRepository.update({email: results["EMAIL"]}, {password: getSaltedPassword(req.body.new_password)});
                
            }
            return res.json(USER_SETTINGS);
        }
        return res.json(USER_SETTINGS);
    }
    return res.json(results);
}
