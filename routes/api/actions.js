
import express from 'express';
import movements from '../../src/movement.js';
import _ from 'lodash';

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.put('/', function(req, res, next) {
  console.log('actions put');
  let actions = req.body;
  console.log('actions body', actions);
  let ledAction = null;
  let errors = [];


  for (let actionType in actions) {

    switch (actionType) {

    case 'led':

      if (ledAction) {
        errors.push(`More than one LED action.`);
        break;
      }

      if (_.isObject(actions.led)) {
        ledAction = {};
        ledAction.colorSpace = actions.led.colorSpace || 'rgb';
        switch (ledAction.colorSpace) {
        case 'rgb': 
          _.extend(ledAction, _.pick(actions.led, ['r', 'g', 'b']));
          break;
        
        default:
          errors.push(`Colorspace ${ledAction.colorSpace} not supported`);
          ledAction = null;
          break;
        }
      } else {
        // TODO can add #RRGGBB colors or other ways of defining colours in
        // strings
        errors.push(`Cannot process LED action ${actions.led}`);
      }
      break;

    default:
      errors.push(`Unknown action ${actionType}`);
      break;
    }

  }

  ledAction && movements.setLed(ledAction.r, ledAction.g, ledAction.b);

  errors.length && console.log(errors);

  res.sendStatus(204);

});

export default router;

