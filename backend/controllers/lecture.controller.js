const Lecture = require("../models/lecture.model");
const Course = require("../models/course.model")
const User = require("../models/user.model")

// Lecture post code
exports.createLecture = async (req, res) => {
  try {
    const { course: courseId, instructor: instructorName, date } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      console.log("Course not found:", courseId);
      return res.status(404).json({ message: "Course not found" });
    }

    const instructor = await User.findOne({ userName: instructorName });
    if (!instructor) {
      console.log("Instructor not found:", instructorName);
      return res.status(404).json({ message: "Instructor not found" });
    }

    const lectureDate = new Date(date);
    const startOfDay = new Date(lectureDate.getFullYear(), lectureDate.getMonth(), lectureDate.getDate());
    const endOfDay = new Date(startOfDay.getTime() + (24 * 60 * 60 * 1000) - 1); 

    const existingLectures = await Lecture.find({
      instructor: instructor._id,
      course: courseId,
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    if (existingLectures.length > 0) {
      return res.status(400).json({
        message: "The lecture schedule conflicts with an existing one for this instructor and course.",
      });
    }

    const lecture = new Lecture({ course: courseId, instructor: instructor._id, date: lectureDate });
    await lecture.save();

    res.status(201).json({ message: "Lecture created successfully", lecture });
  } catch (error) {
    console.error("Error creating lecture:", error);
    res.status(500).json({ message: "Error creating lecture" });
  }
}


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
