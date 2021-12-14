import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//comments
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
    const { content, post_id } = form;
    const response = await axios.post('/comments', { content, post_id });
    return response.data.data;
  }
)

export const fetchUpdateComment = createAsyncThunk(
  'comment/fetchUpdateComment',
  async (form) => {
    const { comment_id, post_id, content } = form;
    const response = await axios.patch(`/comments/${comment_id}`, { post_id, content });
    return response.data.data;
  }
)

export const fetchRemoveComment = createAsyncThunk(
  'comment/fetchRemoveComment',
  async (form) => {
    const { post_id, comment_id } = form;
    await axios.delete(`/comments/${comment_id}`, {data: { post_id }});
  }
)
//recomments
export const fetchGetAllrecomments = createAsyncThunk(
  'comment/fetchGetAllrecomments',
  async (form) => {
    const { comment_id, post_id } = form;
    const response = await axios.get(`/recomments/${comment_id}`, { post_id});
    return response.data;
  }
)

export const fetchCreaterecomment = createAsyncThunk(
  'comment/fetchCreaterecomment',
  async (form) => {
    const { content, post_id, comment_id } = form;
    const response = await axios.post(`/recomments/${comment_id}`, { content, post_id });
    return response.data;
  }
)

export const fetchUpdatrecomment = createAsyncThunk(
  'comment/fetchUpdatrecomment',
  async (form) => {
    const { comment_id, post_id, content, recomment_id } = form;
    await axios.patch(`/recomments/${comment_id}`, { post_id, content, recomment_id });
  }
)

export const fetchRemoverecomment = createAsyncThunk(
  'comment/fetchRemoverecomment',
  async (form) => {
    const { post_id, comment_id, recomment_id } = form;
    await axios.delete(`/recomments/${comment_id}`, {data: { post_id, recomment_id }});
  }
)

const initialState = {
  commentList:[],
  recommentList: [],
}

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    removeComment: (state, { payload: id }) => {
      state.commentList.map(comment => {
        if(comment.id === id){
          comment.isDelete = true;
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
    },
    removeRecomment: (state, { payload: id }) => {
      state.recommentList.map(recomment => {
        if(recomment.id === id){
          recomment.isDelete = true;
        }
        return recomment;
      })
    },
    editRecomment: (state, { payload: { id, content } })=> {
      state.recommentList.map(recomment => {
        if(recomment.id === id){
          recomment.content = content;
        }
        return recomment;
      })
    }
  },
  extraReducers: {
    [fetchGetAllComments.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.commentList = payload;
    },
    [fetchCreateComment.fulfilled]: (state, { payload }) => {
      state.commentList = payload;
    },
    [fetchGetAllrecomments.fulfilled]: (state, { payload }) => {
      state.recommentList.push(...payload);
    },
    [fetchCreaterecomment.fulfilled]: (state, { payload }) => {
      state.recommentList.push(payload);
    },
  }
})

export const { 
  removeComment, 
  editComment, 
  unloadComment,
  removeRecomment,
  editRecomment
} = commentSlice.actions;
export default commentSlice.reducer;