import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { exact } from 'prop-types'

test('renders content', () => {
  const blog = {
    title: 'Siivilä keittiössä',
    author: 'Maikko Merimetsä',
    url: 'http://laukka.fi',
    likes: 52,
  }

  render(<Blog blog={blog} />)

  const title = screen.getByText('Siivilä keittiössä', { exact: false })
  const author = screen.getByText('Maikko Merimetsä', { exact: false })

  expect(title).toBeDefined()
  expect(author).toBeDefined()
})

test('render all content, when view button is clicked', async () => {
  const blog = {
    title: 'Siivilä keittiössä',
    author: 'Maikko Merimetsä',
    url: 'http://laukka.fi',
    likes: 52,
    user: {
      name: 'Makke',
    },
  }

  render(<Blog blog={blog} user="Makke" />)

  const user = userEvent.setup()
  const button = screen.getByText('view', { exact: false })

  await user.click(button)

  const title = screen.getByText('Siivilä keittiössä', { exact: false })
  const author = screen.getByText('Maikko Merimetsä', { exact: false })
  const url = screen.getByText('http://laukka.fi', { exact: false })
  const likes = screen.getByText(52, { exact: false })
  const userToShow = screen.getByText('Makke', { exact: false })

  expect(title).toBeDefined()
  expect(author).toBeDefined()
  expect(url).toBeDefined()
  expect(likes).toBeDefined()
  expect(userToShow).toBeDefined()
})

test('when like is pressed twice, component is rendered twice', async () => {
  const blog = {
    title: 'Siivilä keittiössä',
    author: 'Maikko Merimetsä',
    url: 'http://laukka.fi',
    likes: 52,
    user: {
      name: 'Makke',
    },
  }

  let container

  const mockHandler = jest.fn()

  container = render(
    <Blog blog={blog} user="Makke" handleLike={mockHandler} />
  ).container

  const user = userEvent.setup()
  const viewButton = screen.getByText('view', { exact: false })

  await user.click(viewButton)
  const button = container.querySelector('#like')

  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
