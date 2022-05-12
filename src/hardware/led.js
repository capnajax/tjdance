'use strict';

import I2cWS281xDriver from 'i2c-ws2812-adapter';

const PIXEL_COUNT = 1;
const ws = new I2cWS281xDriver();
const initPromise = ws.open();

ws.setPixelCount(PIXEL_COUNT);

async function setColor(r, g, b) {
  await initPromise;
  ws.setPixelColor(0, {r, g, b});
  ws.send();
}

export default {
  setColor
};
