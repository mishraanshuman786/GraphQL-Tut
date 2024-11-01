# GraphQL

GraphQL solves mainly two problems over Rest API:
**Over Fetching:** Client don't need all the data returned by the api but rest api gives all the data to the client. But on the other hand, GraphQL API gives only the mentioned data.

      query{
        user(id:123)
        {
           id
           firstName
         }
         }

Output:

       id:123
       firstName: Ramesh

**Under Fetching:** When we want to request the data from more than one api endpoint. Then it fires more than one request to the server. But in the case of GraphQL it only requires one request to fetch all the data. Which is more efficient than Rest API.

    query{
              user(id:123){
                     firstName
                     email
                 }
               quotes{
                      name
                          }
              }

In Rest API, we can make different endoints with different methods and test it with Postman.
In GraphQL API, we can have only one endpoint (/ or /graphql) with method POST.

# What is query, mutation and Resolvers in GraphQL.

**Query:** to get data.
**Mutation:** to post / update / delete data.
**Resolver:** has logic to handle query or mutation operation

# Hello World Response From GraphQL Server Example:

**Client Side:** React.js, React Router v6, Apollo Client
**Database:** MongoDB Atlas
**Server Side:** Nodejs, graphql, apollo-server, express/ apollo-server-express, mongoose, jsonwebtoken, bryptjs

**Creating a folder named GraphQl-Tuts and initialize a package.json file:**

    npm init --yes

**Installing required Files in GraphQl-Tuts folder:**

    npm i graphql@15.7.2 apollo-server@3.5.0 apollo-server-core@3.5.0

**Write the Following Code in server.js File:**

    import { ApolloServer, gql } from "apollo-server";

    import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";const  typeDefs  =  gql`
    // write query object to make get request
    type Query {

    greet: String

    }

    `;
    //make resolvers for the Query Object to write business logic for query Object.
    const  resolvers  = {

    Query: {
    // greet is a function that returns a String type data.
    greet: () =>  "Hello world!",

    },

    };


    // Creating the server to handle graphql queries.
    const  server  =  new  ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    });

    server.listen().then(({ url }) => {

    console.log("Server ready at: "  +  url);

    });

**Run the following code as:**

    nodemon server.js

The server is started at http://localhost:4000 by default Port.

**Write the following code in the playground to fetch the greet query:**

    {
        greet
    }

# Creating 2 Queries Uses and Quotes and fetch them in Apollo Client:

**Create a file named fakedb.js and add two arrays of objects, one for users and other for quotes and then add the following code in the server.js file to call the data and show on the output:**

    import { ApolloServer, gql } from "apollo-server";

    import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
    import { quotes, users } from "./fakedb.js";
    const  typeDefs  =  gql`

    type Query {
    users: [User]
    quotes: [Quote]
    }


    type Quote {
    name: String
    by: String
    }

    type User {
    id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    }
    `;

    const  resolvers  = {
    Query: {
    users: () =>  users,
    quotes: () =>  quotes,
    },
    };

    const  server  =  new  ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    });

    server.listen().then(({ url }) => {
    console.log("Server ready at: "  +  url);
    });

**If we want users we have to run the following query:**

    query getAllUsers{
    users{
      id,
      firstName,
      lastName,
      email,
      password
    }
    }

**If we want all the quotes we have to run the following query:**

    query getAllQuotes{
    quotes{
     name,
      by
    }
    }

# If you want quotes of a user present in the users collection based in the by field:

**Make the following code in the server.js file:**

    import { ApolloServer, gql } from "apollo-server";
    import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
    import { quotes, users } from "./fakedb.js";

    const  typeDefs  =  gql`
    type Query {
    users: [User]
    user(id: ID!): User
    quotes: [Quote]
    quote(id: ID!): Quote
    }

    type Quote {
    name: String
    by: String
    }

    type User {
    id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    quotes: [Quote]
    }
    `;

    const  resolvers  = {
    Query: {
    users: () =>  users,
    quotes: () =>  quotes,
    user: (_, { id }) =>  users.find((user) =>  user.id  ==  id),
    quote: (_, { id }) =>  quotes.find((quote) =>  quote.by  ==  id),
    },

    User: {
    quotes: (parent) =>  quotes.filter((quote) =>  quote.by  ===  parent.id),
    },
    };

    const  server  =  new  ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    });

     server.listen().then(({ url }) => {
    console.log("Server ready at: "  +  url);
    });

**Run the following query to get the single Quote:**

    query getQuote{
    quote(id:1){
      name,
      by
      }
    }

**Run the following query to get the Single User:**

        query getSingleUser{
        user(id:2) {
             firstName,
             lastName,
             email,
             password,
             quotes:{
                     name,
                     by
                     }
          }
    }
