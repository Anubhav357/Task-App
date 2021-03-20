const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value))
                throw new error('Invalid email address');
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password'))
                throw new error("Your password can't be negative")
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0)
                throw new error("Age can't be negative");
        }
    }
});

userSchema.static.findByCredential = async(email, password) => {
    const user = await User.findOne({ email });
    var check = await bcrypt.compare(password, user.password);
}

userSchema.pre('save', async function(next) {
    const user = this;
    if (user.isModified('password')) {
        const hashedPassword = await bcrypt.hash(user.password, 8);
        user.password = hashedPassword;
    }
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;