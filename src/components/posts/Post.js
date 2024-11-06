import React, { useState } from "react";
import TimelinePost from "./TimelinePost";
import ReactComment, {
  FeedInnerTimelineReaction,
  FeedInnerTimelineTotalReacts,
} from "./ReactComment";
import CommentSection from "./CommentSection";
import { useSelector } from "react-redux";

export default function Post({ ...props }) {
  const [isShowComment, setIsShowComment] = useState(true);
  const currentUser = useSelector((state) => state.auth.currentUser);
  function handleShowComment() {
    setIsShowComment(!isShowComment);
  }

  return (
    <div className="_feed_inner_timeline_post_area _b_radious6 _padd_b24 _padd_t24 _mar_b16 text-left">
      <TimelinePost post={props.post} userId={currentUser.userId} />
      <ReactComment>
        <FeedInnerTimelineTotalReacts post={props.post} />

        <FeedInnerTimelineReaction
          handleShowComment={handleShowComment}
          postId={props.post.postId}
          userId={currentUser.userId}
          postReacts={props.post.postReacts}
        />
      </ReactComment>
      {isShowComment ? (
        <CommentSection
          currentUser={currentUser}
          comments={props.post.comments}
          postId={props.post.postId}
        />
      ) : null}
    </div>
  );
}
