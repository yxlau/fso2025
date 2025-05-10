const { test, expect, beforeEach, describe, beforeAll } = require('@playwright/test')
const { loginWith, createBlog, apiCreateUser, apiLogin, apiCreateBlog, apiGetToken } = require('./helper')

describe('Blog app', () => {
  // Global setup - runs once before all tests
  beforeAll(async ({ request }) => {
    await request.post("http://localhost:3001/api/testing/reset")
  })

  // Before each test in the entire suite
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3001/api/testing/reset")
    await apiCreateUser(request, 'tester', 'testy', 'testword')
    await page.goto('/')

  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByTestId("username")).toBeVisible()
    await expect(page.getByTestId("password")).toBeVisible()
  })

  describe('Login', () => {

    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'testy', 'testword')
      await expect(page.getByText("tester logged in")).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'fake', 'faker')
      await expect(page.getByText("wrong username or password")).toBeVisible()
      await expect(page.getByText("tester logged in")).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    test.beforeEach(async ({ page, request }) => {
      await loginWith(page, 'testy', 'testword')
      await expect(page.getByText("tester logged in")).toBeVisible()
    })

    test('can create blog', async ({ page }) => {
      await createBlog(page, 'the title', 'the author', 'http://url.com')
      await expect(page.getByText("the title, the author")).toBeVisible()
    })

    test('can like a blog', async ({ page, request }) => {
      await createBlog(page, 'likeable title', 'likeable author', 'http://url.com')

      await page.getByRole('button', { name: 'view' }).first().click()
      const likeCount = parseInt(await page.getByTestId('likeCount').first().innerText())
      await page.getByRole('button', { name: 'like' }).first().click()
      await page.waitForTimeout(1000)
      const newCount = parseInt(await page.getByTestId('likeCount').first().innerText())
      await expect(newCount).toBe(likeCount + 1)
    })

    test('can delete own blog', async ({ page }) => {
      const title = `removable ${Math.floor(Math.random() * 1001)}`
      await createBlog(page, title, 'the author', 'http://removable.com')
      await page.getByText(`${title}, the author`).waitFor()
      await page.getByRole('button', { name: 'view' }).last().click()
      page.on('dialog', dialog => dialog.accept())
      await page.getByRole('button', { name: 'remove' }).click()
      await expect(page.getByText(`${title}, the author`)).not.toBeVisible()
    })
  })

  describe('Blog interactions', () => {
    beforeEach(async ({ page, request }) => {
      await apiCreateUser(request, 'othertester', 'other', 'otherword')
    })

    test('blogs are sorted by likes', async ({ page, request }) => {
      const token = await apiGetToken(request, 'other', 'otherword')
      for (let i = 1; i <= 3; i++) {
        const blogResponse = await apiCreateBlog(request, {
          title: `title ${i}`,
          author: `author ${i}`,
          likes: i
        }, token)
        await blogResponse.json()
      }

      await loginWith(page, 'testy', 'testword')
      await expect(page.getByText("tester logged in")).toBeVisible()
      page.reload()
      await page.getByRole('button', { name: 'view' }).first().click()
      await expect(page.getByText('likes 3')).toBeVisible()
      await page.getByRole('button', { name: 'view' }).last().click()
      await expect(page.getByText('likes 1')).toBeVisible()
    })

    test('cannot delete other blogs', async ({ page, request }) => {
      const token = await apiGetToken(request, 'other', 'otherword')
      const blogResponse = await apiCreateBlog(request, {
        title: 'other title',
        author: 'other author',
        url: 'http://otherurl.com'
      }, token)

      await loginWith(page, 'testy', 'testword')
      await expect(page.getByText("tester logged in")).toBeVisible()
      page.reload()

      await page.getByText('other title').waitFor({ timeout: 5000 })
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
    })
  })
})