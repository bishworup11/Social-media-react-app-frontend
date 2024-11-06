import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postsApi } from "../api/posts";

const initialState = {
  posts: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
};

// Async Thunks
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await postsApi.getPosts(page, limit);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch posts"
      );
    }
  }
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (postData, { rejectWithValue }) => {
    try {
      const response = await postsApi.createPost(postData);
      return response.post;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create post"
      );
    }
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (postData, { rejectWithValue }) => {
    try {
      const response = await postsApi.updatePost(postData);
      return response.post;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update post"
      );
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postData, { rejectWithValue }) => {
    try {
      await postsApi.deletePost(postData);
      return postData.postId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete post"
      );
    }
  }
);

export const reactToPost = createAsyncThunk(
  "posts/reactToPost",
  async (reactData, { rejectWithValue }) => {
    try {
      const response = await postsApi.reactToPost(reactData);
      return {
        ...response,
        postId: reactData.postId,
        userId: reactData.userId,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to react to post"
      );
    }
  }
);

export const createComment = createAsyncThunk(
  "posts/createComment",
  async (commentData, { rejectWithValue }) => {
    try {
      const response = await postsApi.createComment(commentData);
      return response.newComment;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create comment"
      );
    }
  }
);

export const createReply = createAsyncThunk(
  "posts/createReply",
  async (replyData, { rejectWithValue }) => {
    try {
      const response = await postsApi.createReply(replyData);
      return response.newReply;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create reply"
      );
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Posts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.data;
        //console.log(action.payload.data);
        state.totalPages = action.payload.meta.last_page;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Post
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.unshift(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Post
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(
          (post) => post.postId === action.payload.postId
        );
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      // Delete Post
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(
          (post) => post.postId !== action.payload
        );
      })
      // React to Post
      .addCase(reactToPost.fulfilled, (state, action) => {
        const post = state.posts.find(
          (post) => post.postId === action.payload.postId
        );
        if (post) {
          if (action.payload.message.includes("undo")) {
            post.postReacts = post.postReacts.filter(
              (react) => !(react.userId === action.payload.userId)
            );
          } else {
            post.postReacts = [
              ...post.postReacts,
              action.payload.postReactCreated,
            ];
          }
        }
      })
      // Create Comment
      .addCase(createComment.fulfilled, (state, action) => {
        const post = state.posts.find(
          (post) => post.postId === action.payload.postId
        );
        if (post) {
          post.comments = [action.payload, ...post.comments];
        }
      })
      // Create Reply
      .addCase(createReply.fulfilled, (state, action) => {
        const post = state.posts.find((post) =>
          post.comments.some(
            (comment) => comment.commentId === action.payload.commentId
          )
        );
        if (post) {
          const comment = post.comments.find(
            (comment) => comment.commentId === action.payload.commentId
          );
          if (comment) {
            comment.replies = [action.payload, ...comment.replies];
          }
        }
      });
  },
});

export const { clearError, setCurrentPage } = postSlice.actions;
export default postSlice.reducer;
