require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require("node:path");
const authenticateToken = require('./middleware/authenticateToken');
const bodyParser = require('body-parser');

const postsRouter = require('./routes/postsRouter');
const usersRouter = require('./routes/usersRouter');
const authRouter = require('./routes/authRouter');

const app = express();

// TODO: configure CORS for deployment
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json({ limit: '50mb' })); // Increase payload size limit
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' })); // Increase payload size limit
app.use(authenticateToken)
app.use((req, res, next) => {
    console.log(req.method, req.url);
    next()
})

app.use('/api/posts', postsRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);

app.use((err, req, res, next) => {
    console.error(`ERROR: ${req.method} ${req.url}`, {
        user: req.user ? req.user.username : 'Unauthenticated user',
        body: req.body,
        error: err.stack
    });
    res.status(err.statusCode).json({
        success: false,
        status: err.statusCode || 500,
        message: err.message || 'Internal server error',
    });
});

const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => console.log("Listening on port 3000..."));