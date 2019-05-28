const Joi = require('joi');
const Post = require('../../models/post');
const _ = require('lodash');


exports.getAll = async (req,res) => {
  const posts = await Post.find();
  res.json({
    message: 'Posts loaded successfully',
    sucess: true,
    status: 200,
    posts
  });
}

exports.createPost = (req,res) => {
   const  { error } = validatePost(req.body);
   if(error) {
     return res.status(400).json({error: error.details[0].message});
   }
   /*
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
   else {
     const post = {
       id: 1,
       title: req.body.title,
       description: req.body.description
     };

     posts.push(post);
   }
   */
   let post = new Post({
     title: req.body.title,
     description: req.body.description
   });

   post.save((err,post) => { 
    if(err) {
      return res.json({error: err});
    }
    res.status(201).json({
      message: 'Post created successfully',
      success: true,
      post
    });
   });
}

exports.getPost = (req,res,next) => {
  // let post = posts.find(p => p.id === parseInt(req.params.id));
  Post.findById(req.params.id,(err,post) => {
    if(err || !post) return res.status(400).json({error: err});

    res.json({
      message: 'Post found',
      status: 200,
      post
    });
  });
}

exports.updatePost = (req,res,next) => {
  Post.findById(req.params.id, (err,post) => {
    if(err || !post) return res.status(400).json({error: err});

    const { error } = validatePost(req.body);
  if(error) return res.status(400).json({message: error.details[0].message, status: 400});

    post = _.extend(post,req.body);

    post.save((err,result) => {
      if(err) {
        return res.status(400).json({
          error: err
        });
      }
      res.json(result);
    });
  });
}

exports.deletePost = (req,res,next) => {
  // let post = posts.find(p => p.id === parseInt(req.params.id));
  // if(!post) return res.status(404).json({message: 'Post not found', success: true, status: 404 });
  Post.findById(req.params.id, (err,post) => {
    if(err || !post) return res.status(400).json({error: err});

    post.remove((err,post) => {
      if(err) return res.status(400).json({ error: err });

      res.json({
        message: 'Post deleted successfully',
        success: true,
        status: 200
      });
    });
  });
}


function validatePost(post) {
  const schema = {
    title: Joi.string().required(),
    description: Joi.string().required()
  };
  return Joi.validate(post,schema);
}