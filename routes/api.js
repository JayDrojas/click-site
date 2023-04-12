const express = require('express')

const router = express.Router()

const StateClicks = require('../models/StateClicks')

router.get("/", async (req, res) => {  
    const data = await StateClicks.find({  })
  
    return res.json(data);
  });


router.post('/save', async (req, res) => {
    console.log(req.body, '-------------')

    return res.json({
        msg: 'terminating early to avoid saving multipple times for testing'
    })
    const data = req.body;

    const newStateClicks = new StateClicks(data);

    const response = await newStateClicks.save();

    res.json({
        msg: 'Data has been recieved',
        response: response
    })
})

module.exports = router;