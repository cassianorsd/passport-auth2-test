const express= require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const app = express();
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
// set view engine
app.set('view engine', 'ejs');
app.use(cookieSession({
	maxAge:  2 * 60 * 1000,
	keys: [keys.session.cookieKey],
}))
//connect to mongodb
mongoose.connect(keys.mongodb.dbURI, ()=>{
	console.log('connected to MongoDB Cluster');
});

// initialize passport 
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth',authRoutes);
app.use('/profile',profileRoutes);
//create home route
app.get('/',(req,res)=>{
	res.render('home', {user: req.user});
})

app.listen(3000,()=>{
	console.log('app now listening for requests on port 3000');
})
