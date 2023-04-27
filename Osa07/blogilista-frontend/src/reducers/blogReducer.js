import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    addLike(state, action) {
      return state.map((blog) => {
        return blog.id === action.payload.id ? action.payload : blog
      })
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload.id)
    },
    newComment(state, action) {
      console.log(JSON.parse(JSON.stringify(state)))
    },
  },
})

export const { setBlogs, appendBlog, addLike, removeBlog, newComment } =
  blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
  }
}

export const likeBlog = (id, blog) => {
  return async (dispatch) => {
    const likedBlog = await blogService.update(id, blog)
    console.log('This is liked blog', blog)
    dispatch(addLike(likedBlog))
  }
}

export const deleteSelectedBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch(removeBlog({ id }))
  }
}

export const addCommentToBlog = (id, comment) => {
  return async (dispatch) => {
    await blogService.addNewComment(id, comment)
    dispatch(newComment({ id: id, comment: comment }))
  }
}

export default blogSlice.reducer
