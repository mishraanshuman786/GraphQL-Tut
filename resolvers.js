import { quotes, users } from "./fakedb.js";
import { Quote } from "./models/Quote.model.js";
import { User } from "./models/User.model.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";
import jsonwebtoken from "jsonwebtoken";

const resolvers = {
  Query: {
    users: async () => {
      let users = await User.find({});
      return users;
    },
    user: async (_, { _id }) => await User.findOne({ _id }),
    quotes: async () => await Quote.find({}).populate("by", "_id firstName"),
    quote: async (_, { _id }) => {
      try {
        const quote = await Quote.findOne({ _id });
        if (!quote) throw new Error("Quote not found");
        return quote;
      } catch (error) {
        console.error("Error fetching quote:", error);
        throw new Error("Could not fetch quote");
      }
    },
  },
  User: {
    quotes: async (parent) => await Quote.find({ by: parent._id }),
  },
  Mutation: {
    signUpUser: async (_, { userNew }) => {
      const user = await User.findOne({ email: userNew.email });
      if (user) {
        throw new Error("User already exists with that email!");
      }

      const hashedPassword = await bcrypt.hash(userNew.password, 12);
      let newUser = new User({
        ...userNew,
        password: hashedPassword,
      });

      newUser = await newUser.save();
      return newUser;
    },
    signInUser: async (_, { userSignIn }) => {
      const user = await User.findOne({ email: userSignIn.email });
      if (!user) {
        throw new Error("User does not exist with that email!");
      }

      const doMatch = await bcrypt.compare(userSignIn.password, user.password);
      if (!doMatch) {
        throw new Error("User does not exist with that email!");
      }

      const token = await jsonwebtoken.sign(
        { userId: user._id },
        process.env.JWT_SECRET
      );
      return { token };
    },
    createQuote: async (_, { name }, context) => {
      const { userId } = context;
      if (!userId) {
        throw new Error("You must be Logged In!");
      }
      const newQuote = new Quote({
        name,
        by: userId,
      });
      await newQuote.save();
      return "Quote saved Successfully.";
    },
  },
};

export default resolvers;
