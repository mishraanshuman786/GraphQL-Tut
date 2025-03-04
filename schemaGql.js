import { gql } from "apollo-server";
const typeDefs = gql`
  type Query {
    users: [User]
    user(_id: ID!): User
    quotes: [QuoteWithName]
    quote(_id: ID!): Quote
  }

  type QuoteWithName {
    _id: ID
    name: String
    by: IdName
  }

  type IdName {
    _id: String
    firstName: String
  }

  type Quote {
    _id: ID!
    name: String
    by: String
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    quotes: [Quote]
  }

  type Token {
    token: String
  }

  type Mutation {
    signUpUser(userNew: UserInput!): User
    signInUser(userSignIn: UserSignInInput!): Token
    createQuote(name: String!): String
  }

  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  input UserSignInInput {
    email: String!
    password: String!
  }
`;

export default typeDefs;
