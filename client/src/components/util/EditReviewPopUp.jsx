import React from "react";
import { Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { useReviews } from "../context/ReviewProvider";
import { useUser } from "../context/UserProvider";

function EditReviewPopUp(props) {
  let history = useHistory();
  let { id: currentId } = useParams();

  const { editReviewVisible, setEditReviewVisible } = useReviews();
  const { setShowModal } = useUser();

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
          variant="secondary"
          onClick={() => {
            history.push(`/reviews/${props.id}`);
            handleClickEdit();
          }}
        >
          Edit
        </Button>
        {editReviewVisible && parseInt(currentId) === props.id ? (
          <div className="modal-popup">
            <div className="close-box">
              <div className="close-circle">
                <div
                  className="close"
                  onClick={() => {
                    togglePopEdit();
                    history.push(`/reviews`);
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

export default EditReviewPopUp;
