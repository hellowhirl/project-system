import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useEmployees } from "./context/EmployeeProvider";
import employeeLookup from "./util/employeeLookup";
import loginBackground from "../images/loginScreen.jpeg";
import { useUser } from "./context/UserProvider";

function Login() {
  const { listOfEmployees } = useEmployees();
  const history = useHistory();
  const { setCurrentUser } = useUser();

  const initialValues = {
    userId: "",
    fakePassword: "",
  };

  const validationSchema = yup.object().shape({
    userId: yup.string().required("You must select a User"),
    fakePassword: yup.string().required("You must input a password"),
  });

  const onSubmit = (data) => {
    localStorage.setItem("currentUser", data.userId);
    setCurrentUser(data.userId);

    if (localStorage.getItem("currentUser") === "admin") {
      history.push(`admin`);
    } else {
      localStorage.setItem(
        "userFirstName",
        employeeLookup(data.userId, "first_name", listOfEmployees)
      );
      history.push(`employee-top/${data.userId}`);
    }
  };

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <div className="login-page">
      <div
        className="login-background-container"
        style={{
          backgroundImage: `url(${loginBackground})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          width: "50%",
          height: "100vh",
        }}
      ></div>
      <div className="login-form-background">
        <div className="login-form-container">
          <h5 className="text-center">Employee Review System</h5>
          <div className="form-inner-container">
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              <Form>
                <label>User</label>
                <div>
                  <Field id="inputUserName" as="select" name="userId">
                    <option disabled value="">
                      (Select Employee)
                    </option>
                    <option value="admin">Admin</option>
                    {listOfEmployees.map((emp) => {
                      return (
                        <option key={"emp_" + emp.id} value={emp.id}>
                          {emp.first_name} {emp.last_name}
                        </option>
                      );
                    })}
                  </Field>
                </div>
                <div className="error-message">
                  <ErrorMessage name="userId" component="div" />
                </div>
                <label>Password</label>
                <div>
                  <Field
                    id="inputUserPassword"
                    name="fakePassword"
                    type="password"
                  />
                </div>
                <div className="error-message">
                  <ErrorMessage name="fakePassword" component="div" />
                </div>
                <div className="text-center">
                  <Button type="submit">Login</Button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
