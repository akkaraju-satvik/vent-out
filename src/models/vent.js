const mongoose = require('mongoose');

const ventSchema = new mongoose.Schema(
    {
        data: {
            trim: true,
            required: true,
            type: String
        }
    },
    {
        timestamps: true
    }
)

const Vent = mongoose.model('Vent', ventSchema)

module.exports = Vent