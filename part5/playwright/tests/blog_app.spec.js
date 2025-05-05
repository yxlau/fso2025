const { test, expect, beforeEach, describe } = require('@playwright/test')

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
      await page.getByTestId("username").fill("testy")
      await page.getByTestId("password").fill("testword")

      await page.getByRole('button', { name: 'login' }).click() 

      await expect(page.getByText("tester logged in")).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId("username").fill("faker")
      await page.getByTestId("password").fill("fakeword")

      await page.getByRole('button', { name: 'login' }).click() 

      await expect(page.getByText("wrong username or password")).toBeVisible()
    })
    })
  })

