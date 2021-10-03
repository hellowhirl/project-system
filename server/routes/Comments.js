const express = require("express");
const router = express.Router();
const { Reviews } = require("../models"); // grab an instance of Reviews model

router.get("/:id", async (req, res) => {
  const employeeId = req.params.id;
  let reviewsDue = await Reviews.findAll({
    where: {
      reviewerId: employeeId,
      completed: "false",
    },
  });
  res.json(reviewsDue);
});

router.put("/:id/:reviewId", (req, res) => {
  const reviewId = req.params.reviewId;
  Reviews.update(
    {
      comment_body: req.body.comment_body,
      completed: "true",
    },
    {
      where: {
        id: reviewId,
      },
    }
  ).then(() => res.send("success"));
});

module.exports = router;
