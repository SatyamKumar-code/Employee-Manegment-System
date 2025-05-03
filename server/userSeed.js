import User from './models/User.js';
import bcrypt from 'bcrypt';
import connectDB from './config/db.js';

const userRegister = async () => {
    connectDB();
    try {
        const hashPassword = await bcrypt.hash("admin", 10);
        const newUser = new User({
            name: "Admin",
            email: "admin@gmail.com",
            password: hashPassword,
            role: "admin",
        })
        await newUser.save();
    }
    catch (error) {
        console.error('Error seeding users:', error);
    }
}

userRegister();