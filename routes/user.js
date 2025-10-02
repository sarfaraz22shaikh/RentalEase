import express from 'express';
const route = express.Router();
import user from '../models/user.js';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import { isLoggedIn, saveredirecturl, reviewAuthor } from '../views/user/middleware.js';
import usercontroller from '../controller/user.js';

route.get('/signup', usercontroller.rendersignup);

route.post('/signup', usercontroller.signup);

route.get('/login', usercontroller.renderlogin);

route.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
}), usercontroller.login);

route.get('/logout', usercontroller.logout);

export default route;