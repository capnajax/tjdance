'use strict';

import I2cWS281xDriver from 'i2c-ws2812-adapter';

const PIXEL_COUNT = 1;
const ws = new I2cWS281xDriver();

ws.setPixelCount(PIXEL_COUNT);

function setColor(r, g, b) {
  ws.setPixelColor(0, r, g, b);
  ws.send();
}

export default {
  setColor
};
