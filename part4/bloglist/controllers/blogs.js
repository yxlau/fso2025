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
  // const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);

  // if (!decodedToken.id) {
  //   return response.status(401).json({ error: "token invalid" });
  // }

  if (!body.title || !body.url) {
    return response.status(400).end();
  }

  const user = await User.findOne({});

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
  const deleted = await Blog.findByIdAndDelete(request.params.id);
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
