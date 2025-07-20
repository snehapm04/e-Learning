import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';

export default function Dashboard() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    API.get('/courses/my-courses').then(res => setCourses(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-blue-800">My Enrolled Courses</h1>
      {courses.length === 0 ? (
        <div className="bg-white shadow rounded-lg p-6 text-center text-gray-600">You have not enrolled in any courses yet.</div>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map(course => (
            <div key={course._id} className="bg-white shadow-lg rounded-xl p-6 flex flex-col transition-transform hover:scale-105">
              <img src={course.thumbnail} alt={course.title} className="h-40 w-full object-cover rounded mb-4" />
              <h2 className="text-lg font-semibold text-blue-700 mb-1">{course.title}</h2>
              <p className="mb-3 text-gray-600">{course.description}</p>
              <Link to={`/course/${course._id}`} className="text-blue-600 hover:underline">Go to Course</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 