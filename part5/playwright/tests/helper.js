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

const apiCreateBlog = async(request, blog, token) => {
  return await request.post(`${baseUrl}/blogs`, {
    data: {
      title: blog.title || 'title',
      author: blog.author || 'author',
      url: blog.url || 'http://url.com',
      likes: blog.likes || 0
    },
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

const apiUpdateBlog = async(request, id, blog, token) => {
  return await request.put(`${baseUrl}/blogs/${id}`, {
    data: blog,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

const apiGetToken = async(request, username, password) => {
  const loginResponse = await request.post(`${baseUrl}/login`, {
    data: {
      username: username,
      password: password
    }
  })
  const loginData = await loginResponse.json()
  return loginData.token
}

export { loginWith, createBlog, apiCreateUser, apiCreateBlog, apiLogin, apiUpdateBlog, apiGetToken }