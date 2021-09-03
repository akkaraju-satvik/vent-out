const express = require('express');
const Vent = require('../models/vent')

const router = new express.Router();

router.post('/', async (req, res) => {
    const vent = new Vent({
        ...req.body
    })

    try {
        await vent.save()
        res.status(201).send(vent)
    } catch(err) {
        res.status(400).send(error)
    }
})

router.get('/', async (req, res) => {
    const data = await Vent.find({})
    res.status(200).render('index', data)
})

module.exports = router