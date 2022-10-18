const { render } = require('ejs');
const express = require('express');
const debug = require('debug')('app:auth');
const {MongoClient, ObjectId} = require('mongodb');
const passport = require('passport');

const auth = express.Router();

auth.post('/signUp', (req, res) => {
    //Create User
    const {username, password} = req.body;

    const url = 'mongodb://localhost';
    const dbname = 'globomantics';

    (async function addUser(){
        let client;
        try {
            // connect to db
            client = await MongoClient.connect(url);
            debug('Connected to the Mongodb')

            //set db name
            const db = client.db(dbname)

            //import data into a collection
            const user = {username, password};
            const results = await db.collection('users').insertOne(user);
            debug(results);

            req.login(results.insertedId, ()=>{
                res.redirect('/auth/profile');
            });

        } catch (error) {
            debug(error.stack);
        }
        client.close();
    })();
});

auth.get('/profile', (req, res) => {
    res.json(req.user);
});


// auth
//     .get('/signIn', (req, res) => {
//         res.render('signIn');
//         })
//     .post(passport.authenticate('local', {
//         successRedirect: '/auth/profile',
//         failureMessage: '/'
//     }));


module.exports = auth;
