import express from 'express';
import cores from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cores());
app.use(express.json());


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});