const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('returns the correct number of blogs', async() => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, 4)
})

test('uid of blog posts is id instead of _id', async() => {
  const response = await api.get('/api/blogs')
  assert.ok(response.body[0].id)
  assert.ok(! response.body[0]._id)
})

after(async () => {
  await mongoose.connection.close()
})