const mongoose = require('mongoose');
const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  thumbnail: String,
  videoLinks: [String]
});

// Sample course data for seeding
const sampleCourses = [
  {
    title: 'JavaScript Basics',
    description: 'Learn JavaScript from scratch, including variables, functions, and DOM manipulation.',
    thumbnail: 'https://img.youtube.com/vi/W6NZfCO5SIk/0.jpg',
    videoLinks: [
      'https://www.youtube.com/embed/W6NZfCO5SIk',
      'https://www.youtube.com/embed/PkZNo7MFNFg'
    ]
  },
  {
    title: 'React for Beginners',
    description: 'A beginner-friendly introduction to React.js and building interactive UIs.',
    thumbnail: 'https://img.youtube.com/vi/dGcsHMXbSOA/0.jpg',
    videoLinks: [
      'https://www.youtube.com/embed/dGcsHMXbSOA',
      'https://www.youtube.com/embed/bMknfKXIFA8'
    ]
  },
  {
    title: 'Node.js Crash Course',
    description: 'Get started with Node.js, Express, and building RESTful APIs.',
    thumbnail: 'https://img.youtube.com/vi/fBNz5xF-Kx4/0.jpg',
    videoLinks: [
      'https://www.youtube.com/embed/fBNz5xF-Kx4',
      'https://www.youtube.com/embed/Oe421EPjeBE'
    ]
  }
];

// Static method to seed courses
courseSchema.statics.seedSampleCourses = async function() {
  const count = await this.countDocuments();
  if (count === 0) {
    await this.insertMany(sampleCourses);
    console.log('Sample courses seeded');
  } else {
    console.log('Courses already exist, skipping seeding');
  }
};

module.exports = mongoose.model('Course', courseSchema); 