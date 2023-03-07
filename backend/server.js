const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;
const projectRouter = require('./routes/projectRoutes.js');
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const postRouter = require('./routes/postRoutes');

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/projects', projectRouter);
app.use('/api/posts', postRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

app.use(errorHandler);
app.listen(port, () => console.log(`Server started on port ${port}`));
