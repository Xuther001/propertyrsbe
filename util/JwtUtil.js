import jwt from 'jsonwebtoken';

const secretKey = 'secret';

export const generateToken = (user) => {
    return jwt.sign(
        {
            user_id: user.user_id,
            username: user.username,
            email: user.email
        },
        secretKey
    );
};