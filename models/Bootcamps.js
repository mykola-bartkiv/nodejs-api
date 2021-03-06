const mongoose = require('mongoose');
const slugify = require('slugify');
const geocoder = require('../utils/geocoder');

const BootcampShema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        maxlength: [50, 'Name can not be more than 50 characters'],
    },
    slug: String,
    description: {
        type: String,
        required: [true, 'Please add a desription'],
        unique: true,
        maxlength: [500, 'Name can not be more than 500 characters'],
    },
    website: {
        type: String,
        match: [
            /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
            'Please use a valid URL with HTTP or HTTPS',
        ],
    },
    phone: {
        type: String,
        maxlength: [20, 'Phone number can not be more than 20 characters'],
    },
    email: {
        type: String,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please add a valid email',
        ],
    },
    address: {
        type: String,
        required: [true, 'Please add an address'],
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
        },
        coordinates: {
            type: [Number],
            required: false,
            index: '2dsphere',
        },
        formatAddress: String,
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country: String,
    },
    careers: {
        type: [String],
        required: true,
        enum: [
            'Web Development',
            'Mobile Development',
            'UI/UX',
            'Data Science',
            'Business',
            'Other',
        ],
    },
    averageRating: {
        type: Number,
        min: [1, 'Rating must be at least 1'],
        max: [10, 'Rating must be at least 10'],
    },
    averageCost: Number,
    photo: {
        type: String,
        default: 'no-photo.jpg',
    },
    housing: {
        type: Boolean,
        default: false,
    },
    jobAssistance: {
        type: Boolean,
        default: false,
    },
    jobGuarantee: {
        type: Boolean,
        default: false,
    },
    acceptGi: {
        type: Boolean,
        default: false,
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
});

//Create bootcamp slug from name
BootcampShema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

// Geocode & create location field
BootcampShema.pre('save', async function (next) {
    const loc = await geocoder.geocode(this.address);
    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formatAddress: loc[0].formattedAddress,
        street: loc[0].streetName,
        city: loc[0].city,
        state: loc[0].stateCode,
        zipcode: loc[0].zipcode,
        country: loc[0].countryCode,
    };

    // Do not save address in DB
    this.address = undefined;

    next();
});

module.exports = mongoose.model('Bootcamp', BootcampShema);
