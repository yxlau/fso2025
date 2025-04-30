import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders only title and author by default', () => {
  const blog = {
    author: 'Author',
    title: 'Title',
    likes: 1,
    user: {
      id: 123,
      name: 'Name'
    }
  }

  const user = {
    name: 'Name',
    id: 123
  }

  const { container } = render(<Blog blog={blog} user={user} />)

  const header = screen.getByText('Title, Author')
  const details = container.querySelector('.details')

  expect(header).toBeDefined()
  expect(details).not.toHaveTextContent('Likes')
})