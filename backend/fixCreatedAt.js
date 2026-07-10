require('dotenv').config();

const mongoose = require("mongoose");

const connString = process.env.MONGO_URI || "mongodb://localhost:27017/abccollege";

mongoose.connect(connString)
  .then(async () => {
    const db = mongoose.connection.db;
    const usersCollection = db.collection("users");
    const updates = [
      { name: "Sharika", date: "2025-06-20" },
      { name: "Oviya", date: "2025-06-20" },
      { name: "Thiru", date: "2025-06-20" },
      { name: "Preethi", date: "2025-06-20" },
      { name: "Swetha", date: "2025-06-20" },
      { name: "Vaishnavi", date: "2025-06-20" },
    ];
    
    for (const { name, date } of updates) {
      const result = await usersCollection.updateOne(
        { name },
        { $set: { createdAt: new Date(date) } }
      );
      console.log(`Updated timestamp for ${name}`, result);
    }
    
    mongoose.connection.close();
  })
  .catch(err => console.error("Error running fixCreatedAt script:", err));