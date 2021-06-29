import isPi from 'detect-rpi';

function setLed(r, g, b) {

  console.log('setLed', r, g, b);

  if (isPi()) {
    // c is contrastColor
    const c = (r>128?1:0 + g>128?1:0 + b>128?1:0) >=2 ? 255 : 0;
    console.log(`\x1b[48:2:${r}:${g}:${b}m\x1b[38:2:${c}:${c}:${c}mPi LED\x1b0m`);
  } else {
    // c is contrastColor
    const c = (r>128?1:0 + g>128?1:0 + b>128?1:0) >=2 ? 255 : 0;
    console.log(`\x1b[48:2:${r}:${g}:${b}m\x1b[38:2:${c}:${c}:${c}mLED\x1b[0m`);
  }
}

export default {
  setLed
}
