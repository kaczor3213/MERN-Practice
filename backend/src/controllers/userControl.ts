import {validateUserCreate, validateUserLogin, validateUserAccessToken} from "../validators/userValidator";
import {generateAccessToken} from "../bin/accesTokenGenerator";
import {Request, Response} from "express";
import {getConnection} from "typeorm";
import {User} from "../entity/User";
import { DH_CHECK_P_NOT_SAFE_PRIME } from "constants";
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
        return res.send(user);
        //return res.redirect('/login');
    }
    return res.json(results);
}

// Login controller (takes request, response from route call)
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
            "USER": {
                "firstName": user[0].firstName,
                "lastName": user[0].lastName,
                "email": user[0].email,
            },
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
            "USER": {
                "firstName": user[0].firstName,
                "lastName": user[0].lastName,
                "email": user[0].email,
            },
            "ORDER": _order
        }
        return res.json(USER_ORDER);
    }
    return res.json(results);
}
