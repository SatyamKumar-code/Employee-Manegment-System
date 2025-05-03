import express from 'express';
import cores from 'cors';
import authRouter from './routes/auth.js';
import connectDB from './config/db.js';

const app = express();
const PORT = process.env.PORT || 3000;
connectDB();

app.use(cores());
app.use(express.json());
app.use('/api/auth', authRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});