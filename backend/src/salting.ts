import * as crypto from 'crypto';

function genRandomString(length) {
    return crypto.randomBytes(Math.ceil(length/2))
    .toString('hex') /** convert to hexadecimal format */
    .slice(0,length);   /** return required number of characters */
};

function sha512(password: string, salt: string) {
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512, depending on random salt */
    hash.update(password); /**updating hash with our password */
    var value = hash.digest('hex'); /** retrieving salted password */
    return {
        salt:salt,
        passwordHash: value
    };
};

function getSaltedPassword(userpassword: string, salt: string = genRandomString(16)): string{
    var passwordData = sha512(userpassword, salt);/** Gives us salt of length 16, then generate hash */
    return passwordData.salt+passwordData.passwordHash; /**return our salt + password */
}

function getSaltFromPassword(userpassword: string): string {
    let salt: string = userpassword.substring(0,16); /** Gives us salt of length 16 */
    return salt;
}

function checkPassword(userpassword: string, salteduserpassword: string): boolean {
    if(getSaltedPassword(userpassword,getSaltFromPassword(salteduserpassword)) == salteduserpassword)
        return true;
    return false
}