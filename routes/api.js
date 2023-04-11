const express = require('express')

const router = express.Router()

const StateClicks = require('../models/StateClicks')

router.get("/", async (req, res) => {  
    const data = await StateClicks.find({  })
  
    res.json(data);
  });


router.get('/save', async(req, res) => {
    const data = {
        state: 'New Mexico',
        clicks: 2
    }

    const newStateClicks = new StateClicks(data)

    const response = await newStateClicks.save()

    console.log(response)

    res.json(response)
})

router.post('/save', (req, res) => {
    console.log(req.body, '-------------')
    res.json({
        msg: 'Data has been recieved'
    })
})

module.exports = router;