const express = require('express');
const {
    getBootcamps,
    getBootcamp,
    updateBootcamp,
    createBootcamp,
    deleteBootcamp,
    getBootcamsInRadius,
} = require('../controllers/bootcamps');
const geocoder = require('../utils/geocoder');
const router = express.Router();

router.route('/radius/:zipcode/:distance').get(getBootcamsInRadius);

router.route('/').get(getBootcamps).post(createBootcamp);

router
    .route('/:id')
    .get(getBootcamp)
    .put(updateBootcamp)
    .delete(deleteBootcamp);

module.exports = router;
