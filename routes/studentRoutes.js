const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// ✅ Create Student (POST)
router.post('/', async (req, res) => {
    try {
        const { name, age, course } = req.body;

        // ❌ Return error if any field is missing
        if (!name || !age || !course) {
            return res.status(400).json({ error: "All fields (name, age, course) are required." });
        }

        const student = new Student({ name, age, course });
        await student.save();
        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// ✅ Read All Students (GET)
router.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Read a Single Student (GET)
router.get('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).json({ error: "Student not found" });
        res.json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Update Student (PUT)
router.put('/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!student) return res.status(404).json({ error: "Student not found" });
        res.json(student);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// ✅ Delete Student (DELETE)
router.delete('/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) return res.status(404).json({ error: "Student not found" });
        res.json({ message: "Student deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

