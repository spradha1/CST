import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { startStop, reset } from './stopwatchSlice';
import styles from './Stopwatch.module.css';
import { incrementAsync } from './stopwatchSlice';


function Stopwatch () {

  const minutes = useAppSelector( (state) => state.stopwatch.minutes);
  const seconds = useAppSelector( (state) => state.stopwatch.seconds);
  const running = useAppSelector( (state) => state.stopwatch.running);
  const dispatch = useAppDispatch();

  if (running) {
    dispatch(incrementAsync());
  }


  return (
    <div className={styles.Stopwatch}>
      <div className={styles.Clock}>
        <div>{minutes < 10 && '0'}{minutes}:{seconds < 10 && '0'}{seconds}</div>
      </div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Reset Stopwatch"
          onClick={() => dispatch(reset())}
        >
          Reset
        </button>
        <button
          className={styles.button}
          aria-label="Start/Stop Stopwatch"
          onClick={() => dispatch(startStop())}
        >
          {running ? "Stop" : "Start"}
        </button>
      </div>
    </div>
  );
}

export default Stopwatch;