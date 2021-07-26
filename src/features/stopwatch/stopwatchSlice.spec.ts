import stopwatchReducer, {
  startStop,
  reset
} from './stopwatchSlice';


describe ('stopwatch reducer', () => {

  const sampleState = {
    minutes: 4,
    seconds: 22,
    running: false,
  };

  it ('should return the initial state', () => {
    expect(stopwatchReducer(undefined, <any>{})).toEqual(
      {
        minutes: 0,
        seconds: 0,
        running: false,
      }
    )
  })

  it ('should handle startStop', () => {
    const actual = stopwatchReducer(sampleState, startStop());
    expect(actual.running).toBeTruthy();
  });

  it ('should handle reset', () => {
    const actual = stopwatchReducer(sampleState, reset());
    expect(actual.minutes).toEqual(0);
    expect(actual.seconds).toEqual(0);
    expect(actual.running).toBeFalsy();
  });

});