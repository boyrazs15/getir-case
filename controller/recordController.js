const Record = require('../models/Record');
const moment = require('moment');

exports.getRecordsResponse = (req, res) => {
  var { startDate, endDate, minCount, maxCount } = req.body;

  if(startDate == null ||endDate == null || minCount == null || maxCount == null) {
    res.status(500).json({
        code: 1000,
        msg: 'Request must have parameters startDate, endDate, minCount, maxCount.'
      });
      return ;
  }

  if(typeof minCount != "number" || typeof maxCount != "number"){
    res.status(500).json({
      code: 1002,
      msg: 'Request parameters minCount, maxCount must be number.'
    });
    return ; 
  }

  if(!moment(startDate, "YYYY-MM-DD", true).isValid() || !moment(endDate, "YYYY-MM-DD", true).isValid()){
    res.status(500).json({
        code: 1003,
        msg: 'startDate and endDate parameters must be in format of YYYY-MM-DD.'
      });
      return ;
  }
  Record.aggregate([
    {
      $project: {
        "_id" : 0, 
        key : 1,
        createdAt: 1,
        totalCount: { 
            "$sum": "$counts" 
        } 
      }
    },
    {
      $match: {
        $and: [
            {
                totalCount: { 
                    $gt: minCount, 
                    $lt: maxCount 
                }
            },
            {
                createdAt: {
                    $gte: new Date(startDate), 
                    $lte: new Date(endDate)
                }
            }
        ]
        
      }
    }
  ])
    .exec()
    .then(data => {
      res.status(200).json({
        code: 0,
        msg: 'Success',
        records: data
      });
    })
    .catch(err => {
        console.log("Error");
    });
};
