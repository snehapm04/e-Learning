import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';

export default function CourseViewer() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [enrolled, setEnrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is enrolled in this course
    API.get('/courses/my-courses').then(res => {
      const found = res.data.find(c => c._id === id);
      setEnrolled(!!found);
      if (found) setCourse(found);
      else navigate('/dashboard');
    });
  }, [id, navigate]);

  if (!enrolled || !course) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-8">
      <h1 className="text-2xl font-bold mb-4 text-blue-800">{course.title}</h1>
      <img src={course.thumbnail} alt={course.title} className="h-40 w-full object-cover rounded mb-4" />
      <p className="mb-6 text-gray-700">{course.description}</p>
      <h2 className="text-lg font-semibold mb-4 text-blue-700">Lessons</h2>
      <div className="space-y-8">
        {course.videoLinks.map((link, idx) => (
          <div key={idx} className="rounded overflow-hidden shadow-md">
            <iframe
              width="100%"
              height="315"
              src={link}
              title={`Lesson ${idx + 1}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full"
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
} 