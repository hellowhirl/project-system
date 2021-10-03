import React from "react";
import ListOfReviews from "./ListOfReviews";
import CreateReview from "./CreateReview";
import AddReviewModal from "./util/AddReviewModal";
import Navigation from "./Navigation";
import { useUser } from "./context/UserProvider";

function Reviews() {
  const { showModal } = useUser();

  return (
    <>
      <Navigation />
      <div className="container reviews">
        <h1 className="text-center">Performance Reviews</h1>
        <AddReviewModal>
          <CreateReview />
        </AddReviewModal>
        <ListOfReviews />
        {showModal ? <div className="modal-overlay"></div> : null}
      </div>
    </>
  );
}

export default Reviews;
