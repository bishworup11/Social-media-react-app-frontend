import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likeReply } from "../../store/postSlice";
import ModalLikes from "./ModalLikes";

export default function Reply({ reply, currentUser, commentId, postId }) {
  const users = useSelector((state) => state.auth.users);
  const replyUser = reply.user;
  const dispatch = useDispatch();
  const isLiked = reply.replyReact.includes(currentUser.userId);
  let time = Math.round((Date.now() - reply.replyId) / (1000 * 60));
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    if (reply.likes.length > 0) setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  function handleReplyLike() {
    // dispatch(
    //   likeReply({
    //     commentId,
    //     postId,
    //     userId: currentUser.userId,
    //     replyId: reply.replyId,
    //   })
    // );
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "row", marginBottom: ".5rem" }}
    >
      <div className="_comment_image" style={{ marginRight: ".5rem" }}>
        <a href="/" className="_comment_image_link">
          <img
            // src={replyUser?.profilePicture}
            src={`assets/images/img${
              replyUser ? replyUser.userId % 18 : 1
            }.png`}
            alt="UserPhoto"
            className="_comment_img1"
          />
        </a>
      </div>
      <div className="_feed_inner_comment_box" style={{ width: "80%" }}>
        <div className="_comment_area" style={{ width: "100%" }}>
          <div className="_comment_details" style={{ marginLeft: "-0.5rem" }}>
            <div className="_comment_details_top" style={{ textAlign: "left" }}>
              <div className="_comment_name">
                <a href="/">
                  <h4 className="_comment_name_title">
                    {replyUser?.firstName} {replyUser?.lastName}
                  </h4>
                </a>
              </div>
            </div>
            <div className="_comment_status">
              <p className="_comment_status_text" style={{ textAlign: "left" }}>
                <span>{reply.text} </span>
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
              </div>
              <span className="_total">{reply.replyReact.length} </span>
            </div>
            <div className="_comment_reply">
              <div className="_comment_reply_num">
                <ul className="_comment_reply_list">
                  <li onClick={() => handleReplyLike()}>
                    {/* style={{ color: `${isLiked ? "blue" : "black"}` } */}
                    <span style={{ color: `${isLiked ? "blue" : "black"}` }}>
                      Like.
                    </span>
                  </li>
                  <li>
                    <span>Reply.</span>
                  </li>
                  <li>
                    <span className="_time_link">
                      {time}
                      {time > 1 ? "mins" : "min"}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <ModalLikes likes={reply.replyReact} closeModal={closeModal} />
      )}
    </div>
  );
}
