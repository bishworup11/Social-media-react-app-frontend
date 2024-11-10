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
  async ({ page, limit, userId }, { rejectWithValue }) => {
    try {
      if (userId) {
        const response = await postsApi.getPostsByUserId(page, limit, userId);
        return response;
      } else {
        const response = await postsApi.getPosts(page, limit);
        return response;
      }
    } catch (error) {
      //console.log(error.response.statusText);
      if (error.response.statusText === "Unauthorized") {
        localStorage.setItem("currentUser", null);
      }
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

export const updatePostVisibility = createAsyncThunk(
  "posts/updatePostVisibility",
  async (postData, { rejectWithValue }) => {
    try {
      const response = await postsApi.updatePostVisibility(postData);
      return response.post;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update post visibility"
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

      console.log(response);

      return {
        ...response,
        postId: reactData.postId,
        userId: response?.userId,
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

export const reactToComment = createAsyncThunk(
  "posts/reactToComment",
  async (reactData, { rejectWithValue }) => {
    try {
      const response = await postsApi.reactToComment({
        commentId: reactData.commentId,
        reactType: reactData.reactType,
      });

      return {
        ...response,
        postId: reactData.postId,
        userId: response.userId,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to react to post"
      );
    }
  }
);

export const reactToReply = createAsyncThunk(
  "posts/reactToReply",
  async (reactData, { rejectWithValue }) => {
    try {
      const response = await postsApi.reactToReply(reactData);

      return {
        ...response,
        postId: reactData.postId,
        userId: response.replyReactCreated.userId,
        commentId: reactData.commentId,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to react to post"
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
        state.totalPages = action.payload.meta.last_page;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log(action.payload);
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
        // console.log(index, state.posts[index]);
        if (index !== -1) {
          state.posts[index].text = action.payload.text;
        }
      })

      // Update Post visibility
      .addCase(updatePostVisibility.fulfilled, (state, action) => {
        // console.log(action.payload);
        const index = state.posts.findIndex(
          (post) => post.postId === action.payload.postId
        );
        // console.log(index, state.posts[index]);
        if (index !== -1) {
          state.posts[index].visibility = action.payload.visibility;
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
          if (action.payload.message.includes("Undo")) {
            if (action.payload.userId) {
              post.postReacts = post.postReacts.filter(
                (react) => react.userId !== action.payload.userId
              );
            } else {
              console.warn("Warning: userId is undefined for 'Undo' action.");
            }
          } else {
            post.postReacts = [...post.postReacts, action.payload.reaction];
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

      // React to comment
      .addCase(reactToComment.fulfilled, (state, action) => {
        const post = state.posts.find(
          (post) => post.postId === action.payload.postId
        );
        if (post) {
          // console.log(action.payload);
          //console.log(post);
          const comment = post.comments.find(
            (comment) =>
              comment.commentId === action.payload.commentReact.commentId
          );
          if (comment) {
            if (action.payload.message.includes("Undo")) {
              comment.reacts = comment.reacts.filter(
                (react) =>
                  !(react.userId === action.payload.commentReact.userId)
              );
            } else {
              comment.reacts = [
                ...comment?.reacts,
                action.payload.commentReact,
              ];
            }
          }
        }
      })

      // React to reply
      .addCase(reactToReply.fulfilled, (state, action) => {
        const post = state.posts.find(
          (post) => post.postId === action.payload.postId
        );
        if (post) {
          const comment = post.comments.find(
            (comment) => comment.commentId === action.payload.commentId
          );
          if (comment) {
            const reply = comment.replies.find(
              (reply) =>
                reply.replyId === action.payload.replyReactCreated.replyId
            );
            if (reply) {
              if (action.payload.message.includes("Undo")) {
                reply.replyReact = reply?.replyReact?.filter(
                  (react) => !(react.userId === action.payload.userId)
                );
              } else {
                reply.replyReact = [
                  ...reply?.replyReact,
                  action.payload.replyReactCreated,
                ];
              }
            }
          }
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
