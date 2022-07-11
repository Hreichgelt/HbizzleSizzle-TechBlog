
const router = require('express').Router();
// const bcrypt = require('bcrypt'); - not being used?
const { comment } = require('../../models');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);
const withAuth = require('../../utils/auth');

// get all comments
router.get('/', async (req, res) => {
  try {
    const commentData = await comment.findAll();
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get comment by id
// router.get('/:id', async (req, res) => {
//   try {
//     const commentData = await comment.findByPk(req.params.id);
//     if (!commentData) {
//       res.status(404).json({ message: 'No comment with this id!' });
//       return;
//     }
//     res.status(200).json(commentData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// post comment
router.post('/', withAuth, async (req, res) => {
    try {
        const commentData = await comment.create({
            comment_text: req.body.comment_text,
            user_id: req.session.user_id
        })
        res.status(200).json(commentData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// delete comment
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// edit comment
// router.put('/:id', async (req, res) => {
//   try {
//     const commentData = await comment.update( 
//         {
//           comment_text: req.body.comment_text,
//         },
//         {
//           where: {
//             id: req.params.id,
//             user_id: req.session.user_id,
//           },
//         });
//     if (!commentData[0]) {
//       res.status(404).json({ message: 'No comment with this id!' });
//       return;
//     }
//     res.status(200).json(commentData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
