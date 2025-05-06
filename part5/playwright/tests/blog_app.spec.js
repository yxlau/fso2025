const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const username = await page.getByTestId("username")
    const password = await page.getByTestId("password")
    await expect(username).toBeVisible()
    await expect(password).toBeVisible()
  })

  describe('Login', () => {
    beforeEach(async({page, request}) => {
      await request.post("http://localhost:3001/api/testing/reset")
      await request.post("http://localhost:3001/api/users", {
        data: {
          name: 'tester',
          password: 'testword',
          username: 'testy'
        }
      })
    })
    test('succeeds with correct credentials', async ({ page }) => {
     await loginWith(page, 'testy', 'testword')

      await expect(page.getByText("tester logged in")).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'fake', 'faker')

      await expect(page.getByText("wrong username or password")).toBeVisible()
      await expect(page.getByText("tester logged in")).not.toBeVisible()

    })

    describe('When logged in', () => {
      beforeEach(async({page}) => {
        await loginWith(page, 'testy', 'testword')
      })

      test('can create blog', async({page}) => {
        await createBlog(page, 'the title', 'the author', 'http://url.com')
        await page.getByText('the title, the author').waitFor()

        await expect(page.getByText("the title, the author")).toBeVisible()
      })

      test('can like a blog', async({page}) => {
        await page.getByRole('button', {name: 'view'}).waitFor()
        await page.getByRole('button', {name: 'view'}).first().click()
        const likeCount = parseInt(await page.getByTestId('likeCount').first().innerText())
        await page.getByRole('button', {name: 'like'}).first().click()
        await page.waitForTimeout(3000)
        const newCount = parseInt(await page.getByTestId('likeCount').first().innerText())

        await expect(newCount).toBe(likeCount + 1)
      })
    })
    })

   
  })

