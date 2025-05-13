import express from 'express';
import cores from 'cors';
import authRouter from './routes/auth.js';
import departmentRouter from './routes/department.js';
import employeeRouter from './routes/employee.js';
import salaryRouter from './routes/salary.js';
import leaveRouter from './routes/leave.js'
import connectDB from './config/db.js';

const app = express();
const PORT = process.env.PORT || 3000;
connectDB();

app.use(cores());
app.use(express.json());
app.use(express.static('public/uploads'));
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', authRouter);
app.use('/api/department', departmentRouter);
app.use('/api/employee', employeeRouter);
app.use('/api/salary', salaryRouter);
app.use('/api/leave', leaveRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});