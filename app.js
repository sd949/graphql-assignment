const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');
const isAuth = require('./middleware/is-auth');

const app = express();

app.use(bodyParser.json());

app.use(isAuth);

app.use(
  '/graphql',
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);
mongoose.connect(
    `mongodb+srv://sd949:sd949@swd-j8qfx.mongodb.net/graphql?retryWrites=true&w=majority`
)
.then(()=>{
    app.listen(3000);
    console.log('mngodb connected');

})
.catch(err=>{
    console.log(err);
});
//API secret:rOrwi02kD2TaO6BrDnihEAqgAcI
//API key: 938348772992918
//Cloud name:sd949

