const User = require('../models/User');
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//  registration function
exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // new user with hashed password and initial OTP (set to null)
        user = new User({ name, email, password: hashedPassword, otp: null, otpExpiry: null });
        await user.save();

        // Generate OTP (6 characters, letters, and numbers)
        const otp = otpGenerator.generate(6, { upperCase: true, specialChars: false, alphabets: true });
        console.log(`Generated OTP for ${email}: ${otp}`); // Log the OTP for debugging

        // Set OTP and expiry time
        user.otp = otp;
        user.otpExpiry = Date.now() + 5 * 60 * 1000; // for 5 min
        await user.save();

        // Send OTP to user's email with a stylish template
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL, // Your email
                pass: process.env.EMAIL_PASSWORD // Your email password
            }
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Your OTP Code',
            html: `
                <html>
                <body style="font-family: Arial, sans-serif; background-color: #f2f2f2; padding: 20px;">
                    <div style="background-color: white; border-radius: 5px; padding: 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">
                        <h2 style="color: #333;">Welcome to Our Crowdfunding Platform!</h2>
                        <p style="color: #555;">Thank you for registering. Please use the OTP below to verify your email address:</p>
                        <h3 style="color: #333; font-size: 24px;">${otp}</h3>
                        <p style="color: #555;">This OTP is valid for 5 minutes.</p>
                        <p style="color: #555;">If you did not register, please ignore this email.</p>
                    </div>
                </body>
                </html>
            `
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'User registered successfully. Please check your email for the OTP.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


// OTP verification function
exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ email });
        
        // Check if user exists and validate OTP
        if (!user || user.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        // Check if OTP is expired
        if (Date.now() > user.otpExpiry) {
            return res.status(400).json({ message: 'OTP has expired' });
        }

        // OTP is valid
        user.otp = null; // Clear the OTP after successful verification
        user.otpExpiry = null; // Clear the expiry time
        await user.save();

        res.status(200).json({ message: 'OTP verified successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};



// User login function

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};