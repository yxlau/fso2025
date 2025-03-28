const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});
  const user = await new User(helper.newUsers[0]).save();

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog({
      ...blog,
      user: user._id,
    });
    await blogObject.save();
  }
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("returns the correct number of blogs", async () => {
  const response = await api.get("/api/blogs");
  assert.strictEqual(response.body.length, 4);
});

test("uid of blog posts is id instead of _id", async () => {
  const response = await api.get("/api/blogs");
  assert.ok(response.body[0].id);
  assert.ok(!response.body[0]._id);
});

test("blog posts can be created", async () => {
  const initialBlogs = await api.get("/api/blogs");
  const response = await api.post("/api/blogs").send(helper.newBlog);

  const newBlogs = await api.get("/api/blogs");

  assert.strictEqual(newBlogs.body.length - initialBlogs.body.length, 1);
});

describe("missing properties", () => {
  test("when missing, likes default to 0 on create", async () => {
    const { likes, ...blog } = helper.newBlog;
    const response = await api.post("/api/blogs").send(blog);

    assert.strictEqual(response.body.likes, 0);
  });

  test("when title is missing, server responds with 400 error", async () => {
    const { title, ...blog } = helper.newBlog;
    const response = await api.post("/api/blogs").send(blog).expect(400);
  });

  test("when url is missing, server responds with 400 error", async () => {
    const { url, ...blog } = helper.newBlog;
    const response = await api.post("/api/blogs").send(blog).expect(400);
  });
});

test("successfully deletes a single blog", async () => {
  const blogs = await api.get("/api/blogs");
  await api.delete(`/api/blogs/${blogs.body[0].id}`).expect(204);

  const updatedBlogs = await api.get("/api/blogs");

  assert.strictEqual(blogs.body.length - updatedBlogs.body.length, 1);
});

test("successfully updates a single blog", async () => {
  const blogs = await api.get("/api/blogs");
  const { likes, id, ...body } = blogs.body[0];

  await api
    .put(`/api/blogs/${id}`)
    .send({
      likes: likes + 2,
      body,
    })
    .expect(200);

  const updatedBlog = await api.get(`/api/blogs/${id}`);

  assert.strictEqual(updatedBlog.body.likes - likes, 2);
});

describe.only("blog list expansion", () => {
  test.only("blog list returns user info", async () => {
    const response = await api.get("/api/blogs");
    const users = response.body.filter((blog) => "user" in blog).length;

    assert.strictEqual(response.body.length, users);
  });
});

after(async () => {
  await mongoose.connection.close();
});
