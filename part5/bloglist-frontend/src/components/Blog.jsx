import PropTypes from 'prop-types'
import Togglable from '../components/Togglable'
import blogService from '../services/blogs'
import { useState } from 'react'
const Blog = ({ blog, user }) => {
  const [likes, setLikes] = useState(blog.likes)

  const like = async () => {
    try {
      const response = await blogService.update(blog.id, {
        ...blog,
        likes: likes + 1,
        user: blog.user.id,
      })
      setLikes(likes + 1)
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
      <Togglable buttonLabel="show">
        <div className="details">
          {blog.url}
          <br />
          likes <span data-testid="likeCount">{likes}</span><button onClick={like}>like</button>
          <br />
          {user.name}
          {blog.user.id === user.id ? (
            <button onClick={deleteBlog}>remove</button>
          ) : (
            ''
          )}
        </div>
      </Togglable>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog
