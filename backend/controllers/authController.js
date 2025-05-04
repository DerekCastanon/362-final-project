const User = require('../models/User');
const bcrypt = require('bcrypt')

exports.login = async (req, res) => {
  const { username, email, password } = req.body;

  console.log("Login attempt for:", username);

  try {
    const user = await User.findOne({
      $or: [
        { email: { $regex: new RegExp('^' + username + '$', 'i') } },
        { username: { $regex: new RegExp('^' + username + '$', 'i') } },
      ]
    });

    if (!user) {
      return res.status(400).json({ message: 'User not found!' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password!' });
    }
    res.json({ userId: user._id });
    
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Error in register:', error);
    res.status(500).json({ message: 'Server error' });
  }
};