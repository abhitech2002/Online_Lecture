const express = require('express');
const router = express.Router();
const CourseController = require('../controllers/course.controller');

// Create a new course
router.post('/', CourseController.createCourse);

// Get all courses
router.get('/', CourseController.getAllCourses);

// Get course by ID
router.get('/:id', CourseController.getCourseById);

// Update a course
router.put('/:id', CourseController.updateCourse);

// Delete a course
router.delete('/:id', CourseController.deleteCourse);

module.exports = router;
