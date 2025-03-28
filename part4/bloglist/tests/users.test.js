const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Blog = require("../models/blog");

const api = supertest(app);

describe("user creation", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const user = new User(helper.newUsers[0]);
    await user.save();
  });

  test("password must be at least 3 characters long", async () => {
    await api
      .post("/api/users")
      .send({ name: "somebody", username: "somebody", password: "hi" })
      .expect(400);
  });

  test("username must be at least 3 characters long", async () => {
    await api
      .post("/api/users")
      .send({ name: "somebody", username: "hi", password: "legit" })
      .expect(400);
  });

  test("username must be unique", async () => {
    await api.post("/api/users").send(helper.newUsers[0]).expect(400);
  });
});

describe.only("blogs", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});
    const user = new User(helper.newUsers[0]);
    await user.save();

    for (let blog of helper.initialBlogs) {
      let blogObject = new Blog({
        ...blog,
        user: user._id,
      });
      const saved_blog = await blogObject.save();
      user.blogs = user.blogs.concat(saved_blog._id);
      await user.save();
    }
  });

  test.only("user's blogs are listed", async () => {
    const response = await api.get("/api/users");
    assert.ok(response.body[0].blogs);
    assert.strictEqual(
      response.body[0].blogs.length,
      helper.initialBlogs.length
    );
  });
});

after(async () => {
  await mongoose.connection.close();
});
