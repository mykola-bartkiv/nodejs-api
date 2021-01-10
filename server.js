const e = require('express');
const express = require('express');
const dotenv = require('dotenv');

//Route files
const bootcamp = require('./routes/bootcamps');

//Load env vars
dotenv.config({ path: './config/config.env' });

const app = express();
const router = express.Router();

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
