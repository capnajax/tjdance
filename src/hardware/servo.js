'use strict';

import _ from 'lodash';
import { Gpio } from 'pigpio';

const SERVO_PIN = 7;

const ARM_BACK = 500;
const ARM_UP = 806;
const ARM_DOWN = 2400;

const servo = new Gpio(SERVO_PIN, { mode: Gpio.OUTPUT });

/**
 * @method position
 * Move the arm to the specified positon
 * @param {Number} position 
 */
function toPostion(position) {
  let usePosition = Math.round(
      Math.max(ARM_BACK, Math.min(ARM_DOWN, position))
    );
  console.log(`**** arm positon ${position} toPostion ${usePosition}`);
  servo.servoWrite(usePosition);
}

/**
 * @emthod percentRange
 * Get the number that's x percent of the distance from a to b
 * @param {Number} percent 
 * @param {Number} a
 * @param {Number} b
 * @return {Number}
 */
function percentRange(percent, a, b) {  
  console.log('percentRange', JSON.stringify({percent,a,b}));
  let usePercent = (_.isNil(percent) || _.isNaN(percent))
    ? 100
    : Math.min(100, Math.max(0, percent));
  console.log('percentRange usePercent', usePercent);
  let result = (b - a) * usePercent / 100 + a;
  console.log('percentRange', result);
  return result;
}

/**
 * @method up
 * Raise the arm
 * @param {Number|undefined} percent - if provided, raise the arm this percent
 * from the downward position
 */
function up(percent) {
  toPostion(percentRange(percent, ARM_DOWN, ARM_UP));
}

/**
 * @method down
 * Raise the arm
 * @param {Number|undefined} percent - if provided, raise the arm this percent
 * from the downward position
 */
function down(percent) {
  toPostion(percentRange(percent, ARM_UP, ARM_DOWN));
}

/**
 * @method back
 * Raise the arm
 * @param {Number|undefined} percent - if provided, raise the arm this percent
 * from the downward position
 */
function back(percent) {
  toPostion(percentRange(percent, ARM_UP, ARM_BACK));  
}

export default {
  up,
  down,
  back,
  ARM_UP,
  ARM_DOWN,
  ARM_BACK
};
