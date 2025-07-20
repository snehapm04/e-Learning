const express = require('express');
const Course = require('../models/Course');
const auth = require('../middleware/auth');
const User = require('../models/User');
const router = express.Router();

// Get all courses
router.get('/', async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

// Enroll in a course
router.post('/enroll/:courseId', auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user.enrolledCourses.includes(req.params.courseId)) {
    user.enrolledCourses.push(req.params.courseId);
    await user.save();
  }
  res.json({ msg: 'Enrolled successfully' });
});

// Get enrolled courses
router.get('/my-courses', auth, async (req, res) => {
  const user = await User.findById(req.user.id).populate('enrolledCourses');
  res.json(user.enrolledCourses);
});

module.exports = router; 