const Lecture = require("../models/lecture.model");
const Course = require("../models/course.model")
const User = require("../models/user.model")


// Create a new lecture
exports.createLecture = async (req, res) => {
  try {
    const { course: courseName, instructor: instructorName, date } = req.body;

    // Find the course by name
    const course = await Course.findOne({ name: courseName });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Find the instructor by name
    const instructor = await User.findOne({ userName: instructorName });
    if (!instructor) {
      return res.status(404).json({ message: "Instructor not found" });
    }

    const lecture = new Lecture({ course: course._id, instructor: instructor._id, date });
    await lecture.save();
    res.status(201).json({ message: "Lecture created successfully", lecture });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating lecture" });
  }
};


// Get all lectures
exports.getAllLectures = async (req, res) => {
  try {
    const lectures = await Lecture.find()
      .populate({
        path: 'course',
        select: 'name',
      })
      .populate({
        path: 'instructor',
        select: 'userName',
      });
    res.status(200).json(lectures);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching lectures' });
  }
};


// Get lecture by ID
exports.getLectureById = async (req, res) => {
  try {
    const lecture = await Lecture.findById(req.params.id)
      .populate("course")
      .populate("instructor");
    if (!lecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }
    res.status(200).json(lecture);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching lecture" });
  }
};

// Update a lecture
exports.updateLecture = async (req, res) => {
  try {
    const { course, instructor, date } = req.body;
    const lecture = await Lecture.findById(req.params.id);
    if (!lecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }
    lecture.course = course || lecture.course;
    lecture.instructor = instructor || lecture.instructor;
    lecture.date = date || lecture.date;
    await lecture.save();
    res.status(200).json({ message: "Lecture updated successfully", lecture });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating lecture" });
  }
};

// Delete a lecture
exports.deleteLecture = async (req, res) => {
  try {
    const lecture = await Lecture.findByIdAndDelete(req.params.id);
    if (!lecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }
    res.status(200).json({ message: "Lecture deleted successfully", lecture });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting lecture" });
  }
};
