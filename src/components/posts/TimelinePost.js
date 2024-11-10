import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updatePostVisibility,
  deletePost,
  updatePost,
} from "../../store/postSlice";
import { IoEarthSharp } from "react-icons/io5";
import { MdLockPerson } from "react-icons/md";
import getRelativeTime from "../getRelativeTime";
const TimelinePost = ({ post, userId }) => {
  const [show, setShow] = React.useState(false);
  const timestring = getRelativeTime(post.createdAt);
  //  const users = useSelector((state) => state.auth.users);
  //const postUser = users.find((user) => user.userId === post.userId);
  const postUser = null;
  const [isEdit, setIsEdit] = React.useState(false);
  const [editText, setEditText] = React.useState("");
  const dispatch = useDispatch();

  // console.log(post, userId);
  function handleShow() {
    setShow(!show);
  }
  function handleEditShow() {
    setIsEdit(!isEdit);
    setEditText(post.text);
    handleShow();
  }

  function handleEdit() {
    dispatch(updatePost({ postId: post.postId, text: editText }));
    setIsEdit(false);
  }
  const handleSubmitEdit = (e) => {
    if (e.key === "Enter" && !e.shiftKey && editText.length > 0) {
      e.preventDefault();
      handleEdit();
    }
  };

  return (
    <div className="_feed_inner_timeline_content _padd_r24 _padd_l24 ">
      <div className="_feed_inner_timeline_post_top">
        <div className="_feed_inner_timeline_post_box">
          <div className="_feed_inner_timeline_post_box_image">
            <img
              src={`/assets/images/img${
                post.user ? post.user.userId % 18 : 1
              }.png`}
              alt=""
              className="_post_img"
            />
          </div>
          <div
            className="_feed_inner_timeline_post_box_txt"
            style={{ textAlign: "left" }}
          >
            <h4 className="_feed_inner_timeline_post_box_title">
              {post?.user?.firstName} {post?.user?.lastName}
            </h4>
            <p className="_feed_inner_timeline_post_box_para">
              {timestring}
              <span>
                {post.visibility ? (
                  <>
                    {" "}
                    Public <IoEarthSharp />
                  </>
                ) : (
                  <>
                    {" "}
                    Private <MdLockPerson />
                  </>
                )}
              </span>
            </p>
          </div>
        </div>
        <div className="_feed_inner_timeline_post_box_dropdown">
          <div className="_feed_timeline_post_dropdown">
            <button
              href="/"
              id="_timeline_show_drop_btn"
              className="_feed_timeline_post_dropdown_link"
              onClick={() => setShow(!show)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="4"
                height="17"
                fill="none"
                viewBox="0 0 4 17"
              >
                <circle cx="2" cy="2" r="2" fill="#C4C4C4" />
                <circle cx="2" cy="8" r="2" fill="#C4C4C4" />
                <circle cx="2" cy="15" r="2" fill="#C4C4C4" />
              </svg>
            </button>
          </div>
          {/*  there dropdown conditional rendaring */}
          {show ? (
            <Dropdown
              post={post}
              userId={userId}
              handleShow={handleShow}
              handleEditShow={handleEditShow}
            />
          ) : null}
        </div>
      </div>
      {isEdit ? (
        <div style={{ marginBottom: "1rem" }}>
          <textarea
            className="form-control _comment_textarea"
            style={{
              textAlign: "left",
              marginLeft: "-0.2rem",
              width: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.05)",
              marginBottom: "0.5rem",
            }}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleSubmitEdit}
          />
          <div className="_feed_inner_text_area_bottom">
            <div className="_feed_inner_text_area_item">
              <div className="_feed_inner_text_area_bottom_photo _feed_common">
                <button
                  type="button"
                  className="_feed_inner_text_area_bottom_photo_link"
                >
                  <span className="_feed_inner_text_area_bottom_photo_iamge _mar_img">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill="#666"
                        d="M13.916 0c3.109 0 5.18 2.429 5.18 5.914v8.17c0 3.486-2.072 5.916-5.18 5.916H5.999C2.89 20 .827 17.572.827 14.085v-8.17C.827 2.43 2.897 0 6 0h7.917zm0 1.504H5.999c-2.321 0-3.799 1.735-3.799 4.41v8.17c0 2.68 1.472 4.412 3.799 4.412h7.917c2.328 0 3.807-1.734 3.807-4.411v-8.17c0-2.678-1.478-4.411-3.807-4.411zm.65 8.68l.12.125 1.9 2.147a.803.803 0 01-.016 1.063.642.642 0 01-.894.058l-.076-.074-1.9-2.148a.806.806 0 00-1.205-.028l-.074.087-2.04 2.717c-.722.963-2.02 1.066-2.86.26l-.111-.116-.814-.91a.562.562 0 00-.793-.07l-.075.073-1.4 1.617a.645.645 0 01-.97.029.805.805 0 01-.09-.977l.064-.086 1.4-1.617c.736-.852 1.95-.897 2.734-.137l.114.12.81.905a.587.587 0 00.861.033l.07-.078 2.04-2.718c.81-1.08 2.27-1.19 3.205-.275zM6.831 4.64c1.265 0 2.292 1.125 2.292 2.51 0 1.386-1.027 2.511-2.292 2.511S4.54 8.537 4.54 7.152c0-1.386 1.026-2.51 2.291-2.51zm0 1.504c-.507 0-.918.451-.918 1.007 0 .555.411 1.006.918 1.006.507 0 .919-.451.919-1.006 0-.556-.412-1.007-.919-1.007z"
                      />
                    </svg>
                  </span>
                  Photo
                </button>
              </div>
              <div className="_feed_inner_text_area_bottom_video _feed_common">
                <button
                  type="button"
                  className="_feed_inner_text_area_bottom_photo_link"
                >
                  <span className="_feed_inner_text_area_bottom_photo_iamge _mar_img">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="24"
                      fill="none"
                      viewBox="0 0 22 24"
                    >
                      <path
                        fill="#666"
                        d="M11.485 4.5c2.213 0 3.753 1.534 3.917 3.784l2.418-1.082c1.047-.468 2.188.327 2.271 1.533l.005.141v6.64c0 1.237-1.103 2.093-2.155 1.72l-.121-.047-2.418-1.083c-.164 2.25-1.708 3.785-3.917 3.785H5.76c-2.343 0-3.932-1.72-3.932-4.188V8.688c0-2.47 1.589-4.188 3.932-4.188h5.726zm0 1.5H5.76C4.169 6 3.197 7.05 3.197 8.688v7.015c0 1.636.972 2.688 2.562 2.688h5.726c1.586 0 2.562-1.054 2.562-2.688v-.686-6.329c0-1.636-.973-2.688-2.562-2.688zM18.4 8.57l-.062.02-2.921 1.306v4.596l2.921 1.307c.165.073.343-.036.38-.215l.008-.07V8.876c0-.195-.16-.334-.326-.305z"
                      />
                    </svg>
                  </span>
                  Video
                </button>
              </div>
              <div className="_feed_inner_text_area_bottom_event _feed_common">
                <button
                  type="button"
                  className="_feed_inner_text_area_bottom_photo_link"
                >
                  <span className="_feed_inner_text_area_bottom_photo_iamge _mar_img">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="24"
                      fill="none"
                      viewBox="0 0 22 24"
                    >
                      <path
                        fill="#666"
                        d="M14.371 2c.32 0 .585.262.627.603l.005.095v.788c2.598.195 4.188 2.033 4.18 5v8.488c0 3.145-1.786 5.026-4.656 5.026H7.395C4.53 22 2.74 20.087 2.74 16.904V8.486c0-2.966 1.596-4.804 4.187-5v-.788c0-.386.283-.698.633-.698.32 0 .584.262.626.603l.006.095v.771h5.546v-.771c0-.386.284-.698.633-.698zm3.546 8.283H4.004l.001 6.621c0 2.325 1.137 3.616 3.183 3.697l.207.004h7.132c2.184 0 3.39-1.271 3.39-3.63v-6.692zm-3.202 5.853c.349 0 .632.312.632.698 0 .353-.238.645-.546.691l-.086.006c-.357 0-.64-.312-.64-.697 0-.354.237-.645.546-.692l.094-.006zm-3.742 0c.35 0 .632.312.632.698 0 .353-.238.645-.546.691l-.086.006c-.357 0-.64-.312-.64-.697 0-.354.238-.645.546-.692l.094-.006zm-3.75 0c.35 0 .633.312.633.698 0 .353-.238.645-.547.691l-.093.006c-.35 0-.633-.312-.633-.697 0-.354.238-.645.547-.692l.094-.006zm7.492-3.615c.349 0 .632.312.632.697 0 .354-.238.645-.546.692l-.086.006c-.357 0-.64-.312-.64-.698 0-.353.237-.645.546-.691l.094-.006zm-3.742 0c.35 0 .632.312.632.697 0 .354-.238.645-.546.692l-.086.006c-.357 0-.64-.312-.64-.698 0-.353.238-.645.546-.691l.094-.006zm-3.75 0c.35 0 .633.312.633.698 0 .354-.238.645-.547.692l-.093.006c-.35 0-.633-.312-.633-.698 0-.353.238-.645.547-.692l.094-.006zm6.515-7.657H8.192v.895c0 .385-.283.698-.633.698-.32 0-.584-.263-.626-.603l-.006-.095v-.874c-1.886.173-2.922 1.422-2.922 3.6v.402h13.912v-.403c.007-2.181-1.024-3.427-2.914-3.599v.874c0 .385-.283.698-.632.698-.32 0-.585-.263-.627-.603l-.005-.095v-.895z"
                      />
                    </svg>
                  </span>
                  Event
                </button>
              </div>
              <div className="_feed_inner_text_area_bottom_article _feed_common">
                <button
                  type="button"
                  className="_feed_inner_text_area_bottom_photo_link"
                >
                  <span className="_feed_inner_text_area_bottom_photo_iamge _mar_img">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="20"
                      fill="none"
                      viewBox="0 0 18 20"
                    >
                      <path
                        fill="#666"
                        d="M12.49 0c2.92 0 4.665 1.92 4.693 5.132v9.659c0 3.257-1.75 5.209-4.693 5.209H5.434c-.377 0-.734-.032-1.07-.095l-.2-.041C2 19.371.74 17.555.74 14.791V5.209c0-.334.019-.654.055-.96C1.114 1.564 2.799 0 5.434 0h7.056zm-.008 1.457H5.434c-2.244 0-3.381 1.263-3.381 3.752v9.582c0 2.489 1.137 3.752 3.38 3.752h7.049c2.242 0 3.372-1.263 3.372-3.752V5.209c0-2.489-1.13-3.752-3.372-3.752zm-.239 12.053c.36 0 .652.324.652.724 0 .4-.292.724-.652.724H5.656c-.36 0-.652-.324-.652-.724 0-.4.293-.724.652-.724h6.587zm0-4.239a.643.643 0 01.632.339.806.806 0 010 .78.643.643 0 01-.632.339H5.656c-.334-.042-.587-.355-.587-.729s.253-.688.587-.729h6.587zM8.17 5.042c.335.041.588.355.588.729 0 .373-.253.687-.588.728H5.665c-.336-.041-.589-.355-.589-.728 0-.374.253-.688.589-.729H8.17z"
                      />
                    </svg>
                  </span>
                  Article
                </button>
              </div>
            </div>
            <div className="_feed_inner_text_area_btn">
              <button
                type="button"
                className="_feed_inner_text_area_btn_link"
                onClick={() => handleEdit()}
              >
                <svg
                  className="_mar_img"
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="13"
                  fill="none"
                  viewBox="0 0 14 13"
                >
                  <path
                    fill="#fff"
                    fillRule="evenodd"
                    d="M6.37 7.879l2.438 3.955a.335.335 0 00.34.162c.068-.01.23-.05.289-.247l3.049-10.297a.348.348 0 00-.09-.35.341.341 0 00-.34-.088L1.75 4.03a.34.34 0 00-.247.289.343.343 0 00.16.347L5.666 7.17 9.2 3.597a.5.5 0 01.712.703L6.37 7.88zM9.097 13c-.464 0-.89-.236-1.14-.641L5.372 8.165l-4.237-2.65a1.336 1.336 0 01-.622-1.331c.074-.536.441-.96.957-1.112L11.774.054a1.347 1.347 0 011.67 1.682l-3.05 10.296A1.332 1.332 0 019.098 13z"
                    clipRule="evenodd"
                  />
                </svg>
                <span> Edit Post</span>
              </button>
            </div>
          </div>
          {/* For Desktop */}
          {/* For Mobile */}
          <div className="_feed_inner_text_area_bottom_mobile">
            <div className="_feed_inner_text_mobile">
              <div className="_feed_inner_text_area_item">
                <div className="_feed_inner_text_area_bottom_photo _feed_common">
                  <button
                    type="button"
                    className="_feed_inner_text_area_bottom_photo_link"
                  >
                    <span className="_feed_inner_text_area_bottom_photo_iamge _mar_img">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill="#666"
                          d="M13.916 0c3.109 0 5.18 2.429 5.18 5.914v8.17c0 3.486-2.072 5.916-5.18 5.916H5.999C2.89 20 .827 17.572.827 14.085v-8.17C.827 2.43 2.897 0 6 0h7.917zm0 1.504H5.999c-2.321 0-3.799 1.735-3.799 4.41v8.17c0 2.68 1.472 4.412 3.799 4.412h7.917c2.328 0 3.807-1.734 3.807-4.411v-8.17c0-2.678-1.478-4.411-3.807-4.411zm.65 8.68l.12.125 1.9 2.147a.803.803 0 01-.016 1.063.642.642 0 01-.894.058l-.076-.074-1.9-2.148a.806.806 0 00-1.205-.028l-.074.087-2.04 2.717c-.722.963-2.02 1.066-2.86.26l-.111-.116-.814-.91a.562.562 0 00-.793-.07l-.075.073-1.4 1.617a.645.645 0 01-.97.029.805.805 0 01-.09-.977l.064-.086 1.4-1.617c.736-.852 1.95-.897 2.734-.137l.114.12.81.905a.587.587 0 00.861.033l.07-.078 2.04-2.718c.81-1.08 2.27-1.19 3.205-.275zM6.831 4.64c1.265 0 2.292 1.125 2.292 2.51 0 1.386-1.027 2.511-2.292 2.511S4.54 8.537 4.54 7.152c0-1.386 1.026-2.51 2.291-2.51zm0 1.504c-.507 0-.918.451-.918 1.007 0 .555.411 1.006.918 1.006.507 0 .919-.451.919-1.006 0-.556-.412-1.007-.919-1.007z"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
                <div className="_feed_inner_text_area_bottom_video _feed_common">
                  <button
                    type="button"
                    className="_feed_inner_text_area_bottom_photo_link"
                  >
                    <span className="_feed_inner_text_area_bottom_photo_iamge _mar_img">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="24"
                        fill="none"
                        viewBox="0 0 22 24"
                      >
                        <path
                          fill="#666"
                          d="M11.485 4.5c2.213 0 3.753 1.534 3.917 3.784l2.418-1.082c1.047-.468 2.188.327 2.271 1.533l.005.141v6.64c0 1.237-1.103 2.093-2.155 1.72l-.121-.047-2.418-1.083c-.164 2.25-1.708 3.785-3.917 3.785H5.76c-2.343 0-3.932-1.72-3.932-4.188V8.688c0-2.47 1.589-4.188 3.932-4.188h5.726zm0 1.5H5.76C4.169 6 3.197 7.05 3.197 8.688v7.015c0 1.636.972 2.688 2.562 2.688h5.726c1.586 0 2.562-1.054 2.562-2.688v-.686-6.329c0-1.636-.973-2.688-2.562-2.688zM18.4 8.57l-.062.02-2.921 1.306v4.596l2.921 1.307c.165.073.343-.036.38-.215l.008-.07V8.876c0-.195-.16-.334-.326-.305z"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
                <div className="_feed_inner_text_area_bottom_event _feed_common">
                  <button
                    type="button"
                    className="_feed_inner_text_area_bottom_photo_link"
                  >
                    <span className="_feed_inner_text_area_bottom_photo_iamge _mar_img">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="24"
                        fill="none"
                        viewBox="0 0 22 24"
                      >
                        <path
                          fill="#666"
                          d="M14.371 2c.32 0 .585.262.627.603l.005.095v.788c2.598.195 4.188 2.033 4.18 5v8.488c0 3.145-1.786 5.026-4.656 5.026H7.395C4.53 22 2.74 20.087 2.74 16.904V8.486c0-2.966 1.596-4.804 4.187-5v-.788c0-.386.283-.698.633-.698.32 0 .584.262.626.603l.006.095v.771h5.546v-.771c0-.386.284-.698.633-.698zm3.546 8.283H4.004l.001 6.621c0 2.325 1.137 3.616 3.183 3.697l.207.004h7.132c2.184 0 3.39-1.271 3.39-3.63v-6.692zm-3.202 5.853c.349 0 .632.312.632.698 0 .353-.238.645-.546.691l-.086.006c-.357 0-.64-.312-.64-.697 0-.354.237-.645.546-.692l.094-.006zm-3.742 0c.35 0 .632.312.632.698 0 .353-.238.645-.546.691l-.086.006c-.357 0-.64-.312-.64-.697 0-.354.238-.645.546-.692l.094-.006zm-3.75 0c.35 0 .633.312.633.698 0 .353-.238.645-.547.691l-.093.006c-.35 0-.633-.312-.633-.697 0-.354.238-.645.547-.692l.094-.006zm7.492-3.615c.349 0 .632.312.632.697 0 .354-.238.645-.546.692l-.086.006c-.357 0-.64-.312-.64-.698 0-.353.237-.645.546-.691l.094-.006zm-3.742 0c.35 0 .632.312.632.697 0 .354-.238.645-.546.692l-.086.006c-.357 0-.64-.312-.64-.698 0-.353.238-.645.546-.691l.094-.006zm-3.75 0c.35 0 .633.312.633.698 0 .354-.238.645-.547.692l-.093.006c-.35 0-.633-.312-.633-.698 0-.353.238-.645.547-.692l.094-.006zm6.515-7.657H8.192v.895c0 .385-.283.698-.633.698-.32 0-.584-.263-.626-.603l-.006-.095v-.874c-1.886.173-2.922 1.422-2.922 3.6v.402h13.912v-.403c.007-2.181-1.024-3.427-2.914-3.599v.874c0 .385-.283.698-.632.698-.32 0-.585-.263-.627-.603l-.005-.095v-.895z"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
                <div className="_feed_inner_text_area_bottom_article _feed_common">
                  <button
                    type="button"
                    className="_feed_inner_text_area_bottom_photo_link"
                  >
                    <span className="_feed_inner_text_area_bottom_photo_iamge _mar_img">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="20"
                        fill="none"
                        viewBox="0 0 18 20"
                      >
                        <path
                          fill="#666"
                          d="M12.49 0c2.92 0 4.665 1.92 4.693 5.132v9.659c0 3.257-1.75 5.209-4.693 5.209H5.434c-.377 0-.734-.032-1.07-.095l-.2-.041C2 19.371.74 17.555.74 14.791V5.209c0-.334.019-.654.055-.96C1.114 1.564 2.799 0 5.434 0h7.056zm-.008 1.457H5.434c-2.244 0-3.381 1.263-3.381 3.752v9.582c0 2.489 1.137 3.752 3.38 3.752h7.049c2.242 0 3.372-1.263 3.372-3.752V5.209c0-2.489-1.13-3.752-3.372-3.752zm-.239 12.053c.36 0 .652.324.652.724 0 .4-.292.724-.652.724H5.656c-.36 0-.652-.324-.652-.724 0-.4.293-.724.652-.724h6.587zm0-4.239a.643.643 0 01.632.339.806.806 0 010 .78.643.643 0 01-.632.339H5.656c-.334-.042-.587-.355-.587-.729s.253-.688.587-.729h6.587zM8.17 5.042c.335.041.588.355.588.729 0 .373-.253.687-.588.728H5.665c-.336-.041-.589-.355-.589-.728 0-.374.253-.688.589-.729H8.17z"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
              <div className="_feed_inner_text_area_btn">
                <button
                  type="button"
                  className="_feed_inner_text_area_btn_link"
                  onClick={() => handleEdit()}
                >
                  <svg
                    className="_mar_img"
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="13"
                    fill="none"
                    viewBox="0 0 14 13"
                  >
                    <path
                      fill="#fff"
                      fillRule="evenodd"
                      d="M6.37 7.879l2.438 3.955a.335.335 0 00.34.162c.068-.01.23-.05.289-.247l3.049-10.297a.348.348 0 00-.09-.35.341.341 0 00-.34-.088L1.75 4.03a.34.34 0 00-.247.289.343.343 0 00.16.347L5.666 7.17 9.2 3.597a.5.5 0 01.712.703L6.37 7.88zM9.097 13c-.464 0-.89-.236-1.14-.641L5.372 8.165l-4.237-2.65a1.336 1.336 0 01-.622-1.331c.074-.536.441-.96.957-1.112L11.774.054a1.347 1.347 0 011.67 1.682l-3.05 10.296A1.332 1.332 0 019.098 13z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span> Edit Post</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h4
          className="_feed_inner_timeline_post_title"
          style={{ textAlign: "left" }}
        >
          {post.text}
        </h4>
      )}

      <div className="_feed_inner_timeline_image">
        <img
          src="/assets/images/timeline_img.png"
          alt=""
          className="_time_img"
        />
      </div>
    </div>
  );
};
export default TimelinePost;

function Dropdown({ post, userId, handleShow, handleEditShow }) {
  //console.log(post.userId,userId);
  const dispatch = useDispatch();
  function handleHidePost() {
    dispatch(updatePostVisibility({ postId: post.postId }));
    handleShow();
  }
  function handleDeletePost() {
    if (window.confirm("Are you sure you want to delete this post?")) {
      dispatch(deletePost({ postId: post.postId }));
      handleShow();
    }
  }

  return (
    <div id="_timeline_drop" className="_feed_timeline_dropdown show">
      <ul
        className="_feed_timeline_dropdown_list"
        style={{ textAlign: "left" }}
      >
        <li className="_feed_timeline_dropdown_item">
          <a href="/" className="_feed_timeline_dropdown_link">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="#1890FF"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.2"
                  d="M14.25 15.75L9 12l-5.25 3.75v-12a1.5 1.5 0 011.5-1.5h7.5a1.5 1.5 0 011.5 1.5v12z"
                />
              </svg>
            </span>
            Save Post
          </a>
        </li>
        <li className="_feed_timeline_dropdown_item">
          <a href="#0" className="_feed_timeline_dropdown_link">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="22"
                fill="none"
                viewBox="0 0 20 22"
              >
                <path
                  fill="#377DFF"
                  fillRule="evenodd"
                  d="M7.547 19.55c.533.59 1.218.915 1.93.915.714 0 1.403-.324 1.938-.916a.777.777 0 011.09-.056c.318.284.344.77.058 1.084-.832.917-1.927 1.423-3.086 1.423h-.002c-1.155-.001-2.248-.506-3.077-1.424a.762.762 0 01.057-1.083.774.774 0 011.092.057zM9.527 0c4.58 0 7.657 3.543 7.657 6.85 0 1.702.436 2.424.899 3.19.457.754.976 1.612.976 3.233-.36 4.14-4.713 4.478-9.531 4.478-4.818 0-9.172-.337-9.528-4.413-.003-1.686.515-2.544.973-3.299l.161-.27c.398-.679.737-1.417.737-2.918C1.871 3.543 4.948 0 9.528 0zm0 1.535c-3.6 0-6.11 2.802-6.11 5.316 0 2.127-.595 3.11-1.12 3.978-.422.697-.755 1.247-.755 2.444.173 1.93 1.455 2.944 7.986 2.944 6.494 0 7.817-1.06 7.988-3.01-.003-1.13-.336-1.681-.757-2.378-.526-.868-1.12-1.851-1.12-3.978 0-2.514-2.51-5.316-6.111-5.316z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            Turn On Notification
          </a>
        </li>
        {post.userId === userId ? (
          <>
            <li
              className="_feed_timeline_dropdown_item"
              onClick={() => handleHidePost()}
            >
              <a href="#0" className="_feed_timeline_dropdown_link">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="#1890FF"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.2"
                      d="M14.25 2.25H3.75a1.5 1.5 0 00-1.5 1.5v10.5a1.5 1.5 0 001.5 1.5h10.5a1.5 1.5 0 001.5-1.5V3.75a1.5 1.5 0 00-1.5-1.5zM6.75 6.75l4.5 4.5M11.25 6.75l-4.5 4.5"
                    />
                  </svg>
                </span>
                {post?.visibility ? "Hide Post" : "Unhide Post"}
              </a>
            </li>
            <li
              className="_feed_timeline_dropdown_item"
              onClick={() => handleEditShow()}
            >
              <a href="#0" className="_feed_timeline_dropdown_link">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="#1890FF"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.2"
                      d="M8.25 3H3a1.5 1.5 0 00-1.5 1.5V15A1.5 1.5 0 003 16.5h10.5A1.5 1.5 0 0015 15V9.75"
                    />
                    <path
                      stroke="#1890FF"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.2"
                      d="M13.875 1.875a1.591 1.591 0 112.25 2.25L9 11.25 6 12l.75-3 7.125-7.125z"
                    />
                  </svg>
                </span>
                Edit Post
              </a>
            </li>
            <li
              className="_feed_timeline_dropdown_item"
              onClick={() => handleDeletePost()}
            >
              <a href="#0" className="_feed_timeline_dropdown_link">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="#1890FF"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.2"
                      d="M2.25 4.5h13.5M6 4.5V3a1.5 1.5 0 011.5-1.5h3A1.5 1.5 0 0112 3v1.5m2.25 0V15a1.5 1.5 0 01-1.5 1.5h-7.5a1.5 1.5 0 01-1.5-1.5V4.5h10.5zM7.5 8.25v4.5M10.5 8.25v4.5"
                    />
                  </svg>
                </span>
                Delete Post
              </a>
            </li>
          </>
        ) : null}
      </ul>
    </div>
  );
}
