const express = require("express");
const Student = require("../models/Student");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.post("/add", authMiddleware, async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.json({ message: "Student Added Successfully", student });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/all", authMiddleware, async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:rollNo", authMiddleware, async (req, res) => {
  try {
    const student = await Student.findOne({ rollNo: req.params.rollNo });

    if (!student) {
      return res.status(404).json({ message: "Student Not Found" });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/update/:rollNo", authMiddleware, async (req, res) => {
  try {
    const updatedStudent = await Student.findOneAndUpdate(
      { rollNo: req.params.rollNo },
      req.body,
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student Not Found" });
    }

    res.json({ message: "Student Updated Successfully", updatedStudent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/delete/:rollNo", authMiddleware, async (req, res) => {
  try {
    const deletedStudent = await Student.findOneAndDelete({
      rollNo: req.params.rollNo,
    });

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student Not Found" });
    }

    res.json({ message: "Student Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
