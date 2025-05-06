import express from 'express';
import cores from 'cors';
import authRouter from './routes/auth.js';
import departmentRouter from './routes/department.js';
import employeeRouter from './routes/employee.js';
import connectDB from './config/db.js';

const app = express();
const PORT = process.env.PORT || 3000;
connectDB();

app.use(cores());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/department', departmentRouter)
app.use('/api/employee', employeeRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});