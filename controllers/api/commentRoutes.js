const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/withAuth.js');

router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll();
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.create({
      blog_id: req.body.blog_id,
      comment_description: req.body.comment_description,
      user_id: req.session.user_id,
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' })
    }
    res.status(200).json({message: 'Comment Deleted' });
  }
  catch(err) {
    res.status(500).json(err);
  }
})

module.exports = router;
