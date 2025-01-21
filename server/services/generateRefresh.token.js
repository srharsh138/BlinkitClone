import UserModel from "../models/user.model.js";
import  jwt  from "jsonwebtoken"

export async function generateRefreshToken(userId, res) {
         const token = jwt.sign({ userId }, process.env.SECRET_KEY, {
                expiresIn: "7d",
            });

            const updateRefreshToken = await UserModel.updateOne(
                { _id: userId },
                { refresh_token: token }
            )
            res.cookie("refreshToken", token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24,
            });
            return token;

}
