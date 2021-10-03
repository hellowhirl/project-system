import React from "react";
import { Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { useReviews } from "../context/ReviewProvider";
import { useUser } from "../context/UserProvider";

function SubmitCommentPopup(props) {
  let history = useHistory();
  let { reviewId } = useParams();

  const { editReviewVisible, setEditReviewVisible } = useReviews();
  const { currentUser, setShowModal } = useUser();

  const handleClickEdit = () => {
    setEditReviewVisible(true);
    setShowModal(true);
  };

  const togglePopEdit = () => {
    setEditReviewVisible(false);
    setShowModal(false);
  };

  return (
    <div className="">
      <div className="">
        <Button
          variant="success"
          onClick={() => {
            history.push(`/employee-top/${currentUser}/${props.id}`);
            handleClickEdit();
          }}
        >
          Write Review
        </Button>
        {editReviewVisible && parseInt(reviewId) === props.id ? (
          <div className="modal-popup">
            <div className="close-box">
              <div className="close-circle">
                <div
                  className="close"
                  onClick={() => {
                    togglePopEdit();
                    history.push(`/employee-top/${currentUser}`);
                  }}
                >
                  &times;{" "}
                </div>
              </div>
            </div>
            {props.children}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default SubmitCommentPopup;
