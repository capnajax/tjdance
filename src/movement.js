'use strict';

import isPi from 'detect-rpi';
import led from './hardware/led.js';
import servo from './hardware/servo.js';

const UP = 'up';
const DOWN = 'down';
const BACK = 'back';

const VALID_POSITIONS = [UP, DOWN, BACK];

function setArm(position, percent) {
  percent = Math.round(percent);
  if (isPi()) {
    switch(position) {
    case UP:
      servo.up(percent);
      break;
    case DOWN:
      servo.down(percent);
      break;
    case BACK:
      servo.back(percent);
      break;
    default:
      console.error(`setArm: ${position} not valid`);
      break;
    }
  }
}

function setLed(r, g, b) {
  if (isPi()) {
    led.setColor(r, g, b);
    
  } else {
    // c is contrastColor
    // const c = (r>128?1:0 + g>128?1:0 + b>128?1:0) >=2 ? 255 : 0;
    console.log(`would ${r};${g};${b}`);
    // terminal doesn't support true color
    // console.log(`\\x1b[48;2;${r};${g};${b}m\\x1b[38;2;${c};${c};${c}mLED\\x1b[0m`);
  }
}

export default {
  setArm,
  setLed,
  UP, DOWN, BACK,
  VALID_POSITIONS
}

