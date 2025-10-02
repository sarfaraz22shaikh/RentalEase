import user from '../models/user.js';

const rendersignup = (req, res) => {
    res.render('../views/user/signup.ejs');
}

const signup = async(req, res) => {

    const { username, email, password } = req.body;
    console.log(username, email, password);
    const newuser = await user.register({ email: email, username: username },
        password
    );
    console.log(newuser);
    req.logIn(newuser, (err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "Welcome to Wanderlust!");
        res.redirect('/listings');
    })
}

const renderlogin = (req, res) => {
    res.render('../views/user/login.ejs');
}

const login = (req, res) => {
    req.flash("success", "Welcome back!");
    console.log("this is original url", req.originalUrl);
    res.redirect('/listings');
}

const logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "Logged you out!");
        res.redirect('/listings');
    });
}

export default { rendersignup, signup, renderlogin, login, logout };