import User from '../models/Users.js';
import bcrypt from 'bcrypt';

async function SignUpUser(req, res){
    try{

        const { firstname, lastname, email, password} = req.body;

        if (!firstname || !lastname || !email || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
        }

         const existingEmail = await User.findOne({ email });
        if (existingEmail) {
        return res.status(400).json({ success: false, message: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
        firstname,
        lastname,
        email,
        password: hashedPassword
        });

    await newUser.save();

    res.status(201).json({ success: true, message: 'User registered successfully' });
    }catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ success: false, message: 'Signup error', error: error.message });
    }
};

export default SignUpUser;