const { Router } = require('express');
const config = require('config');
const shortid = require('shortid');

const Link = require('../models/Link');

const authMiddleware = require('../middleware/auth.middleware');

const router = Router();

router.post('/generate', authMiddleware, async (req, res) => {
  try {
    const baseUrl = config.get('baseUrl');
    const { from } = req.body;

    const code = shortid.generate();

    const existingLink = await Link.findOne({ from });

    if (existingLink) {
      return res.json({ link: existingLink })
    }

    const to = baseUrl + '/t/' + code;

    const link = new Link({
      code, from, to, owner: req.user.userId
    });

    await link.save();

    res.status(201).json({ link });

  } catch {
    res.status(500).json({ message: 'Something went wrong, server error' });
  }
})

router.get('/', authMiddleware, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId });
    res.json(links);
  } catch {
    res.status(500).json({ message: 'Something went wrong, server error' });
  }
})

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    res.json(link);
  } catch {
    res.status(500).json({ message: 'Something went wrong, server error' });
  }
})

module.exports = router;