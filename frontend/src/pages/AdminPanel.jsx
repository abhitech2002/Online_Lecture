import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    level: "",
    description: "",
    image: "",
    batch: "",
  });

  useEffect(() => {
    fetchCourses();
  }, []);

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
      await axios.post("http://localhost:8895/api/courses/", formData);
      setFormData({
        name: "",
        level: "",
        description: "",
        image: "",
        batch: "",
      });
      fetchCourses();
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  return (
    <div className="mx-auto max-w-5xl mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-6">Add New Course</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="level">Level:</label>
            <input
              type="text"
              id="level"
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            ></textarea>
          </div>
          <div>
            <label htmlFor="image">Image URL:</label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="instructor">Batch:</label>
            <input
              type="text"
              id="batch"
              name="batch"
              value={formData.batch}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 w-full"
          >
            Add Course
          </button>
        </form>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Courses</h2>
        <div className="space-y-4">
          {courses.map((course) => (
            <div key={course._id} className="border p-4 rounded">
              <h3 className="text-lg font-semibold">{course.name}</h3>
              <p className="text-lg font-normal">{course.level}</p>
              <p className="text-lg font-light">{course.description}</p>
              <p className="text-lg font-medium">{course.batch}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
