// Instantiate Express and the application - DO NOT MODIFY
const express = require('express');
const app = express();

// Import environment variables in order to connect to database - DO NOT MODIFY
require('dotenv').config();

// Import Op to perform comparison operations in WHERE clauses - DO NOT MODIFY
const { Op } = require("sequelize");

// Import the models used in these routes - DO NOT MODIFY
const { Store, Instrument } = require('./db/models');

// Express using json - DO NOT MODIFY
app.use(express.json());


//test route
app.get('/', async (req, res, next) => {
    res.json({hey:'hello'});
});


// STEP 1: Apply a default scope onto the searches
// List of all the instruments in the database - DO NOT MODIFY
app.get('/instruments', async (req, res, next) => {
    const allInstruments = await Instrument.findAll()

    res.json(allInstruments);
});

// STEP 2: Implement named scopes to their respective routes
app.get('/instruments/keyboard', async (req, res, next) => {

    let word = req.route.path.split('/').pop()
    console.log(word);

    // const keyboards = await Instrument.scope({method:['hasType', req.route.path.split('/').pop()]}).findAll()
    const keyboards = await Instrument.scope('isKeyboard')
    
    res.json(keyboards);
});


app.get('/instruments/string', async (req, res, next) => {
    // const strings = await Instrument.scope({method:['hasType', "string"]}).findAll()
    const strings = await Instrument.scope('isString')


    res.json(strings);
});

app.get('/instruments/woodwind', async (req, res, next) => {
    // const woodWinds = await Instrument.scope({method:['hasType', "woodwind"]}).findAll()
    const woodWinds = await Instrument.scope('isWoodwind')

    res.json(woodWinds);
});

// STEP 3 CHALLENGE: Implement the named function scopes to their dynamic routes
// and returning the list in order by their names alphabetically
app.get('/stores/:storeId/instruments', async (req, res, next) => {
    const filterStoreInstruments = await Instrument.findAll()
    // Your code here
    res.json(filterStoreInstruments);
});

app.get('/stores/:storeId/instruments/:type', async (req, res, next) => {
    // const filteredInstruments = await Instrument.findAll()
    let type = req.params.type;
    const filteredInstruments = await Instrument.scope({method:['hasType', type]}).findAll()
    res.json(filteredInstruments);
});

// List of all the stores in the database - DO NOT MODIFY
app.get('/stores', async (req, res, next) => {
    const allStores = await Store.findAll()

    res.json(allStores)
});

// Root route - DO NOT MODIFY
app.get('/', (req, res) => {
    res.json({
        message: "API server is running"
    });
});

// Set port and listen for incoming requests - DO NOT MODIFY
const port = 5005;
app.listen(port, () => console.log('Server is listening on port', port));