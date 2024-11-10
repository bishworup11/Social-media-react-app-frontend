import React from "react";
import { useSelector } from "react-redux";
export default function ModalLikes({ reacts, closeModal }) {
  const users = useSelector((state) => state.auth.users);
  //console.log(likes);
  const handleClickOutside = (e) => {
    if (e.target.className === "modal-overlay") {
      closeModal();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleClickOutside}>
      <div className="modal-content">
        <button className="close-button" onClick={closeModal}>
          X
        </button>
        <h3>Users who liked:</h3>

        <div className="_feed_right_inner_area_card  _padd_t24  _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
          {reacts?.map((react, index) => {
            // const tempUser = users.find((user) => user.userId === id);
            // console.log(users, id);
            return (
              <div
                className="_feed_right_inner_area_card_ppl_box"
                style={{ marginBottom: "1rem" }}
                key={react.userId}
              >
                <div className="_feed_right_inner_area_card_ppl_image">
                  <a href={`/profile/${react?.userId}`}>
                    <img
                      // src={react.}
                      src={`/assets/images/img${
                        react.userId ? react.userId % 18 : 1
                      }.png`}
                      alt=""
                      className="_box_ppl_img"
                    />
                  </a>
                </div>
                <div className="_feed_right_inner_area_card_ppl_txt">
                  <a href={`/profile/${react?.userId}`}>
                    <h4 className="_feed_right_inner_area_card_ppl_title _text1">
                      {react.user.firstName} {react.user.lastName}
                    </h4>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
