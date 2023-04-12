const express = require("express");

const router = express.Router();

const StateClicks = require("../models/StateClicks");

router.get("/", async (req, res) => {
  const data = await StateClicks.find({});

  return res.json(data);
});

router.post("/save", async (req, res) => {
  const data = req.body;
  const filter = { state: data.state };

  const doesStateExist = await StateClicks.findOne(filter);

  if (doesStateExist) {
    const update = { clicks: doesStateExist.clicks + 1 };
    const opts = { new: true };
    const updated = await StateClicks.findOneAndUpdate(filter, update, opts);

    return res.json(updated);
  }

  const newStateClicks = new StateClicks(data);

  const response = await newStateClicks.save();

  return res.json(response);
});

module.exports = router;
