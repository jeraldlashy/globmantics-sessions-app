const express = require('express');
// const sessions = require('../src/data/sessions.json');
const debug = require('debug')('app:sessions');
const {MongoClient, ObjectId} = require('mongodb');

const router = express.Router();


router.get('/', (req, res) => {

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
            const sessions = await db.collection('sessions').find().toArray();
            res.render('sessions',  {sessions});

        } catch (error) {
            debug(error.stack);
        }

    }());

    });

router.get('/:id',(req, res) => {
    const id = req.params.id;

    const url = 'mongodb://localhost';
    const dbname = 'globomantics';

    (async function mongo(){
        try {
            // connect to db
            const client = await MongoClient.connect(url);
            debug('Connected to the Mongodb')

            //set db name
            const db = client.db(dbname)

            //get session into a collection
            const session = await db
                .collection('sessions')
                .findOne({ _id : new ObjectId(id)

            });

            res.render('session',  { session });

        } catch (error) {
            debug(error.stack);
        }

    }());
    });

module.exports = router;