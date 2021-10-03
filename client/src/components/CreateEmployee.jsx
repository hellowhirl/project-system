import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as yup from "yup";
import { useEmployees } from "./context/EmployeeProvider";
import { Button } from "react-bootstrap";
import { useUser } from "./context/UserProvider";

function CreateEmployee() {
  const { listOfEmployees, setListOfEmployees, setEmployeePopUpVisibility } =
    useEmployees();
  const { setShowModal } = useUser();

  const initialValues = {
    first_name: "",
    last_name: "",
    position: "",
  };

  const validationSchema = yup.object().shape({
    first_name: yup.string().required("You must input a First Name"),
    last_name: yup.string().required("You must input a Last Name"),
    position: yup.string().min(3).max(24).required("You must input a Position"),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/employees", data).then((response) => {
      setListOfEmployees([...listOfEmployees, response.data]);
      setEmployeePopUpVisibility(false);
      setShowModal(false);
    });
  };

  return (
    <div className="inner-modal-popup">
      <h3 className="text-center">New Employee Entry</h3>
      <div className="inputs-container text-center">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <label>First Name:</label>
            <ErrorMessage name="first_name" component="span" />
            <div>
              <Field
                id="inputCreateEmployee"
                name="first_name"
                placeholder="Ex: Taro"
              />
            </div>
            <label>Last Name:</label>
            <ErrorMessage name="last_name" component="span" />
            <div>
              <Field
                id="inputCreateEmployee"
                name="last_name"
                placeholder="Ex: Sato"
              />
            </div>
            <label>Position:</label>
            <ErrorMessage name="position" component="span" />
            <div>
              <Field
                id="inputCreateEmployee"
                name="position"
                placeholder="Ex: Worker"
              />
            </div>
            <div className="button-wrapper">
              <Button type="submit">Create</Button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default CreateEmployee;
