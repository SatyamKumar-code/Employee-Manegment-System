import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const verifyUser = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(400).json({ success: false, error: "Authorization header missing or invalid" });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(404).json({ success: false, error: "Token Not Provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded || !decoded.id) {
            return res.status(401).json({ success: false, error: "Token Not Valid or Missing User ID" });
        }

        const user = await User.findById({_id: decoded.id}).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, error: "User Not Found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Error in authMiddleware:", error.message);
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

export default verifyUser;