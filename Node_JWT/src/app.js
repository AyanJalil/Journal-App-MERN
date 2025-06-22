import express from 'express';
import dotenv from 'dotenv';
import connectDB from './configuration/dbConfig.js';
import SignupRoute from './routes/SignupRoute.js';
import AuthenticationRoute from './routes/AuthenticatedRoute.js';
import LoginRoute from './routes/LoginRoute.js';
import LogoutRoute from './routes/LogoutRoute.js';
import JournalRoute from './routes/JournalRoute.js';
import bodyParser from 'body-parser';
import cors from 'cors';

dotenv.config();
const app = express();


app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use('/user', SignupRoute);
app.use('/auth', LoginRoute);
app.use('/api', AuthenticationRoute);
app.use('/user', LogoutRoute);
app.use('/journal', JournalRoute);



const PORT = process.env.PORT || 3000;

connectDB();
app.get('/', (req, res) => {
    res.send('Welcome to the JWT Authentication App');
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
