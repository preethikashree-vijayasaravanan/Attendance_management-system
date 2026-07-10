require('dotenv').config();const mongoose = require("mongoose");

const User = require("./models/User");

// Use production environment fallback
const connString = process.env.MONGO_URI || "mongodb://localhost:27017/abccollege";

mongoose.connect(connString).then(async () => {
  try {
    const updates = [
      { name: "Sharika", supervisor: "Nirmala" },
      { name: "Oviya", supervisor: "Nirmala" },
      { name: "Thiru", supervisor: "Nirmala" },
      { name: "Preethi", supervisor: "Renuga" },
      { name: "Swetha", supervisor: "Renuga" },
      { name: "Vaishnavi", supervisor: "Renuga" }
    ];

    for (const { name, supervisor } of updates) {
      const result = await User.updateOne(
        { name },
        { $set: { supervisor } }
      );
      if (result.matchedCount > 0) {
        console.log(`✅ Linked student ${name} to supervisor: ${supervisor}`);
      } else {
        console.log(`❌ Student not found: ${name}`);
      }
    }

    console.log("🎉 Supervisor assignments completed.");
  } catch (err) {
    console.error("🔥 Error:", err.message);
  } finally {
    mongoose.disconnect();
  }
});