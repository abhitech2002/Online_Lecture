const Course = require('../models/course.model');

// Create a new course
exports.createCourse = async (req, res) => {
    try {
      const { name, level, description, image, instructor } = req.body;
      const course = new Course({ name, level, description, image, instructor });
      await course.save();
      res.status(201).json({ message: 'Course created successfully', course });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating course' });
    }
  }


// Get all courses
exports.getAllCourses = async (req, res) => {
    try {
      const courses = await Course.find();
      res.status(200).json(courses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching courses' });
    }
  };


// Get course by ID
exports.getCourseById = async (req, res) => {
    try {
      const course = await Course.findById(req.params.id);
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
      res.status(200).json(course);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching course' });
    }
  };


// Update a course
exports.updateCourse = async (req, res) => {
    try {
      const { name, level, description, image, instructor } = req.body;
      const course = await Course.findById(req.params.id);
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
      course.name = name || course.name;
      course.level = level || course.level;
      course.description = description || course.description;
      course.image = image || course.image;
      course.instructor = instructor || course.instructor;
      await course.save();
      res.status(200).json({ message: 'Course updated successfully', course });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating course' });
    }
  };
  
// Delete a course
exports.deleteCourse = async (req, res) => {
    try {
      const course = await Course.findByIdAndDelete(req.params.id);
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
      res.status(200).json({ message: 'Course deleted successfully', course });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting course' });
    }
  };  