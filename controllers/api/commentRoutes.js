const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll();
        res.status(200).json(commentData);
    } catch(err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
      console.log(req.body.comment_description);
      const commentData = await Comment.create({
        blog_id: req.body.blog_id,
        comment_description: req.body.comment_description,
        user_id: req.session.user_id,
      });
      res.status(200).json(commentData);
    } catch(err) {
      res.status(500).json(err);
    }
  });
  

module.exports = router;
