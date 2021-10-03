import React from "react";
import { Button } from "react-bootstrap";
import { useReviews } from "../context/ReviewProvider";
import { useUser } from "../context/UserProvider";

function AddReviewModal(props) {
  const { createVisible, setCreateVisible } = useReviews();
  const { setShowModal } = useUser();

  const handleClick = () => {
    setCreateVisible(true);
    setShowModal(true);
  };

  const togglePop = () => {
    setCreateVisible(false);
    setShowModal(false);
  };

  return (
    <div className="">
      <div className="">
        <div className="text-center pb-4">
          <Button onClick={handleClick}>Create New Review</Button>
        </div>
        {createVisible ? (
          <div className="modal-popup">
            <div className="close-box">
              <div className="close-circle">
                <div
                  className="close"
                  onClick={() => {
                    togglePop();
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

export default AddReviewModal;
