const express = require('express');
const morgan = require('morgan');
const debug = require('debug')('app');
const path = require('path');
const sessions = require('./routes/sessions');
const admin = require('./routes/admin');
const auth = require('./routes/auth');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');


const app = express();

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(session({secret: 'globomantics', resave: true,
saveUninitialized: true}));

require('./src/config/passport.js')(app);

app.use('/sessions', sessions)
app.use('/admin', admin);
app.use('/auth', auth);


app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
    res.render('', {title : 'TechLashie', data : ['Jerald', 'Lashy', 'Jeffery']});
});


const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
    debug(`Listening on port ${port}`);
});
