import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import * as yup from "yup";
import { useReviews } from "./context/ReviewProvider";
import { useEmployees } from "./context/EmployeeProvider";
import { Button } from "react-bootstrap";
import { useUser } from "./context/UserProvider";

function CreateReview() {
  const { listOfReviews, setListOfReviews, setCreateVisible } = useReviews();
  const { listOfEmployees } = useEmployees();
  const [errorMessage, setErrorMessage] = useState(false);
  const { setShowModal } = useUser();

  const initialValues = {
    reviewerId: "",
    revieweeId: "",
    comment_body: "",
    completed: "false",
  };

  const validationSchema = yup.object().shape({
    reviewerId: yup.number().required("You must input a Reviewer"),
    revieweeId: yup.number().required("You must input a Reviewee"),
  });

  const onSubmit = (data) => {
    if (data.reviewerId === data.revieweeId) {
      setErrorMessage(true);
      throw new Error("Cannot be same id");
    }

    axios.post("http://localhost:3001/reviews", data).then((response) => {
      setListOfReviews([...listOfReviews, response.data]);
      setCreateVisible(false);
      setShowModal(false);
    });
  };

  return (
    <div className="inner-modal-popup">
      <h3 className="text-center">New Review</h3>
      <div className="inputs-container text-center">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <label>Reviewer</label>
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
            <label>Reviewee</label>
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
            <Button type="submit">Create</Button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default CreateReview;
