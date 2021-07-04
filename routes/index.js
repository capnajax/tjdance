import express from 'express';
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

});

router.get('/exit', function(req, res, next) {
  res.sendStatus(204);
  process.exit(0);
});

export default router;
