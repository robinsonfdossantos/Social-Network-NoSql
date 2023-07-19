const mongoose = require('mongoose');
const User = require('../models/User');
const Thought = require('../models/Thought');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/socialnetworkDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the seed data
const seedData = [
  {
    username: 'lernantino',
    email: 'lernantino@gmail.com',
    thoughts: [],
    friends: [],
  },
  {
    username: 'codingguru',
    email: 'codingguru@gmail.com',
    thoughts: [],
    friends: [],
  },
  // Add more user objects as needed
];

// Function to generate sample thoughts
const generateThoughts = (userId, count) => {
  const thoughts = [];
  for (let i = 0; i < count; i++) {
    const thought = {
      thoughtText: `Sample thought ${i + 1}`,
      username: seedData[userId].username,
      reactions: [],
    };
    thoughts.push(thought);
  }
  return thoughts;
};

// Seed the database with the seed data
const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Create users and thoughts
    for (let i = 0; i < seedData.length; i++) {
      const user = await User.create(seedData[i]);
      const thoughts = generateThoughts(i, 5);
      for (let j = 0; j < thoughts.length; j++) {
        const thought = await Thought.create(thoughts[j]);
        user.thoughts.push(thought._id);
      }
      await user.save();
    }

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding the database:', error);
  } finally {
    // Disconnect from MongoDB
    mongoose.disconnect();
  }
};

// Call the seedDatabase function to populate the database
seedDatabase();
