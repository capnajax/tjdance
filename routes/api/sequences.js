'use strict';

import express from 'express';
import movements from '../../src/movement.js';
import _ from 'lodash';
import july4th from '../../src/sequences/july4th.js';

var router = express.Router();

function handleMovement(movement) {
  console.log({movement});
  if (movement.led) {
    movements.setLed(movement.led.r, movement.led.g, movement.led.b);
  }
  if (movement.arm) {
    movements.setArm(movement.arm.where, movement.arm.percent);
  }
}

function readSequence(sequence) {

  console.log(readSequence);
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

  console.log({events});

  events.forEach(e => {
    let eTime = e.offset + startTime - Date.now();
    console.log(`Setting movement ${eTime} of ${e.movement}`);
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

  console.log(`sequence of name ${name}`);

  switch(name) {
  case 'july4th':
    readSequence(july4th());
    break;
  default:
    console.error(`Sequence \"${name}\" not known`);
    break;
  }
  res.sendStatus(204)
});

export default router;