var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {

  res.status(200).json({success:true});
});
router.get('/authenticate', function(req, res, next) {
  
  res.status(200).json({success:"api/authenticate works"});
});

module.exports = router;
