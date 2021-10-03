import React from "react";
import { useReviews } from "./context/ReviewProvider";
import { useEmployees } from "./context/EmployeeProvider";
import employeeLookup from "./util/employeeLookup";
import EditReviewPopUp from "./util/EditReviewPopUp";
import EditReview from "./EditReview";

function ListOfReviews() {
  const { listOfReviews } = useReviews();
  const { listOfEmployees } = useEmployees();

  if (!(listOfReviews && listOfEmployees)) return <div>Loading...</div>;

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Reviewer</th>
            <th scope="col">Reviewee</th>
            <th scope="col">Status</th>
            <th scope="col">Comment</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {listOfReviews.map((review) => {
            return (
              <tr key={"rev_" + review.id} className={"employeeList"}>
                <td>
                  {employeeLookup(
                    review.reviewerId,
                    "first_name",
                    listOfEmployees
                  )}{" "}
                  {employeeLookup(
                    review.reviewerId,
                    "last_name",
                    listOfEmployees
                  )}{" "}
                </td>
                <td>
                  {employeeLookup(
                    review.revieweeId,
                    "first_name",
                    listOfEmployees
                  )}{" "}
                  {employeeLookup(
                    review.revieweeId,
                    "last_name",
                    listOfEmployees
                  )}
                </td>
                <td className="status">
                  {review.completed === "true" ? (
                    <div className="completed"></div>
                  ) : (
                    <div className="incomplete"></div>
                  )}
                </td>
                <td>
                  {review.comment_body ? (
                    review.comment_body
                  ) : (
                    <span className="text-muted">
                      <em>awaiting feedback...</em>
                    </span>
                  )}
                </td>
                <td>
                  <EditReviewPopUp id={review.id}>
                    <EditReview />
                  </EditReviewPopUp>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ListOfReviews;
