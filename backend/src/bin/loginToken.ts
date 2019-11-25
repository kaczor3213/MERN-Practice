require('dotenv').config({ path: '../../.env' })
import {AES} from 'crypto-ts';

export function generateHashedToken(user_email: string, timestamp: string = Date.now().toString()): string {
    let Token = {
        email: user_email,
        date: timestamp
    }
    var hashedToken = AES.encrypt(JSON.stringify(Token), process.env["TOKEN_KEY"]).toString();
    return hashedToken; 
}

export function decryptHashedToken(hashedToken: string) {
    let Token = JSON.parse(AES.decrypt(hashedToken, process.env["TOKEN_KEY"]).toString()) ;
    return Token;
}