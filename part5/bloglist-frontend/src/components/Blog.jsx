import PropTypes from 'prop-types'
import { useState, useRef } from 'react'
import Togglable from '../components/Togglable'
import blogService from '../services/blogs'
const Blog = ({ blog, user }) => {
  const [isVisible, setVisibility] = useState(false)
  const [buttonLabel, setLabel] = useState('view')

  const blogDetailsRef = useRef()

  const toggleVisibility = () => {
    blogDetailsRef.current.toggleVisibility()
    setVisibility(!isVisible)
    setLabel(!isVisible ? 'hide' : 'view')
  }

  const like = async () => {
    try {
      const response = await blogService.update(blog.id, {
        ...blog,
        likes: blog.likes + 1,
        user: blog.user.id,
      })
    } catch (error) {
      console.log('Error', error.message)
    }
  }

  const deleteBlog = async () => {
    const confirm = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}?`
    )
    if (!confirm) return
    try {
      const response = await blogService.deleteOne(blog.id)
    } catch (error) {
      console.log('Error', error.message)
    }
  }

  return (
    <div style={{ border: '1px solid #ccc', padding: '3px' }}>
      {blog.title}, {blog.author}{' '}
      <button onClick={toggleVisibility}>{buttonLabel}</button>
      <Togglable ref={blogDetailsRef}>
        {blog.url}
        <br />
        likes {blog.likes} <button onClick={like}>like</button>
        <br />
        {blog.user.name}
        {blog.user.id === user.id ? (
          <button onClick={deleteBlog}>remove</button>
        ) : (
          ''
        )}
      </Togglable>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog
