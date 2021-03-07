const express = require('express');
const router = express.Router();

const data = require('../middleware/requestErrorHandler');
const recordController = require('../controller/recordController');

router.post("/records", data.isRequestParamsValid, recordController.getRecordsResponse);

module.exports = router;