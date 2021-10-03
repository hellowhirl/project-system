import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import * as yup from "yup";
import { useEmployees } from "./context/EmployeeProvider";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useReviews } from "./context/ReviewProvider";
import { useUser } from "./context/UserProvider";

function EditReview() {
  let history = useHistory();
  const { listOfEmployees, setEditVisible } = useEmployees();
  const { listOfReviews, setListOfReviews } = useReviews();
  const [errorMessage, setErrorMessage] = useState(false);
  const { setShowModal } = useUser();
  let { id: currentId } = useParams();

  const formValues = listOfReviews.filter((review) => {
    return review.id === parseInt(currentId);
  });

  const validationSchema = yup.object().shape({
    reviewerId: yup.number().required("You must input a Reviewer"),
    revieweeId: yup.number().required("You must input a Reviewee"),
    comment_body: yup.string(),
    completed: yup.boolean(),
  });

  const onSubmit = (data) => {
    if (data.reviewerId === parseInt(data.revieweeId)) {
      setErrorMessage(true);
      throw new Error("Cannot be same id");
    }

    axios
      .put(`http://localhost:3001/reviews/${data.id}`, data)
      .then((response) => {
        const objIndex = listOfReviews.findIndex((obj) => obj.id === data.id);
        listOfReviews[objIndex] = data;

        setListOfReviews([...listOfReviews]);
        setEditVisible(false);
        setShowModal(false);

        history.push(`/reviews`);
      });
  };

  return (
    <div className="inner-modal-popup">
      <h3 className="text-center">Edit Review</h3>
      <div className="inputs-container text-center">
        <Formik
          initialValues={formValues[0]}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <label>Change Reviewer</label>
            {errorMessage ? <div>Cannot be the same two employees</div> : null}
            <div>
              <Field id="inputCreateReview" as="select" name="reviewerId">
                <option disabled value="">
                  (Select Reviewer)
                </option>
                {listOfEmployees.map((emp) => {
                  return (
                    <option key={"emp_" + emp.id} value={emp.id}>
                      {emp.first_name} {emp.last_name}
                    </option>
                  );
                })}
              </Field>
            </div>
            <label>Change Reviewee</label>
            <div>
              <Field id="inputCreateReview" as="select" name="revieweeId">
                <option disabled value="">
                  (Select Reviewee)
                </option>
                {listOfEmployees.map((emp) => {
                  return (
                    <option key={"emp_" + emp.id} value={emp.id}>
                      {emp.first_name} {emp.last_name}
                    </option>
                  );
                })}
              </Field>
            </div>
            <label>Edit Comment</label>
            <div>
              <Field id="inputCreateReview" name="comment_body" />
            </div>
            <label>Status</label>
            <div>
              <Field id="inputCreateReview" as="select" name="completed">
                <option type="boolean" value="false">
                  Incomplete
                </option>
                <option type="boolean" value="true">
                  Complete
                </option>
              </Field>
            </div>
            <Button type="submit">Create</Button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default EditReview;
