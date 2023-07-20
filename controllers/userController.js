const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');


module.exports = {
  // Get all users
  async getAllUsers(req, res) {
    try {
      const users = await User.find().populate('thoughts');

      res.json({
        users,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  // Get a single user
  async getSingleUser(req, res) {
    try {
      const { userId } = req.params;

      const user = await User.findOne({ _id: req.params.userId })
      .select('-__v').populate('thoughts');

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json({
        user,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },


  // Create a new user
  async createUser(req, res) {
    try {
      const newUser = await User.create(req.body);
      res.status(201).json(newUser);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  // Delete a user and remove them from the thought's reactions
  async deleteUser(req, res) {
    try {
      const { userId } = req.params;

      const user = await User.findByIdAndDelete(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      await Thought.updateMany(
        {},
        { $pull: { reactions: { username: user.username } } }
      );

      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  // Add a friend to a user's friend list
  async addFriend(req, res) {
    try {
      const { userId, friendId } = req.params;

      const user = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { friends: friendId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  // Remove a friend from a user's friend list
  async removeFriend(req, res) {
    try {
      const { userId, friendId } = req.params;

      const user = await User.findByIdAndUpdate(
        userId,
        { $pull: { friends: friendId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },


  // Update a user
async updateUser(req, res) {
  try {
    const { userId } = req.params;

    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
};
