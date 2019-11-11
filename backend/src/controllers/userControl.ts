import {validateUserCreate, validateUserLogin, validateUserAccessToken} from "../validators/userValidator";
import {generateAccessToken} from "../bin/accesTokenGenerator";
import {Request, Response} from "express";
import {getConnection} from "typeorm";
import {User} from "../entity/User";
import {getSaltedPassword, getSaltFromPassword} from "../bin/salting";
export const LOGIN_TIMEOUT = 1800;

// Login controller (takes request, response from route call)
export const Login = async (req: Request, res: Response) => {
    const userRepository = getConnection().getRepository(User);
    const results = await validateUserLogin(req.body);
    console.log(results);
    if(results["TOTAL_WARNINGS"] == 0) {
        let a_token = generateAccessToken(results["EMAIL"], req.headers["user-agent"]);
        await userRepository.update({email: results["EMAIL"]}, {access_token: a_token});
        // SET COOKIE PROFILE: EMAIL
        res.cookie("email",results["EMAIL"],{ expires: new Date(Date.now() + LOGIN_TIMEOUT), httpOnly: true});
        // SET COOKIE ISLOGGEDON: TRUE
        res.cookie("is_logged_on",true,{ expires: new Date(Date.now() + LOGIN_TIMEOUT), httpOnly: true});
        // SET AUTHORIZATION COOKIE FOR USER
        res.cookie("access_token", a_token, { expires: new Date(Date.now() + LOGIN_TIMEOUT), httpOnly: true});
        return res.json(results);
        //return res.redirect('/myprofile');       
    }
    return res.json(results);
}

// Logout controller (takes request, response from route call)
export const Logout = async (req: Request, res: Response) => {
    console.log(req.cookies)
    const userRepository = getConnection().getRepository(User);
    const results = await validateUserAccessToken(req.cookies);
    console.log(results);
    if(results["IS_VALID"] == true) {
        
        await userRepository.update({email: results["EMAIL"]}, {access_token: null});
        res.clearCookie("access_token");
        res.clearCookie("profile");
        res.cookie("is_logged_on", false);
        return res.json(results);
        //res.redirect("/");
    }
    return res.json(results);
}

// SingUp controller (takes request, response from route call)
export const SignUp = async (req: Request, res: Response) => {
    const userRepository = getConnection().getRepository(User);
    const results = await validateUserCreate(req.body);
    console.log(results);
    // dorobić solenie hasła
    if(results["TOTAL_WARNINGS"] == 0) {
        let user = await userRepository.create(req.body);
        await userRepository.save(user);
        return res.json(results);
    }
    return res.json(results);
}

// Profile controller (takes request, response from route call)
export const Profile = async (req: Request, res: Response) => {
    const userRepository = getConnection().getRepository(User);
    const results = await validateUserAccessToken(req.cookies);
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
    const results = await validateUserAccessToken(req.cookies);

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
    const results = await validateUserAccessToken(req.cookies);

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
    const results = await validateUserAccessToken(req.cookies);
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
    const results = await validateUserAccessToken(req.cookies);
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
