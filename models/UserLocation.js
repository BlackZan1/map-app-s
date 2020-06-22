const { Schema, model } = require('mongoose');

const UserLocationSchema = new Schema({
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    latitudeDelta: {
        type: Number,
        default: 0.0522
    },
    longitudeDelta: {
        type: Number,
        default: 0.0321
    }
})

module.exports = model('UserLocation', UserLocationSchema)