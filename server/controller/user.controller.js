import sendEmail from '../config/sendEmail.js';
import UserModel from '../models/user.model.js';
import { comparePassword } from '../services/compare.password.js';
import generateToken from '../services/generate.token.js';
import { generateRefreshToken } from '../services/generateRefresh.token.js';
import  {hashPassword}  from '../services/hash.password.js';
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js';


export async function registerUserController(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Provide email, name, and password.",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });

    if (user) {
      return res.json({
        message: "Email is already registered.",
        error: true,
        success: false,
      });
    }

    const hashedpassword = await hashPassword(password);

    const payload = {
      name,
      email,
      password: hashedpassword,
    };

    const newUser = new UserModel(payload);
    const save = await newUser.save();
    const VerifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`;
    await sendEmail(
      save.email, 
      "Verify email from binkeyit",
      verifyEmailTemplate({
        name,
        url: VerifyEmailUrl,
      })
    );

    return res.json({
      message: "User registered successfully.",
      error: false,
      success: true,
      data: save,
    });
  } catch (error) {
   
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
export async function verifyEmailController(req,res) {
  try {
    const { code } = req.body;
    const user = await UserModel.findOne({ _id :code });
    if(!user){
      return res.status(400).json({
        message: "Invalid verification code",
        error: true,
        success: false,
      });
    }
    const updateUser=await UserModel.updateOne({_id:code},{verify_email:true});

    return res.json({
      message: "Email verified successfully.",
      error: false,
      success: true,
      data: updateUser,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
export async function loginController(req,res) {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "user not found",
        error: true,
        success: false,
      });
    }
     if(user.status !=="Active"){
         return res.status(400).json({
        message: "User is not active",
        error: true,
        success: false,
        });
     }

    const isValidPassword = await comparePassword(password, user.password);
    if(!isValidPassword){
      return res.status(400).json({
        message: "Invalid credentials",
        error: true,
        success: false,
      });
    }
    const accessToken = await generateToken(user._id,res);
    const refreshToken = await generateRefreshToken(user._id,res);


    return res.json({
      message: "User logged in successfully.",
      error: false,
      success: true,
      data: { user, accessToken, refreshToken },
    });


  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

