'use strict';

import express from 'express';
import movements from '../../src/movement.js';
import _ from 'lodash';

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.put('/', function(req, res, next) {
  let actions = req.body;
  let ledAction = null;
  let armAction = null;
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

    case 'arm': 
      if (armAction) {
        errors.push(`More than one arm action.`);
        break;
      }

      if (_.isObject(actions.arm)) {
        let where = actions.arm.where || 'up';
        let percent = actions.arm.percent || undefined;
        if (movements.VALID_POSITIONS.includes(where)) {
          armAction = { where, percent };
        } else {
          errors.push(`Arm invalid "where" value "${where}"`);
        }
        
      } else {
        errors.push(`Cannot process arm action ${actions.arm}`);
      } 
      break;

    default:
      errors.push(`Unknown action ${actionType}`);
      break;
    }

  }

  ledAction && movements.setLed(ledAction.r, ledAction.g, ledAction.b);
  armAction && movements.setArm(armAction.where, armAction.percent);

  errors.length && console.error(errors);

  res.sendStatus(204);

});

export default router;
