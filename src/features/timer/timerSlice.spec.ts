import timerReducer, {
  setTimer,
  stopResume,
  deleteTimer,
  reset,
} from './timerSlice';


describe ('timer reducer', () => {
  var samples: any[] = [];

  beforeEach(() => {
    samples = [
      {
        curTime: {
          hours: 0,
          minutes: 0,
          seconds: 0,
        },
        setting: true,
        running: false,
        ringing: false,
      },
      {
        curTime: {
          hours: 0,
          minutes: 1,
          seconds: 3,
        },
        setting: false,
        running: true,
        ringing: true,
      },
    ];
  });


  it ('should return the initial state', () => {
    expect(timerReducer(undefined, <any>{})).toEqual(
      {
        curTime: {
          hours: 0,
          minutes: 0,
          seconds: 0,
        },
        setting: true,
        running: false,
        ringing: false,
      }
    )
  })

  it ('should handle setTimer', () => {
    const actual = timerReducer(samples[0], setTimer({hours: 1, minutes: 21, seconds: 21}));
    expect(actual.curTime).toEqual({
      hours: 1,
      minutes: 21,
      seconds: 21
    });
    expect(actual.setting).toBeFalsy();
    expect(actual.running).toBeTruthy();
  });

  it ('should handle stopResume', () => {
    let actual = timerReducer(samples[1], stopResume());
    expect(actual.running).toBeFalsy();
    actual = timerReducer(actual, stopResume());
    expect(actual.running).toBeTruthy();
  });

  it ('should handle reset', () => {
    const actual = timerReducer(samples[1], reset({hours: 0, minutes: 11, seconds: 56}));
    expect(actual.curTime).toEqual({
      hours: 0,
      minutes: 11,
      seconds: 56
    });
    expect(actual.ringing).toBeFalsy();
    expect(actual.running).toBeFalsy();
  });

  it ('should handle delete', () => {
    const actual = timerReducer(samples[1], deleteTimer());
    expect(actual.curTime).toEqual({
      hours: 0,
      minutes: 0,
      seconds: 0
    });
    expect(actual.setting).toBeTruthy();
    expect(actual.ringing).toBeFalsy();
    expect(actual.running).toBeFalsy();
  });

});