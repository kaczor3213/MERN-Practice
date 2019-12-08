require('dotenv').config({ path: '../../.env' })
import * as Crypto from 'crypto-ts';
import { stringify } from 'querystring';

export function generateHashedToken(user_email: string, user_agent: string, timestamp: string = Date.now().toString()): string {
    let Token = {
        email: user_email,
        agent: user_agent, 
        date: timestamp
    }
    var hashedToken = Crypto.AES.encrypt(JSON.stringify(Token), process.env["TOKEN_KEY"]).toString();
    return hashedToken; 
}

export function decryptHashedToken(hashedToken: string) {
    var Token = JSON.parse(Crypto.AES.decrypt(decodeURIComponent(hashedToken), process.env["TOKEN_KEY"]).toString(Crypto.enc.Utf8));
    return Token;
}