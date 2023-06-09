const cookieParser  = require('cookie-parser');
const session  = require('express-session');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const userRouter = require('./src/routes/user.route');
const userProgressRouter = require('./src/routes/userProgress.route');
const stageRouter = require('./src/routes/stage.route');
const cors = require('cors');

app.use(express.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

// cors config

const corsGeneralConfig = {
	origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}

const corsCredentialsConfig = {
	origin: process.env.FRONTEND_URL || 'http://localhost:5173',
	credentials: true,
};

// routes

app.get('/health', (req, res) => {
    res.status(200).json({message: 'Request successfuly processed'});
});
app.use('/users', cors(corsCredentialsConfig), userRouter);
app.use('/users-progress', cors(corsCredentialsConfig), userProgressRouter);
app.use('/stages', cors(corsGeneralConfig), stageRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({'message': err.message});
    return;
});

// session

app.use(cookieParser());

let secretKey=Math.random().toString();
app.use(session({
	secret: secretKey,
	cookie: {
		maxAge: 1800000,
		secure: false, // true only works with https
	},
	saveUninitialized: false,
	resave: false,
	unset: 'destroy'
}));

app.listen(port, '0.0.0.0', () => {
    console.log(`Nikken app listening at http://localhost:${port}`)
});
