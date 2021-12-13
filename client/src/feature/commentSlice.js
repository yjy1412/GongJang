import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchGetAllComments = createAsyncThunk(
  'comment/fetchGetAllComments',
  async (post_id) => {
    const response = await axios.get(`/comments/${post_id}`);
    return response.data.data;
  }
)

export const fetchCreateComment = createAsyncThunk(
  'comment/fetchCreateComment',
  async (form) => {
    const { post_id, content } = form;
    const response = await axios.post('/comments', { post_id, content });
    return response.data.data;
  }
)

export const fetchUpdateComment = createAsyncThunk(
  'comment/fetchUpdateComment',
  async (form) => {
    const { comments_id, post_id, content } = form;
    const response = await axios.patch(`/comments/${comments_id}`, { post_id, content });
    return response.data.data;
  }
)

export const fetchRemoveComment = createAsyncThunk(
  'comment/fetchRemoveComment',
  async (form) => {
    const { post_id, comments_id } = form;
    await axios.delete(`/comments/${comments_id}`, {data: { post_id }});
  }
)

const initialState = {
  commentList:[],
  loading: false,
}

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    removeComment: (state, { payload: id }) => {
      state.commentList.map(comment => {
        if(comment.id === id){
          comment.isDelete = !comment.isDelete;
        }
        return comment;
      })
    },
    editComment: (state, { payload: { id, content } }) => {
      state.commentList.map(comment => {
        if(comment.id === id){
          comment.content = content;
        }
        return comment;
      })
    },
    unloadComment: () => {
      return initialState;
    }
  },
  extraReducers: {
    [fetchGetAllComments.pending]: (state) => {
      state.loading = true;
    },
    [fetchGetAllComments.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.commentList = payload;
    },
    [fetchGetAllComments.rejected]: (state, { payload }) => {
      state.loading = false;
      state.commentList = payload;
    },
  }
})

export const { removeComment, editComment, unloadComment } = commentSlice.actions;
export default commentSlice.reducer;