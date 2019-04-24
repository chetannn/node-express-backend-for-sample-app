const express = require('express');
const router = express.Router();
const Joi = require('joi');

let posts = [];

router.get('/', (req,res,next) => {
  res.status(200).json({
    posts,
    message: 'Posts loaded successfully',
    sucess: true,
    status: 200
  });
});

router.post('/', (req,res,next) => {

  const { error } = validatePost(req.body);
    if(error) {
      res.status(400).send(error.details[0].message);
      return;
    }
    if(posts.length) {
      const lastPost = posts[posts.length - 1];
    const id = lastPost.id > 0 ? lastPost.id + 1 : 1;

    const post = {
      id: id,
      title: req.body.title,
      description: req.body.description
    };
      posts.push(post);
    }
    else 
    {
      const post = {
        id: 1,
        title: req.body.title,
        description: req.body.description
      };
        posts.push(post);
    }
    
  res.status(201).json({
    message: 'Post created successfully',
    success: true,
    status: 201
  });
});

router.get('/:id', (req,res,next) => {
  let post = posts.find(p => p.id === parseInt(req.params.id));
  if(!post) return res.status(404).json({ message: 'Post not found', success: false, status: 404});

  res.status(200).json({
    message: 'Post found',
    status: 200,
    post
  });
});

router.put('/:id', (req,res,next) => {
  let id = parseInt(req.params.id);
  let post = posts.find(p => p.id === id);
  if(!post) return res.status(404).json({ message: 'Post not found', success: false, status: 404});

  const { error } = validatePost(req.body);
  if(error) res.status(400).json({message: error.details[0].message, status: 400});

  post.title = req.body.title;
  post.description = req.body.description;

  res.status(200).json({
    updatedPost: post,
    message: 'Post Updated Successfully',
    success: true,
    status: 200
  });
});

router.delete('/:id', (req,res,next) => {
  //find
  let post = posts.find(p => p.id === parseInt(req.params.id));
  //if it is not found then send 404 not found
  if(!post) return res.status(404).json({ message: 'Post not found', success: false, status: 404});

  //delete
  const index = posts.indexOf(post);
  posts.splice(index,1);

  res.status(200).json({
    message: 'Post Deleted Sucessfully',
    success: true,
    status: 200
  });
});


function validatePost(post) {
  const schema = {
    title: Joi.string().required(),
    description: Joi.string().required()
  }
   return Joi.validate(post, schema);
}

module.exports = router;