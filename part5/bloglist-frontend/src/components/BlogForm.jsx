import { useState } from 'react'
import blogService from '../services/blogs'
import Notification from './Notification'

const BlogForm = ({ hideForm, blogs, setBlogs, user }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [status, setStatus] = useState('')

  const create = async (e) => {
    e.preventDefault()

    try {
      const response = await blogService.create({
        title,
        author,
        url,
        user
      })

      setStatus('success')
      setBlogs([...blogs, response])
    } catch (error) {
      setStatus('error')
      console.log('Error: ', error.message)
    }
    setTimeout(() => {
      setTitle('')
      setAuthor('')
      setUrl('')
      setStatus('')
      hideForm()
    }, 5000)
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
          text={`a new blog ${title} by ${author} added`}
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
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">author</label>
          <input
            type="text"
            name="author"
            id="author"
            data-testid="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label htmlFor="url">url</label>
          <input
            type="text"
            name="url"
            id="url"
            data-testid="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
        <button onClick={onCancel}>cancel</button>
      </form>
    </div>
  )
}

export default BlogForm
