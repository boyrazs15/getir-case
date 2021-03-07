const express = require('express');
const router = express.Router();

const recordController = require('../controller/recordController');

router.post("/records", recordController.getRecordsResponse);

module.exports = router;