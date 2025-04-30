import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import blogService from '../services/blogs'
import BlogForm from './BlogForm'

vi.mock('../services/blogs')



describe('blog tests', () => {
  let container
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

  test('blog form works', async () => {
    const agent = userEvent.setup()


    // Create the mock function
    blogService.create = vi.fn().mockResolvedValue()

    render(<BlogForm hideForm={() => { }} />)

    // Fill in the form
    await agent.type(screen.getByLabelText('title'), blog.title)
    await agent.type(screen.getByLabelText('author'), blog.author)
    await agent.type(screen.getByLabelText('url'), blog.url)

    // Submit the form
    await agent.click(screen.getByText('create'))

    // Check mock.calls - this is what the exercise is looking for
    expect(blogService.create.mock.calls).toHaveLength(1)
    expect(blogService.create.mock.calls[0][0]).toEqual({
      title: 'Title',
      author: 'Author',
      url: 'http://url.com'
    })
  })
})
