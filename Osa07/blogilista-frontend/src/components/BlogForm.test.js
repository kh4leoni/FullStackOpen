import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm/> new blog is added with correct info', async () => {
  const user = userEvent.setup()
  const currentBlog = jest.fn()

  let container

  container = render(<BlogForm currentBlog={currentBlog} />).container

  const titleInput = container.querySelector('#title')
  const authorInput = container.querySelector('#author')
  const urlInput = container.querySelector('#url')
  const sendButton = container.querySelector('#send-button')

  await user.type(titleInput, 'adding new bloglisting is fun')
  await user.type(authorInput, 'Timothy Tester')
  await user.type(urlInput, 'http://testland.fi')
  await user.click(sendButton)

  expect(currentBlog.mock.calls).toHaveLength(1)

  expect(currentBlog.mock.calls[0][0].title).toBe(
    'adding new bloglisting is fun'
  )
  expect(currentBlog.mock.calls[0][0].author).toBe('Timothy Tester')
  expect(currentBlog.mock.calls[0][0].url).toBe('http://testland.fi')
})
