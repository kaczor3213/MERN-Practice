// require('dotenv').config({ path: '../../.env' })
// import * as crypto from 'crypto';

// export function genSalt(length) {
//     return crypto.randomBytes(Math.ceil(length/2))
//     .toString('hex') /** convert to hexadecimal format */
//     .slice(0,length);   /** return required number of characters */
// };

// export function sha512(token: string, salt: string = genSalt(8)) {
//     var hash = crypto.createHmac('sha512', salt);
//     hash.update(token);
//     var value = hash.digest('hex');
//     return {
//         salt:salt,
//         accessToken: value
//     };
// };

// export function generateAccessToken(user_email: string, browser_data: string, timestamp: string = Date.now().toString()): string {
//     var to_be_retuned = sha512(user_email+timestamp+browser_data)
//     return to_be_retuned.salt + to_be_retuned.accessToken; 
// }

// export function generateAdminAccessToken(user_email: string, browser_data: string, timestamp: string = Date.now().toString()): string {
//     console.log(process.env["ADMIN_KEY"]);
//     var to_be_retuned = sha512(user_email+timestamp+browser_data+process.env["ADMIN_KEY"]);
//     return to_be_retuned.salt + to_be_retuned.accessToken; 
// }