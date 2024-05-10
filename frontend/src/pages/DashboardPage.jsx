import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [lectures, setLectures] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchLectures();
    fetchCourses();
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

  const getBatchAndLevel = (lecture) => {
    const course = courses.find((c) => c._id === lecture.course._id);
    if (course) {
      return { batch: course.batch, level: course.level };
    }
    return { batch: "N/A", level: "N/A" };
  };

  return (
    <div className="mx-auto max-w-5xl mt-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-6">Upcoming Lectures</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Course
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Instructor
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Batch
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Level
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {lectures.map((lecture) => {
              const { batch, level } = getBatchAndLevel(lecture);
              return (
                <tr key={lecture._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {lecture.course.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {lecture.instructor.userName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(lecture.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{batch}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{level}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
    