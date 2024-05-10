import React, { useState, useEffect } from "react";
import axios from "axios";

const InstructorPanel = () => {
  const [lectures, setLectures] = useState([]);
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [formData, setFormData] = useState({
    course: "",
    instructor: "",
    date: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchLectures();
    fetchCourses();
    fetchInstructors();
  }, []);

  const fetchLectures = async () => {
    try {
      const response = await axios.get("http://localhost:8895/api/lectures");
      setLectures(response.data);
    } catch (error) {
      console.error("Error fetching lectures:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:8895/api/courses");
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const fetchInstructors = async () => {
    try {
      const response = await axios.get("http://localhost:8895/api/users/instructor");
      setInstructors(response.data);
    } catch (error) {
      console.error("Error fetching instructors:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8895/api/lectures/", formData);
      setFormData({
        course: "",
        instructor: "",
        date: "",
      });
      fetchLectures();
    } catch (error) {
      console.error("Error creating lecture:", error);
      if (error.response && error.response.status === 400) {
        setError("The lecture schedule conflicts with an existing one for this instructor and course...");
      } else {
        setError("An error occurred while creating the lecture.");
      }
    }
  };

  return (
    <div className="bg-gray-200">
    <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-5 gap-8">
      <div className="col-span-2">
        <h1 className="text-3xl font-bold mb-4 mt-8">Instructor Panel</h1>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-6">Add New Lecture</h2>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error:</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="course">Course:</label>
              <select
                id="course"
                name="course"
                value={formData.course}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2 w-full"
              >
                <option value="">Select Course</option>
                {courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="instructor">Instructor:</label>
              <input
                type="text"
                id="instructor"
                name="instructor"
                value={formData.instructor}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
            </div>
            <div>
              <label htmlFor="date">Date:</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 w-full"
            >
              Add Lecture
            </button>
          </form>
        </div>
      </div>
      <div className="col-span-2">
        <h2 className="text-xl font-semibold mb-2 mt-8">Your Lectures</h2>
        <div className="space-y-4">
          {lectures.map((lecture) => (
            <div key={lecture._id} className="border p-4 rounded bg-white">
              <p>Date: {new Date(lecture.date).toLocaleDateString()}</p>
              <p>Course: {lecture.course.name}</p>
              <p>Instructor: {lecture.instructor.userName}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-1">
        <h2 className="text-xl font-semibold mb-2 mt-8">Instructors List</h2>
        <div className="space-y-4">
          {instructors.map((instructor) => (
            <div key={instructor._id} className="border p-4 rounded bg-white">
              <p>{instructor.userName}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default InstructorPanel;
