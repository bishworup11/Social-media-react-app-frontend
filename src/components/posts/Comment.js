import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reactToComment } from "../../store/postSlice";
import ModalLikes from "./ModalLikes";
import Reply from "./Reply";
import ReplySection from "./ReplySection";
import getRelativeTime from "../getRelativeTime";

export default function Comment({ comment, currentUser, postId }) {
  const users = useSelector((state) => state.auth.users);
  const isLiked = comment?.reacts?.includes(currentUser.userId);
  const [isReplying, setIsReplying] = useState(false);
  const [showAllReplies, setShowAllReplies] = useState(false);
  const dispatch = useDispatch();
  const user = comment?.user;

  const timeString = getRelativeTime(comment.createdAt);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    if (comment?.reacts?.length > 0) setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  function handleCommentReact() {
    dispatch(
      reactToComment({
        commentId: comment.commentId,
        postId: postId,
        reactType: "like",
      })
    );
  }

  return (
    <div className="_comment_main">
      <div className="_comment_image">
        <a href={`/profile/${user?.userId}`} className="_comment_image_link">
          <img
            src={`/assets/images/img${user ? user.userId % 18 : 1}.png`}
            alt=""
            className="_comment_img1"
          />
        </a>
      </div>
      <div className="_comment_area">
        <div className="_comment_details">
          <div className="_comment_details_top" style={{ textAlign: "left" }}>
            <div className="_comment_name">
              <a href={`/profile/${user?.userId}`}>
                <h4 className="_comment_name_title">
                  {user?.firstName} {user?.lastName}
                </h4>
              </a>
            </div>
          </div>
          <div className="_comment_status">
            <p className="_comment_status_text" style={{ textAlign: "left" }}>
              <span>{comment?.text} </span>
            </p>
          </div>
          <div className="_total_reactions" onClick={() => openModal()}>
            <div className="_total_react">
              <span className="_reaction_like">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-thumbs-up"
                >
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                </svg>
              </span>
              {/* <span className="_reaction_heart">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-heart"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </span> */}
            </div>
            <span className="_total">{comment?.reacts?.length}</span>
          </div>
          <div className="_comment_reply">
            <div className="_comment_reply_num">
              <ul className="_comment_reply_list">
                <li onClick={() => handleCommentReact()}>
                  <span style={{ color: `${isLiked ? "blue" : "black"}` }}>
                    Like.
                  </span>
                </li>
                <li>
                  <span onClick={() => setIsReplying(!isReplying)}>Reply.</span>
                </li>
                <li>
                  <span>{timeString}</span>
                </li>
                <li>
                  <span className="_time_link">
                    {/* {time < 2 ? "min" : "mins"} */}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* this part for reply */}

        {comment?.replies?.length > 1 ? (
          <div
            className="_previous_comment"
            style={{ textAlign: "left" }}
            onClick={() => setShowAllReplies(!showAllReplies)}
          >
            <button type="button" className="_previous_comment_txt">
              {showAllReplies ? "Hide" : " View"} {comment?.replies?.length - 1}{" "}
              previous {comment?.replies?.length > 2 ? "replies" : "reply"}
              {showAllReplies ? " (show less) " : " (show more)"}
            </button>
          </div>
        ) : null}

        {comment?.replies?.length > 1 ? (
          showAllReplies ? (
            comment.replies.map((reply) => (
              <Reply
                key={reply.replyId}
                reply={reply}
                currentUser={currentUser}
                commentId={comment.commentId}
                postId={postId}
              />
            ))
          ) : (
            <Reply
              key={comment.replies[comment.replies.length - 1].replyId}
              reply={comment.replies[comment.replies.length - 1]}
              currentUser={currentUser}
              commentId={comment.commentId}
              postId={postId}
            />
          )
        ) : comment?.replies?.length === 1 ? (
          <Reply
            key={comment.replies[0].replyId}
            reply={comment.replies[0]}
            currentUser={currentUser}
            commentId={comment.commentId}
            postId={postId}
          />
        ) : null}

        {isReplying ? (
          <ReplySection
            currentUser={currentUser}
            postId={postId}
            comment={comment}
          />
        ) : null}
      </div>

      {isModalOpen && (
        <ModalLikes reacts={comment.reacts} closeModal={closeModal} />
      )}
    </div>
  );
}
