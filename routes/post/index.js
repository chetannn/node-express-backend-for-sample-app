const express = require('express');
const router = express.Router();
const { 
  getAll,
  createPost,
  getPost, 
  updatePost, 
  deletePost
 } = require('../../controllers/post');

router.get('/', getAll);
router.get('/:id', getPost);
router.post('/', createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

module.exports = router;