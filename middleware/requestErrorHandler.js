const moment = require('moment');

module.exports.isRequestParamsValid = function(req, res, next) {
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
      code: 1001,
      msg: 'Request parameters minCount, maxCount must be number.'
    });
    return ; 
  }

  if(!moment(startDate, "YYYY-MM-DD", true).isValid() || !moment(endDate, "YYYY-MM-DD", true).isValid()){
    res.status(500).json({
        code: 1002,
        msg: 'startDate and endDate parameters must be in format of YYYY-MM-DD.'
      });
      return ;
  }
  else next();
};