const express = require("express");
const app = express();
const db = require("./models");
const cors = require("cors");

app.use(express.json()); // parses body of response into json object
app.use(cors());

// routers
const employeeRouter = require("./routes/Employees");
const reviewRouter = require("./routes/Reviews");
const commentRouter = require("./routes/Comments");
app.use("/employees", employeeRouter);
app.use("/reviews", reviewRouter);
app.use("/employee-top", commentRouter);

// goes over every table in models folder, creates if necessary
db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server is running on port 3001");
  });
});
