import "./App.css";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import AdminHome from "./components/AdminHome";
import Employees from "./components/Employees";
import Reviews from "./components/Reviews";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import { UserProvider } from "./components/context/UserProvider";
import EmployeeView from "./components/EmployeeView";
import { EmployeeProvider } from "./components/context/EmployeeProvider";
import { LoggedUserProvider } from "./components/context/LoggedUserProvider";
import { ReviewProvider } from "./components/context/ReviewProvider";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <UserProvider>
          <EmployeeProvider>
            <ReviewProvider>
              <LoggedUserProvider>
                <Switch>
                  <Route path="/login" component={Login}></Route>
                  <Route path="/admin" component={AdminHome}></Route>
                  <Route path="/employees/:id?" component={Employees}></Route>
                  <Route path="/reviews/:id?" component={Reviews}></Route>
                  <Route
                    path="/employee-top/:id/:reviewId?"
                    component={EmployeeView}
                  ></Route>
                  <Route exact path="/">
                    <Redirect to={`/login`} />
                  </Route>
                </Switch>
              </LoggedUserProvider>
            </ReviewProvider>
          </EmployeeProvider>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
