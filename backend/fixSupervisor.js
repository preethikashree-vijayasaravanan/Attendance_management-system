const mongoose = require("mongoose");
const User = require("./models/User");

mongoose.connect("mongodb://localhost:27017/abccollege").then(async () => {
  console.log("Connected");

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
    console.log(`Updated ${name}:`, result);
  }

  mongoose.connection.close();
});
