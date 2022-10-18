const express = require('express');
const debug = require('debug')('app:admin');
const {MongoClient} = require('mongodb');
const sessions = require('../src/data/sessions.json');

const admin = express.Router();

admin.get('/', (req, res) => {

    const url = 'mongodb://localhost';
    const dbname = 'globomantics';

    (async function mongo(){
        try {
            // connect to db
            const client = await MongoClient.connect(url);
            debug('Connected to the Mongodb')

            //set db name
            const db = client.db(dbname)

            //import data into a collection
            const response = await db.collection('sessions').insertMany(sessions);
            res.json(response);

        } catch (error) {
            debug(error.stack);
        }

    }());

});

module.exports = admin;