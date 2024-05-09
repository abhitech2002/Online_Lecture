import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InstructorPanel = () => {
  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    fetchLectures();
  }, []);

  const fetchLectures = async () => {
    try {
      const response = await axios.get('http://localhost:8895/api/lectures');
      setLectures(response.data);
    } catch (error) {
      console.error('Error fetching lectures:', error);
    }
  };

  return (
    <div className="mx-auto max-w-lg">
      <h1 className="text-3xl font-bold mb-4">Instructor Panel</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">Your Lectures</h2>
        <div className="space-y-4">
          {lectures.map((lecture) => (
            <div key={lecture._id} className="border p-4 rounded">
              <h3 className="text-lg font-semibold">{lecture.course.name}</h3>
              <p>Date: {new Date(lecture.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstructorPanel;
