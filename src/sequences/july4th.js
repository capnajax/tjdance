'use strict';

const brightness = 128;
const red = {r:brightness, g:0, b:0};
const white = {r:brightness/2, g:brightness/2, b:brightness/2};
const blue = {r:0, g:0, b:brightness};

const numRepetitions = 32;

function july4th() {

  let result = {
    time: {
      bpm: 120, // beats per minute
      timeSig: 3    // beats per bar
    },
    sequence: []
  }

  for (let i = 0; i < numRepetitions; i++) {
    result.sequence.push({ bar: 4*i, beat: 0,   led: red, arm: {where: 'up'}});
    result.sequence.push({ bar: 4*i, beat: 0.8, led: blue });
    result.sequence.push({ bar: 4*i, beat: 1,   led: white});
    result.sequence.push({ bar: 4*i, beat: 1.8, led: red  });
    result.sequence.push({ bar: 4*i, beat: 2,   led: blue, arm: {where: 'up', percent: 80}});
    result.sequence.push({ bar: 4*i, beat: 2.8, led: white  });
    result.sequence.push({ bar: 4*i+1, beat: 0,   led: red  });
    result.sequence.push({ bar: 4*i+1, beat: 0.8, led: blue });
    result.sequence.push({ bar: 4*i+1, beat: 1,   led: white, arm: {where: 'up'}});
    result.sequence.push({ bar: 4*i+1, beat: 1.8, led: red  });
    result.sequence.push({ bar: 4*i+1, beat: 2,   led: blue });
    result.sequence.push({ bar: 4*i+1, beat: 2.8, led: white});
    result.sequence.push({ bar: 4*i+2, beat: 0,   led: red, arm: {where: 'up', percent: 80}});
    result.sequence.push({ bar: 4*i+2, beat: 0.8, led: blue });
    result.sequence.push({ bar: 4*i+2, beat: 1,   led: white});
    result.sequence.push({ bar: 4*i+2, beat: 1.8, led: red  });
    result.sequence.push({ bar: 4*i+2, beat: 2,   led: blue, arm: {where: 'up'}});
    result.sequence.push({ bar: 4*i+2, beat: 2.8, led: white  });
    result.sequence.push({ bar: 4*i+3, beat: 0,   led: red  });
    result.sequence.push({ bar: 4*i+3, beat: 0.8, led: blue });
    result.sequence.push({ bar: 4*i+3, beat: 1,   led: white, arm: {where: 'up', percent: 80}});
    result.sequence.push({ bar: 4*i+3, beat: 1.8, led: red  });
    result.sequence.push({ bar: 4*i+3, beat: 2,   led: blue });
    result.sequence.push({ bar: 4*i+3, beat: 2.8, led: white});
  }
  
  return result;
}

export default july4th;