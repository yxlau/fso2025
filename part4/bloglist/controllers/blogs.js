const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization ");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user");
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  response.json(blog);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;

  if (!request.user) return response.status(401).json({error: 'invalid token'})

  if (!body.title || !body.url) {
    return response.status(400).end();
  }

  const user = await User.findById(request.user.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  if (!request.user) return response.status(401).json({error: 'invalid token'})
  
  const blog = await Blog.findById(request.params.id);

  if (!blog){
    return response.status(404).json({error: "Blog not found"})
  }

  if (blog.user.toString() === request.user.id.toString()){
    await blog.deleteOne();
  } else {
    return response.status(403).json({error: 'You can only delete your own blog'})
  }
  
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const { id, ...body } = request.body;

  const updated = await Blog.findByIdAndUpdate(request.params.id, body, {
    runValidators: true,
  });
  response.status(200).send(updated);
});

module.exports = blogsRouter;
