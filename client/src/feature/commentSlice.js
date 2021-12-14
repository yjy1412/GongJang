import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//comments
export const fetchGetAllComments = createAsyncThunk(
  'comment/fetchGetAllComments',
  async (posts_id) => {
    const response = await axios.get(`/comments/${posts_id}`);
    return response.data.data;
  }
)

export const fetchCreateComment = createAsyncThunk(
  'comment/fetchCreateComment',
  async (form) => {
    const { content, post_id } = form;
    const response = await axios.post('/comments', { content, post_id });
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
//recomments
export const fetchGetAllrecomments = createAsyncThunk(
  'comment/fetchGetAllrecomments',
  async (form) => {
    const { comments_id, posts_id } = form;
    const response = await axios.get(`/recomments/${comments_id}`, { posts_id});
    return response.data.data;
  }
)

export const fetchCreaterecomment = createAsyncThunk(
  'comment/fetchCreaterecomment',
  async (form) => {
    const { content, posts_id, comments_id } = form;
    const response = await axios.post(`/recomments/${comments_id}`, { content, posts_id });
    return response.data.data;
  }
)

export const fetchUpdatrecomment = createAsyncThunk(
  'comment/fetchUpdatrecomment',
  async (form) => {
    const { comments_id, post_id, content, recomments_id } = form;
    const response = await axios.patch(`/recomments/${comments_id}`, { post_id, content, recomments_id });
    return response.data.data;
  }
)

export const fetchRemoverecomment = createAsyncThunk(
  'comment/fetchRemoverecomment',
  async (form) => {
    const { posts_id, comments_id, recomments_id } = form;
    await axios.delete(`/recomments/${comments_id}`, {data: { posts_id, recomments_id }});
  }
)

const initialState = {
  commentList:[],
  loading: false,
  recommentList: [],
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
    [fetchCreateComment.fulfilled]: (state, { payload }) => {
      state.commentList = payload;
    },
    [fetchGetAllrecomments.fulfilled]: (state, { payload }) => {
      state.recommentList = payload;
    },
    [fetchCreaterecomment.fulfilled]: (state, { payload }) => {
      state.recommentList = payload;
    },
  }
})

export const { removeComment, editComment, unloadComment } = commentSlice.actions;
export default commentSlice.reducer;