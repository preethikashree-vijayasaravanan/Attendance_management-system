/*const mongoose = require("mongoose");
const User = require("./models/User");

// Connect to your MongoDB database
mongoose.connect("mongodb://localhost:27017/abccollege").then(async () => {
  try {
    // Assign students to Nirmala
    const nirmala = await User.findOne({ name: "Nirmala" });
    if (nirmala && nirmala.role === "staff") {
      nirmala.assignedStudents = ["Sharika", "Oviya", "Thiru"];
      await nirmala.save();
      console.log("✅ Assigned students to Nirmala");
    } else {
      console.log("⚠️ Nirmala not found or not staff");
    }

    // Assign students to Renuga
    const renuga = await User.findOne({ name: "Renuga" });
    if (renuga && renuga.role === "staff") {
      renuga.assignedStudents = ["Preethi", "Swetha", "Vaishnavi"];
      await renuga.save();
      console.log("✅ Assigned students to Renuga");
    } else {
      console.log("⚠️ Renuga not found or not staff");
    }
  } catch (err) {
    console.error("❌ Error assigning students:", err);
  } finally {
    mongoose.disconnect();
  }
});
*/
// assignStudents.js
/*
const mongoose = require("mongoose");
const User = require("./models/User");

mongoose.connect("mongodb://localhost:27017/abccollege").then(async () => {
  const staffNirmala = await User.findOne({ name: "Nirmala" });
  const staffRenuga = await User.findOne({ name: "Renuga" });

  const studentsForNirmala = ["Sharika", "Oviya", "Thiru"];
  const studentsForRenuga = ["Preethi", "Swetha", "Vaishnavi"];

  for (const name of studentsForNirmala) {
    await User.findOneAndUpdate({ name }, { assignedStaffId: staffNirmala._id });
  }

  for (const name of studentsForRenuga) {
    await User.findOneAndUpdate({ name }, { assignedStaffId: staffRenuga._id });
  }

  console.log("✅ Students assigned to staff successfully.");
  mongoose.disconnect();
});
*/
// assignStudents.js
// assignStudents.js
const mongoose = require("mongoose");
const User = require("./models/User");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/abccollege").then(async () => {
  try {
    const staffNirmala = await User.findOne({ name: "Nirmala" });
    const staffRenuga = await User.findOne({ name: "Renuga" });

    const studentsForNirmala = ["Sharika", "Oviya", "Thiru"];
    const studentsForRenuga = ["Preethi", "Swetha", "Vaishnavi"];

    if (!staffNirmala || !staffRenuga) {
      console.log("⚠️ One or both staff members not found. Please check their names.");
      return mongoose.disconnect();
    }

    for (const name of studentsForNirmala) {
      const result = await User.findOneAndUpdate(
        { name },
        { assignedStaffId: staffNirmala._id },
        { new: true }
      );
      if (result) {
        console.log(`✅ Assigned ${name} to ${staffNirmala.name}`);
      } else {
        console.log(`❌ Could not find student: ${name}`);
      }
    }

    for (const name of studentsForRenuga) {
      const result = await User.findOneAndUpdate(
        { name },
        { assignedStaffId: staffRenuga._id },
        { new: true }
      );
      if (result) {
        console.log(`✅ Assigned ${name} to ${staffRenuga.name}`);
      } else {
        console.log(`❌ Could not find student: ${name}`);
      }
    }

    console.log("🎉 Assignment completed.");
  } catch (err) {
    console.error("🔥 Error assigning students:", err.message);
  } finally {
    mongoose.disconnect();
  }
});
