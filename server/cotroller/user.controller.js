import sendEmail from '../config/sendEmail';
import UserModel from '../models/user.model';
import  {hashPassword}  from '../services/hash.password';
import verifyEmailTemplate from '../utils/verifyEmailTemplate';

export async function registerUserController(req, res) {
  try {
    const {name,email,password} = req.body;
    if(!name || !email || !password) {
        return res.status(400).json({message: 'All fields are required', success: false});
    
    }
    const user=await UserModel.findOne({email});
    if(user) {
        return res.status(400).json({message: 'User already exists', success: false});
    }
      const hashpassword = await hashPassword(password);

     const newUser= new UserModel({ 
        name,
        email,
        password:hashpassword
    });
    await newUser.save();

    const VerifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?token=${newUser._id}`;

    const verifyEmail=await sendEmail({
        to:email,
        subject:'Verify your email from blinkit',
        html: verifyEmailTemplate({
            name,
            link: VerifyEmailUrl
        })
    })

    res.status(201).json({message: 'User created successfully', success: true, data: newUser});


  } catch (error) {
    res.status(500).send(error);    
  }}
