import React, { useEffect } from "react";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import StoryCard from "./StoryCard";
import FeedComponent from "./FeedComponent";
import Post from "./posts/Post";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPosts,
  createPost,
  updatePost,
  deletePost,
  reactToPost,
  createComment,
  createReply,
} from "../store/postSlice";

export default function Feed() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);
  //const posts = [];

  const currentUser = useSelector((state) => state.auth.currentUser);
  // let sortedPosts = [...posts].sort((a, b) => b.postId - a.postId);
  // sortedPosts = sortedPosts.filter(
  //   (post) => post.isShow === true || currentUser.userId === post.userId
  // );

  console.log(posts);

  useEffect(() => {
    dispatch(fetchPosts({ page: 1, limit: 2 }));
  }, [dispatch]);

  return (
    <div className="_container_fluid_custom">
      <div className="_layout_inner_wrap p-0 _layout_inner_wrap1">
        <div className="row ">
          <LeftSidebar />
          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
            <div className="_layout_middle_wrap _layout_middle_padding">
              <div className="_layout_middle_inner">
                <StoryCard />
                <FeedComponent />
                {posts.map((post) => {
                  // console.log(post);
                  return <Post key={post.postId} post={post} />;
                })}
              </div>
            </div>
          </div>
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}
