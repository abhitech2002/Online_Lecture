import React, { useState, useEffect } from "react";
import axios from "axios";

const InstructorPanel = () => {
  const [lectures, setLectures] = useState([]);
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    course: "",
    instructor: "",
    date: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8895/api/courses");
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchData();
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
    }
  };

  return (
    <div className="mx-auto max-w-5xl mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">Instructor Panel</h1>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-6">Add New Lecture</h2>
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
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Lectures</h2>
        <div className="space-y-4">
          {lectures.map((lecture) => (
            <div key={lecture._id} className="border p-4 rounded">
              <p>Date: {new Date(lecture.date).toLocaleDateString()}</p>
              <p>Course: {lecture.course.name}</p>
              <p>Instructor: {lecture.instructor.userName}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstructorPanel;
