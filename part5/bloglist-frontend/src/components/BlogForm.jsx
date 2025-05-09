import { useState } from 'react'
import blogService from '../services/blogs'
import Notification from './Notification'

const BlogForm = ({ hideForm, createBlog }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    url: ''
  })
  const [status, setStatus] = useState('')

  const create = async (e) => {
    e.preventDefault()
    await createBlog({ ...formData })

    // setTimeout(() => {
    //   setFormData({})
    //   setStatus({
    //     title: '',
    //     author: '',
    //     url: ''
    //   })
    //   hideForm()
    // }, 5000)
  }

  const onCancel = (e) => {
    e.preventDefault()
    hideForm()
  }

  return (
    <div>
      <h2>create new</h2>
      {status === 'success' && (
        <Notification
          status={status}
          text={`a new blog ${formData.title} by ${formData.author} added`}
        />
      )}
      <form onSubmit={create}>
        <div>
          <label htmlFor="title">title</label>
          <input
            type="text"
            name="title"
            id="title"
            data-testid="title"
            value={formData.title}
            onChange={({ target }) => setFormData({ ...formData, title: target.value })}
          />
        </div>
        <div>
          <label htmlFor="author">author</label>
          <input
            type="text"
            name="author"
            id="author"
            data-testid="author"
            value={formData.author}
            onChange={({ target }) => setFormData({ ...formData, author: target.value })}
          />
        </div>
        <div>
          <label htmlFor="url">url</label>
          <input
            type="text"
            name="url"
            id="url"
            data-testid="url"
            value={formData.url}
            onChange={({ target }) => setFormData({ ...formData, url: target.value })}
          />
        </div>
        <button type="submit">create</button>
        <button onClick={onCancel}>cancel</button>
      </form>
    </div>
  )
}

export default BlogForm
