import mongoose from "mongoose";
export function dbconnect(url) {
  mongoose.connect(url);

  mongoose.connection.on("connected", () => {
    console.log("connection to mongodb database.");
  });
}
