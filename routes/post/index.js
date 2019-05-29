const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();
const { 
  getAll,
  createPost,
  getPost, 
  updatePost, 
  deletePost
 } = require('../../controllers/post');

router.get('/',auth,getAll);
router.get('/:id',getPost);
router.post('/',auth,createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

module.exports = router;