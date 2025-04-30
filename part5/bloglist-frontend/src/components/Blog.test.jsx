import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


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

test('renders only title and author by default', () => {

  const { container } = render(<Blog blog={blog} user={user} />)

  const header = screen.getByText('Title, Author')
  const details = container.querySelector('.details')

  expect(header).toBeDefined()
  expect(details).not.toHaveTextContent('Likes')
})

test('shows url and likes when user clicks the view details button', async () => {
  const mockHandler = vi.fn()

  const { container } = render(

    <Blog blog={blog} user={user} />

  )

  const agent = userEvent.setup()
  const button = screen.getByText("view")
  await agent.click(button)

  expect(screen.getByText(/likes\s+1/)).toBeInTheDocument()
  expect(container).toHaveTextContent(blog.url)
})