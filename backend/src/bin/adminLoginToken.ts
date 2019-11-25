require('dotenv').config({ path: '../../.env' })
import {AES} from 'crypto-ts';

export function generateHashedToken(user_email: string, browser_data, timestamp: string = Date.now().toString()): string {
    let Token = {
        email: user_email,
        browser: browser_data,
        date: timestamp
    }
    var hashedToken = AES.encrypt(JSON.stringify(Token), process.env["ADMIN_KEY"]).toString();
    return hashedToken; 
}

export function decryptHashedToken(hashedToken: string) {
    let Token = JSON.parse(AES.decrypt(hashedToken, process.env["ADMIN_KEY"]).toString()) ;
    return Token;
}