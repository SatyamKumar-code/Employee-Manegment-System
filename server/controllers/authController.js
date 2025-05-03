import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, error: "User Not found"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, error: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id, role: user.role },process.env.JWT_SECRET, process.env.JWT_EXPIRES_IN);
        res.status(200).json({
            success: true,
            token,
            user: {
                _id: user._id,
                name: user.name,
                role: user.role
            }
        });
    }
    catch (error) {
        console.error("authController file in login :",error.message);
        res.status(500).json({ success: false, error: error.message });
    }
}


export { login };