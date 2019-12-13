require('dotenv').config({ path: '../../.env' })
import * as Crypto from 'crypto-ts';
import { stringify } from 'querystring';

export function generateHashedToken(user_email: string, user_agent: string, token: string, timestamp: string = Date.now().toString()): string {
    let Token = {
        email: user_email,
        agent: user_agent, 
        date: timestamp
    }
    var hashedToken = Crypto.AES.encrypt(JSON.stringify(Token), process.env[token]).toString();
    return hashedToken; 
}

export function decryptHashedToken(hashedToken: string, token: string) {
    var Token = JSON.parse(Crypto.AES.decrypt(decodeURIComponent(hashedToken), process.env[token]).toString(Crypto.enc.Utf8));
    return Token;
}