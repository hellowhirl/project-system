const express = require("express");
const router = express.Router();
const { Employees } = require("../models"); // grab an instance of Employees model

router.get("/", async (req, res) => {
  let listOfEmployees = await Employees.findAll();
  res.json(listOfEmployees);
});

router.post("/", async (req, res) => {
  const employee = req.body;
  const newEmployee = await Employees.create(employee); // inserts data into our database
  res.json(newEmployee);
});

router.put("/:id", (req, res) => {
  Employees.update(
    {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      position: req.body.position,
    },
    {
      where: {
        id: req.body.id,
      },
    }
  ).then(() => res.send("success"));
});

router.delete("/:id", async (req, res) => {
  const postId = req.params.id;

  await Employees.destroy({
    where: {
      id: postId,
    },
  });

  res.json("DELETED SUCCESSFULLY!");
});

module.exports = router;
