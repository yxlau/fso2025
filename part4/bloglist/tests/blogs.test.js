const { test, after, beforeEach, describe, before } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const bcrypt = require('bcrypt')

const api = supertest(app);

describe("Blog API", async () => {
  let user;
  let token

  beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});
    user = await new User({
      username: 'happy',
      name: 'Happy',
      passwordHash: await bcrypt.hash('happyboy', 10)
    }).save();

    const responseToken = await api.post('/api/login').send({ username: 'happy', password: 'happyboy' })
    token = responseToken.body.token

    for (let blog of helper.initialBlogs) {
      let blogObject = new Blog({
        ...blog,
        user: user._id,
      });
      await blogObject.save();
    }
  })

  describe("reading blogs", () => {
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

    test("blog list returns user info", async () => {
      const response = await api.get("/api/blogs");
      const users = response.body.filter((blog) => "user" in blog).length;

      assert.strictEqual(response.body.length, users);
    });
  })

  describe("creating blogs", () => {

    test("401 error when creating blog without signing in", async () => {
      await api.post("/api/blogs").expect(401)
    });

    test("signed in user can create blogs", async () => {
      const originalCount = await Blog.countDocuments({})
      const response = (await api.post("/api/blogs")
        .set({ Authorization: `Bearer ${token}` })
        .send(helper.newBlog));

      const newCount = await Blog.countDocuments({})

      assert.strictEqual(newCount - originalCount, 1);
    });

    describe("missing properties", () => {
      test("when missing, likes default to 0 on create", async () => {
        const { likes, ...blog } = helper.newBlog;
        const response = await api.post("/api/blogs")
          .set({ Authorization: `Bearer ${token}` })
          .send(blog);

        assert.strictEqual(response.body.likes, 0);
      });

      test("when title is missing, server responds with 400 error", async () => {
        const { title, ...blog } = helper.newBlog;
        const response = await api.post("/api/blogs")
          .set({ Authorization: `Bearer ${token}` })
          .send(blog)
          .expect(400);
      });

      test("when url is missing, server responds with 400 error", async () => {
        const { url, ...blog } = helper.newBlog;
        const response = await api.post("/api/blogs")
          .set({ Authorization: `Bearer ${token}` })
          .send(blog)
          .expect(400);
      });
    });
  })

  describe("deleting blogs", () => {
    let blogToDelete;

    beforeEach(async () => {
      const response = await api.post('/api/blogs')
      .set({ Authorization: `Bearer ${token}` })
      .send(helper.initialBlogs[1])
      blogToDelete = response.body
    })

    test("cannot delete blog when not signed in", async () => {
      await api.delete(`/api/blogs/${blogToDelete.id}`)
        .expect(401)
    })

    test("successfully deletes a single blog", async () => {
      const blogs = await Blog.find({})

      const response = await api.delete(`/api/blogs/${blogToDelete.id}`)
        .set({ Authorization: `Bearer ${token}` })
        .expect(204);

      const newCount = await Blog.countDocuments()

      assert.strictEqual(blogs.length - newCount, 1);
    });

  })

  describe("updates blog", () => {
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

  })
})

after(async () => {
  await mongoose.connection.close();
});
