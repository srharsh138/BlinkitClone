import jwt from 'jsonwebtoken';
export default function generateToken(userId,res) {
    const token = jwt.sign({ userId }, process.env.SECRET_KEY, {
        expiresIn: "1d",
    });
    res.cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
    });
    return token;
}