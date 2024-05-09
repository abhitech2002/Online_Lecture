const express = require('express');
const router = express.Router();
const LectureController = require('../controllers/lecture.controller');

// Create a new lecture
router.post('/', LectureController.createLecture);

// Get all lectures
router.get('/', LectureController.getAllLectures);

// Get lecture by ID
router.get('/:id', LectureController.getLectureById);

// Update a lecture
router.put('/:id', LectureController.updateLecture);

// Delete a lecture
router.delete('/:id', LectureController.deleteLecture);

module.exports = router;
