const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;


const userSchema = new Schema({
        firstName: {
            type: String,
        },
        middleName: {
            type: String,
        },
        surName: {
            type: String,
        },
        image: {
            type: String,
        },
        username: {
            type: String,
            required: [true, 'Username required'],
            unique: true,
        },
        permission: {
            chat: {C: Boolean, R: Boolean, U: Boolean, D: Boolean,},
            news: {C: Boolean, R: Boolean, U: Boolean, D: Boolean,},
            settings: {C: Boolean, R: Boolean, U: Boolean, D: Boolean,}
        },
        password: {
            type: String,
            required: [true, 'Password required']
        },
    },
    {
        timestamps: true
    }
);

userSchema.methods.setPassword = function(password) {
    this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

userSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('user', userSchema);