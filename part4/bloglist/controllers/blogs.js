const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs);
});

blogsRouter.get("/:id", async(request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog)
})

blogsRouter.post("/", async (request, response) => {
  if (! request.body.title || ! request.body.url){
    return response.status(400).end()
  }
  const blog = request.body.likes
    ? new Blog(request.body)
    : new Blog({ ...request.body, likes: 0 });

  const result = await blog.save()

  response.status(201).json(result);
});

blogsRouter.delete("/:id", async(request, response) => {
  const deleted = await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put("/:id", async(request, response) => {
  const {id, ...body} = request.body
  const updated = await Blog.findByIdAndUpdate(request.params.id, body, { runValidators: true})
  response.status(200).send(updated)
})

module.exports = blogsRouter;
