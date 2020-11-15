const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const config = require('config');

const User = require('../models/User');

const router = Router();

router.post(
  '/register',
  [
    check('email', 'Invalid email').isEmail(),
    check('password', 'Min length is 6 characters').isLength({ min: 6 })
  ],
  async (req, res) => {
    try {
      const validateErrors = validationResult(req);

      if (!validateErrors.isEmpty()) {
        return res.status(400).json({
          errors: validateErrors.array(),
          message: 'Invalid registration data'
        })
      }

      const { email, password } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({ message: 'This user already exists'});
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ email, password: hashedPassword});

      await user.save();

      res.status(201).json({ message: 'User created' });
    } catch {
      res.status(500).json({ message: 'Something went wrong, server error' });
    }
  }
)

router.post(
  '/login',
  [
    check('email', 'Enter valid email').normalizeEmail().isEmail(),
    check('password', 'Enter password').exists()
  ], 
  async (req, res) => {
    try {
      const validateErrors = validationResult(req);

      if (!validateErrors.isEmpty()) {
        return res.status(400).json({
          errors: validateErrors.array(),
          message: 'Invalid login data'
        })
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: 'User was not found' });
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
        return res.status(400).json({ message: 'Password is not correct' })
      }

      const token = jwt.sign(
        { userId: user.id },
        config.get('secretJWT'),
        { expiresIn: '1h' }
      )

      res.json({ token, userId: user.id })

    } catch (e) {

    }
})

module.exports = router;