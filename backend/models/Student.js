const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  rollNo: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  dept: { type: String, required: true },
  year: { type: String, required: true },
  phone: { type: String, required: true },
});

module.exports = mongoose.model("Student", studentSchema);
