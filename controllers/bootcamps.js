const Bootcamp = require('../models/Bootcamps');

// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getBootcamps = async (req, res, next) => {
    try {
        const bootcamps = await Bootcamp.find();
        res.status(200).json({
            success: true,
            msg: `Show all bootcamps`,
            data: bootcamps,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
        });
    }
};

// @desc    Get single bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Public
exports.getBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findById(req.params.id);

        if (!bootcamp) {
            return res.status(400).json({ success: false });
        }
        res.status(200).json({
            success: true,
            msg: `Get bootcamp ${req.params.id}`,
            data: bootcamp,
        });
    } catch (error) {
        res.status(400).json({ success: false });
    }
};

// @desc    Update bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Privare
exports.updateBootcamp = (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: `Update bootcamp ${req.params.id}`,
    });
};

// @desc    Greate new bootcamp
// @route   POST /api/v1/bootcamps
// @access  Private
exports.createBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.create(req.body);
        res.status(201).json({
            success: true,
            msg: `Create new bootcamp`,
            data: bootcamp,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
        });
    }
};

// @desc    Delete bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
exports.deleteBootcamp = (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: `Delete bootcamp ${req.params.id}`,
    });
};
