// fixCreatedAt.js
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/abccollege")
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
      console.log(`Updated ${name}`, result);
    }
    mongoose.connection.close();
  })
  .catch(err => console.error("Error:", err));
