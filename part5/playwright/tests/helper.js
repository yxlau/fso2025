const baseUrl = 'http://localhost:3001/api'

const loginWith = async (page, username, password)  => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async(page, title, author, url) => {
  await page.getByRole('button', {name: 'new blog'}).click()

  await page.getByTestId("title").fill(title)
  await page.getByTestId("author").fill(author)
  await page.getByTestId("url").fill(url)
  await page.getByRole('button', {name: 'create'}).click()

}

const apiCreateUser = async(request, name, username, password) => {
  return await request.post(`${baseUrl}/users`, {
    data: {
      name: name,
      password: password,
      username: username
    }
  })
}

const apiLogin = async(request, username, password) =>{
  return await request.post(`${baseUrl}/login`, {
    data: {
      username: username,
      password: password
    }
  })
}

const apiCreateBlog = async(request, title, author, url, token) => {
  return await request.post(`${baseUrl}/blogs`, {
    data: {
      title: title,
      author: author,
      url: url
    },
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

export { loginWith, createBlog, apiCreateUser, apiCreateBlog, apiLogin }