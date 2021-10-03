import React, { useCallback, useEffect } from "react";
import { useUser } from "./context/UserProvider";
import Navigation from "./Navigation";
import employeeLookup from "./util/employeeLookup";
import { useEmployees } from "./context/EmployeeProvider";
import SubmitCommentPopup from "./util/SubmitCommentPopup";
import WriteComment from "./WriteComment";
import axios from "axios";
import { useLoggedUser } from "./context/LoggedUserProvider";

function EmployeeView() {
  const { currentUser, showModal } = useUser();
  const { listOfEmployees } = useEmployees();
  const { reviewsDue, setReviewsDue } = useLoggedUser();

  const fetchData = useCallback(() => {
    axios
      .get(`http://localhost:3001/employee-top/${currentUser}`)
      .then((response) => {
        setReviewsDue(response.data);
      });
  }, []); // eslint-disable-line

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line

  return (
    <>
      <Navigation />
      <div className="container employee-view">
        <h1 className="text-center">Employee Tasks</h1>
        {reviewsDue.length >= 1 ? (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Reviewee</th>
                <th scope="col">Comment</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {reviewsDue.map((review) => {
                return (
                  <tr key={"rev_" + review.id} className={"employeeList"}>
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
                      <SubmitCommentPopup id={review.id}>
                        <WriteComment />
                      </SubmitCommentPopup>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="text-center">No tasks due</div>
        )}
        {showModal ? <div className="modal-overlay"></div> : null}
      </div>
    </>
  );
}

export default EmployeeView;
