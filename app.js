const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'PUT, GET, OPTIONS');

    if(req.method === 'OPTIONS') return res.sendStatus(200);

    next();
})

const graphqlSchema = require('./graphql/schema');

app.use('/api', graphqlHTTP({
    schema: graphqlSchema,
    graphiql: true
}))

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log('Server is running. http://localhost:' + process.env.PORT);
    })
})
.catch((err) => {
    console.log(err);
})