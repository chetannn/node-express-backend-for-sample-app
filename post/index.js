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
  let id = parseInt(req.params.id);
  let post = posts.find(p => p.id === id);

  res.status(200).json({
    message: 'Post found',
    status: 200,
    post
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