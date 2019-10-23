import {validateUserCreate, validateUserLogin} from "../validators/userValidator";
import {generateAccessToken} from "../bin/accesTokenGenerator";
import {Request, Response} from "express";
import {getConnection} from "typeorm";
import {User} from "../entity/User";

export const LOGIN_TIMEOUT = 1800;

// Login controller (takes request, response from route call)
export const Login = async (req: Request, res: Response) => {
    const userRepository = getConnection().getRepository(User);
    const results = await validateUserLogin(req.body);
    console.log(results);
    if(results["TOTAL_WARNINGS"] == 0) {
        let a_token = generateAccessToken(results["EMAIL"], req.headers["user-agent"]);
        await userRepository.update({email: results["EMAIL"]}, {access_token: a_token});
        // SET COOKIE ISLOGGEDON: TRUE
        res.cookie("isLoggedOn",true,{ expires: new Date(Date.now() + LOGIN_TIMEOUT), httpOnly: true});
        // SET AUTHORIZATION COOKIE FOR USER
        res.cookie("accessToken", a_token, { expires: new Date(Date.now() + LOGIN_TIMEOUT), httpOnly: true});
        return res.json(results);
        //return res.redirect('/myprofile');       
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
        await userRepository.save(user);
        return res.send(user);
        //return res.redirect('/login');
    }
    return res.json(results);
}