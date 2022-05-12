'use strict';

import express from 'express';
import movements from '../../src/movement.js';
import _ from 'lodash';
import july4th from '../../src/sequences/july4th.js';
import july4thSilent from '../../src/sequences/july4th-silent.js';

var router = express.Router();

function handleMovement(movement) {
  if (movement.led) {
    movements.setLed(movement.led.r, movement.led.g, movement.led.b);
  }
  if (movement.arm) {
    movements.setArm(movement.arm.where, movement.arm.percent);
  }
}

function readSequence(sequence) {
  let startTime;
  let beatLength = 60.0*1000/sequence.time.bpm;
  let barLength = beatLength*sequence.time.timeSig;
  let events = [];
  for (let s of sequence.sequence) {
    let event = {
      offset: Math.floor(s.bar * barLength + s.beat * beatLength),
      movement: _.pick(s, ['arm', 'led'])
    }
    events.push(event);
  }
  startTime = Date.now();

  events.forEach(e => {
    let eTime = e.offset + startTime - Date.now();
    setTimeout(() => {
      try {
        handleMovement(e.movement);
      } catch (e) {
        console.error("ERROR:", e);
      }
    }, eTime);
  });
}

router.get('/:name', function(req, res, next) {

  let name = req.params.name;

  switch(name) {
  case 'july4th':
    readSequence(july4th());
    break;
  case 'july4th-silent':
    readSequence(july4thSilent());
    break;
  default:
    console.error(`Sequence \"${name}\" not known`);
    break;
  }
  res.sendStatus(204)
});

export default router;
