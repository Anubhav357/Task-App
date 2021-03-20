const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task');

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
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.toJSON = function() {
    user = this;
    //console.log(user);
    user = user.toObject();
    delete user.password;
    delete user.tokens;
    //console.log(user);
    return user;
}

userSchema.methods.generateAuthToken = async function() {
    user = this;
    const token = jwt.sign({ _id: user._id.toString() }, 'Thisismynodejscourse');
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
}
userSchema.statics.findByCredential = async(email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Incorrect Email');
    }
    var check = await bcrypt.compare(password, user.password);
    if (!check) {
        throw new Error('Unable To Login');
    }
    return user;
}

userSchema.pre('save', async function(next) {
    const user = this;
    if (user.isModified('password')) {
        const hashedPassword = await bcrypt.hash(user.password, 8);
        user.password = hashedPassword;
    }
    next();
});

userSchema.pre('remove', async function(next) {
    const user = this;
    const task = await Task.deleteMany({ owner: user._id });
})

const User = mongoose.model('User', userSchema);

module.exports = User;