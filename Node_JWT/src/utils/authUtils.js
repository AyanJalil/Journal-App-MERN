import jwt from 'jsonwebtoken';
import secretKey from '../configuration/jwtConfig.js';

export const generateToken = (user) => {
    const payload = {
        id: user._id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname
    };

    const options = { expiresIn: '1h' };

    return jwt.sign(payload, secretKey, options);
};

export const verifyToken = (token) => {
    return jwt.verify(token, secretKey); 
};

export const generateRefreshToken = (user) => {
    const payload = { id: user._id, email: user.email };
    const options = { expiresIn: '7d' };

    return jwt.sign(payload, secretKey, options);
};
