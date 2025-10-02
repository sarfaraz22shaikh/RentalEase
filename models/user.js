import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import passport from 'passport';
import LocalStrategy from 'passport-local';
import passportLocalMongoose from 'passport-local-mongoose';

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    // username and password fields will be added by passportLocalMongoose
});

userSchema.plugin(passportLocalMongoose);

let user = mongoose.model('User', userSchema);
export default user;