import jwt from "jsonwebtoken";

function createAccessToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload, 
            'Token_secret123', 
            { 
                expiresIn: "1d", 
            }, 
            (err, token) => {
            if (err) reject(err)
                resolve(token)

            }
        );
    });
}
export default createAccessToken;