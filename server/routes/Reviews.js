const express = require("express");
const router = express.Router();
const { Reviews } = require("../models"); // grab an instance of Reviews model

router.get("/", async (req, res) => {
  let listOfReviews = await Reviews.findAll();
  res.json(listOfReviews);
});

router.post("/", async (req, res) => {
  const review = req.body;
  const newReview = await Reviews.create(review); // inserts data into our database
  res.json(newReview);
});

router.put("/:id", (req, res) => {
  Reviews.update(
    {
      reviewerId: req.body.reviewerId,
      revieweeId: req.body.revieweeId,
      comment_body: req.body.comment_body,
      completed: req.body.completed,
    },
    {
      where: {
        id: req.body.id,
      },
    }
  ).then(() => res.send("success"));
});

module.exports = router;
