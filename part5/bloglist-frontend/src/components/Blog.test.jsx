import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import blogService from '../services/blogs'

vi.mock('../services/blogs')

const blog = {
  author: 'Author',
  title: 'Title',
  likes: 1,
  url: 'http://url.com',
  user: {
    id: 123,
    name: 'Name'
  }
}

const user = {
  name: 'Name',
  id: 123
}

describe('blog tests', () => {
  let container
  beforeEach(() => {
    ({ container } = render(<Blog blog={blog} user={user} />))
  })

  test('renders only title and author by default', () => {
    const header = screen.getByText('Title, Author')
    const details = container.querySelector('.details')

    expect(header).toBeDefined()
    expect(details).not.toHaveTextContent('Likes')
  })

  test('shows url and likes when user clicks the view details button', async () => {
    const agent = userEvent.setup()
    const button = screen.getByText('view')
    await agent.click(button)

    expect(screen.getByText(/likes\s+1/)).toBeInTheDocument()
    expect(container).toHaveTextContent(blog.url)
  })

  test('like button works', async () => {
    blogService.update = vi.fn().mockResolvedValue()

    const agent = userEvent.setup()
    const viewButton = screen.getByText('view')
    await agent.click(viewButton)
    const likeButton = screen.getByText('like')
    await agent.click(likeButton)
    await agent.click(likeButton)

    expect(blogService.update).toHaveBeenCalledTimes(2)
  })
})
