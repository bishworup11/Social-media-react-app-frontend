import React from "react";
import ProfileBanner from "./ProfileBanner";
import LeftSider from "./LeftSider";
import RightSider from "./RightSider";
import { useDispatch, useSelector } from "react-redux";
import Post from "../posts/Post";
import FeedComponent from "../FeedComponent";

export default function Profiles() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);
  const currentUser = useSelector((state) => state.auth.currentUser);
  let sortedPosts = [...posts].sort((a, b) => b.postId - a.postId);
  sortedPosts = sortedPosts.filter(
    (post) => currentUser.userId === post.userId
  );

  return (
    <div class="_profile_wrapper" style={{height: "auto"}}>
      <div class="_profile_wrap">
        <div class="container">
          <ProfileBanner currentUser={currentUser} />
          <div class="_layout_inner_wrap_area">
            <div class="row">
              <LeftSider />
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                <div className="_layout_middle_wrap _layout_middle_padding">
                  <div className="_layout_middle_inner">
                    {/* <StoryCard /> */}
                    <FeedComponent />
                    {sortedPosts.map((post) => {
                      return <Post key={post.postId} post={post} />;
                    })}
                  </div>
                </div>
              </div>
              <RightSider />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}