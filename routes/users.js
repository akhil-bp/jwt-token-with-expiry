var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

const TW_JWTSECRET = "TW_JWTSECRET";
/* GET users listing. */
router.post('/', async function(req, res, next) {
  var user ={
    role:req.body.role,
    firstName:req.body.firstName,
    lastName:req.body.lastName
  }
  // let expireTime = Math.floor(Date.now() / 1000) + (60 * 60 * 24); //1day
  let expireTime = Math.floor(Date.now() / 1000) + (60 * 60)  //1hr

  let token = await generateToken(user,expireTime)
    res.status(200).json({token:token})
    function generateToken(user,expireTime) {
    return new Promise((resolve, reject) => {
      let payload = {  
        aud:req.body.role,
        name: (req.body.firstName + ' ' + req.body.lastName), 
        role: req.body.role,
      };
      if(expireTime) { payload.exp = expireTime };
  
      jwt.sign(payload, TW_JWTSECRET, function (err, token) {
        if(err) reject(err);
        // console.log(expireTime)

        let response = { token: token};
        // if(expireTime) { response.expireTime = expireTime; }
        if(expireTime) { response.expireTime = expireTime; }
        resolve(response);
      });
    });
  }
});

module.exports = router;
