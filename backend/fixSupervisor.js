require('dotenv').config();

const mongoose = require("mongoose");
const User = require("./models/User");

// SAFE CHANGE: Support Cloud DB strings in production via environment variables
const connString = process.env.MONGO_URI || "mongodb://localhost:27017/abccollege";

mongoose.connect(connString).then(async () => {
  console.log("Connected to MongoDB successfully");

  const updates = [
    { name: "Sharika", supervisor: "Nirmala" },
    { name: "Oviya", supervisor: "Nirmala" },
    { name: "Thiru", supervisor: "Nirmala" },
    { name: "Preethi", supervisor: "Renuga" },
    { name: "Swetha", supervisor: "Renuga" },
    { name: "Vaishnavi", supervisor: "Renuga" }
  ];

  try {
    for (const { name, supervisor } of updates) {
      const result = await User.updateOne(
        { name },
        { $set: { supervisor } }
      );
      console.log(`Updated ${name}:`, result);
    }
  } catch (err) {
    console.error("Error executing database updates:", err.message);
  } finally {
    // Always safely close the connection pool when complete
    mongoose.connection.close();
  }
});