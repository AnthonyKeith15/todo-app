const mongoose = require('mongoose');
const { Todo } = require('./db');

const seedData = [
  {
    title: 'Make List',
    difficulty: 4,
    assignee: "Will Willis",
    complete: true,
  },
  {
    title: 'Check List Twice',
    difficulty: 2,
    assignee: "Santa Clause",
    complete: false,
  },
  {
    title: 'Dinner With me (I Cant cancel that again)',
    difficulty: 5,
    assignee: "Cat In the hat",
    complete: true,
  },
];

async function seedDatabase() {
  try {
    await mongoose.connection.dropCollection('todos'); // Clear existing data
    await Todo.insertMany(seedData); // Insert test data
    console.log('Test data inserted successfully');
  } catch (error) {
    console.error('Error seeding the database:', error);
  } finally {
    mongoose.connection.close(); // Close the Mongoose connection
  }
}


seedDatabase()

