import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api';
import heroImg from '../assets/hero.jpg';

export default function Home() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    API.get('/courses').then(res => setCourses(res.data));
  }, []);

  const handleEnroll = async (id) => {
    try {
      await API.post(`/courses/enroll/${id}`);
      navigate('/dashboard');
    } catch (err) {
      alert('Please login to enroll!');
      navigate('/login');
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center bg-gradient-to-br from-blue-100 to-blue-300 rounded-xl shadow-lg mb-10 overflow-hidden">
        <div className="flex-1 p-8 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-4 leading-tight">Welcome to Free eLearning</h1>
          <p className="text-lg md:text-xl text-blue-700 mb-6 max-w-xl mx-auto md:mx-0">Access high-quality video courses for free. Learn, grow, and achieve your goals with our curated content!</p>
          <Link to={token ? "/dashboard" : "/register"} className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition">{token ? 'Go to Dashboard' : 'Get Started'}</Link>
        </div>
        <div className="flex-1 min-w-[250px] flex items-center justify-center p-4 md:p-0">
          <img src={heroImg} alt="eLearning Hero" className="w-full h-56 md:h-64 object-cover md:rounded-l-none rounded-b-xl md:rounded-b-none md:rounded-r-xl" />
        </div>
      </section>

      {/* Courses Section */}
      <h2 className="text-2xl font-bold mb-6 text-blue-800">All Courses</h2>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map(course => (
          <div key={course._id} className="bg-white shadow-lg rounded-xl p-6 flex flex-col transition-transform hover:scale-105">
            <img src={course.thumbnail} alt={course.title} className="h-40 w-full object-cover rounded mb-4" />
            <h3 className="text-lg font-semibold text-blue-700 mb-1">{course.title}</h3>
            <p className="mb-3 text-gray-600">{course.description}</p>
            {token ? (
              <button onClick={() => handleEnroll(course._id)} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg mb-2 transition">Enroll</button>
            ) : null}
            <Link to={token ? `/course/${course._id}` : '/login'} className="text-blue-600 hover:underline">View Course</Link>
          </div>
        ))}
      </div>
    </div>
  );
} 