const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const morgan = require('morgan');
//Middleware

//Route files
const bootcamp = require('./routes/bootcamps');

//Load env vars
dotenv.config({ path: './config/config.env' });

const app = express();

//Dev loggin middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

//Mount routes
//app.use(`${apiVersion}/bootcamps`, bootcamp);
router.use('/bootcamps', bootcamp);

app.use('/api/v1', router);

const PORT = process.env.PORT || 5000;

app.listen(
    PORT,
    console.log(
        `Server running in "${process.env.NODE_ENV}" mode on port ${PORT}`
    )
);
