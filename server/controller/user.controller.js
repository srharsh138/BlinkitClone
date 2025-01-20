import sendEmail from '../config/sendEmail.js';
import UserModel from '../models/user.model.js';
import  {hashPassword}  from '../services/hash.password.js';
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js';

// export  async function registerUserController(req, res) {
//   try {
//     const {name,email,password} = req.body;
//     if(!name || !email || !password) {
//         return res.status(400).json({message: 'All fields are required', success: false});
    
//     }
//     const user=await UserModel.findOne({email});
//     if(user) {
//         return res.status(400).json({message: 'User already exists', success: false});
//     }
//       const hashpassword = await hashPassword(password);

//      const newUser= new UserModel({ 
//         name,
//         email,
//         password:hashpassword
//     });
//     await newUser.save();

//     const VerifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?token=${newUser._id}`;
//     console.log(`Sending email to: ${email}`);

//     const verifyEmail=await sendEmail({
//         to:email,
//         subject:'Verify your email from blinkit',
//         html: verifyEmailTemplate({
//             name,
//             link: VerifyEmailUrl
//         })
//     })

//    return res.status(201).json({message: 'User created successfully', success: true, data: newUser});


//   } catch (error) {
//     res.status(500).send(error);    
//   }
// }
export async function registerUserController(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required', success: false });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format', success: false });
    }

    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists', success: false });
    }

    const hashpassword = await hashPassword(password);

    const newUser = new UserModel({
      name,
      email,
      password: hashpassword,
    });
    await newUser.save();

    const VerifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?token=${newUser._id}`;
    console.log(`Sending email to: ${email}`);

    await sendEmail({
      to: String(email),
      subject: 'Verify your email from Blinkit',
      html: verifyEmailTemplate({
        name,
        link: VerifyEmailUrl,
      }),
    });

    return res.status(201).json({ message: 'User created successfully', success: true, data: newUser });
  } catch (error) {
    console.error('Error in registerUserController:', error);
    res.status(500).json({ message: 'Internal server error', success: false, error });
  }
}

