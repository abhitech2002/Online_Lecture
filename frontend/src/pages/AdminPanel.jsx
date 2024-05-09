import React, {useState, useEffect} from "react";
import axios from "axios"

const AdminPanel = () => {
    const [courses, setCourses] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        level: '',
        description: '',
        image: '',
        instructor: '',
      });

      useEffect(() => {
        fetchCourses();
      }, []);
    
      const fetchCourses = async () => {
        try {
          const response = await axios.get('http://localhost:8895/api/courses');
          setCourses(response.data);
        } catch (error) {
          console.error('Error fetching courses:', error);
        }
      };
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        try {
          await axios.post('http://localhost:8895/api/courses/', formData);
          setFormData({
            name: '',
            level: '',
            description: '',
            image: '',
            instructor: '',
          });
          fetchCourses();
        } catch (error) {
          console.error('Error creating course:', error);
        }
      };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Add New Course</h2>
        <form onSubmit={handleSubmit} className="space-y-2">
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 rounded px-2 py-1"
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
              className="border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border border-gray-300 rounded px-2 py-1"
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
              className="border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <div>
            <label htmlFor="instructor">Instructor:</label>
            <input
              type="text"
              id="instructor"
              name="instructor"
              value={formData.instructor}
              onChange={handleChange}
              className="border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
          >
            Add Course
          </button>
        </form>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Courses</h2>
        <div className="space-y-4">
          {courses.map((course) => (
            <div key={course._id} className="border p-4 rounded">
              <h3 className="text-lg font-semibold">{course.name}</h3>
              <p>{course.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
