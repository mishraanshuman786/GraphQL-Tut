import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import resolvers from "./resolvers.js";
import typeDefs from "./schemaGql.js";
import { config } from "dotenv";
import { dbconnect } from "./utils/dbconnect.js";
import jwt from "jsonwebtoken";

// configuring dotenv
config();
// connecting to mongodb database
dbconnect(process.env.DB_URL);

// context middleware function
const context = async ({ req }) => {
  const { authorization } = req.headers;
  if (authorization) {
    const { userId } = await jwt.verify(authorization, process.env.JWT_SECRET);
    return { userId };
  }
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen().then(({ url }) => {
  console.log("Server ready at: " + url);
});
