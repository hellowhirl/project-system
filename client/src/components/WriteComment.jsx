import React from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import * as yup from "yup";
import { useReviews } from "./context/ReviewProvider";
import { Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { useUser } from "./context/UserProvider";
import { useLoggedUser } from "./context/LoggedUserProvider";
import employeeLookup from "./util/employeeLookup";
import { useEmployees } from "./context/EmployeeProvider";

function WriteComment() {
  let history = useHistory();
  const { currentUser, setShowModal } = useUser();
  const { setEditReviewVisible } = useReviews();
  const { reviewsDue, setReviewsDue } = useLoggedUser();
  const { listOfEmployees } = useEmployees();
  let { reviewId } = useParams();

  const formValues = reviewsDue.filter((review) => {
    return review.id === parseInt(reviewId);
  });

  const validationSchema = yup.object().shape({
    reviewerId: yup.number().required("You must input a Reviewer"),
    revieweeId: yup.number().required("You must input a Reviewee"),
  });

  const onSubmit = (data) => {
    axios
      .put(`http://localhost:3001/reviews/${data.id}`, data)
      .then((response) => {
        const objIndex = reviewsDue.findIndex((obj) => obj.id === data.id);
        reviewsDue[objIndex] = data;

        setReviewsDue([...reviewsDue]);
        setEditReviewVisible(false);
        setShowModal(false);

        history.push(`/employee-top/${currentUser}`);
        if (data.completed === "true") history.go();
      });
  };

  return (
    <div className="inner-modal-popup">
      <h3 className="text-center">Write Review</h3>
      <div className="inputs-container text-center">
        <Formik
          initialValues={formValues[0]}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <label>
              Comment for{" "}
              {employeeLookup(
                formValues[0].revieweeId,
                "first_name",
                listOfEmployees
              )}{" "}
              {employeeLookup(
                formValues[0].revieweeId,
                "last_name",
                listOfEmployees
              )}
            </label>
            <div>
              <Field id="inputReviewComment" name="comment_body" />
            </div>
            <label>Submission status</label>
            <div>
              <Field id="inputReviewComment" as="select" name="completed">
                <option type="boolean" value="false">
                  Save as draft
                </option>
                <option type="boolean" value="true">
                  Ready to submit
                </option>
              </Field>
            </div>
            <Button type="submit">Submit</Button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default WriteComment;
