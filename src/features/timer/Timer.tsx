import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useState } from 'react';
import { stopResume, deleteTimer, reset, setTimer } from './timerSlice';
import { decrementAsync } from './timerSlice';
import styles from './Timer.module.css';


function Timer () {

  const curTime = useAppSelector( (state) => state.timer.curTime);
  const setting = useAppSelector( (state) => state.timer.setting);
  const running = useAppSelector( (state) => state.timer.running);
  const ringing = useAppSelector( (state) => state.timer.ringing);
  const [inputMinute, setInputMinute] = useState('');
  const [inputSecond, setInputSecond] = useState('');
  const dispatch = useAppDispatch();

  const audio = new Audio("https://assets.coderrocketfuel.com/pomodoro-times-up.mp3");
  audio.loop = true;


  // validate input for timer
  function timeFormatHelper (purpose: string) {
    let mins = parseInt(inputMinute);
    let secs = parseInt(inputSecond);

    if (isNaN(mins)) {  // timer valid if minutes is empty and seconds is non-empty
      mins = 0;
    }
    if ((mins >= 0 && secs >= 0) && (mins > 0 || secs > 0) && (mins <= 99 && secs <= 99)) {
      let totalTime = mins*60 + secs;
      let obj = {
        hours: Math.floor(totalTime / 3600),
        minutes: Math.floor(totalTime / 60) % 60,
        seconds: totalTime % 60,
      };
      if (purpose === 'Start') {
        dispatch(setTimer(obj));
      }
      else if (purpose === 'Reset') {
        audio.pause();
        dispatch(reset(obj));
      }
    }
    else {
      alert('Valid values for timer: 0 <= m <= 99 and 0 < s <= 99');
    }
  }

  // clear inputs
  function clearInput () {
    setInputMinute('');
    setInputSecond('');
  }

  function deleteTimerHelper () {
    audio.pause();
    dispatch(deleteTimer());
    clearInput();
  }

  if (ringing) {
    audio.loop = true;
    audio.play();
  }

  if (running) {
    dispatch(decrementAsync());
  }
  
  return (
    <div className='Timer'>
      {setting && <div className={styles.row}>
        <input
          className={styles.textbox}
          id='minutes'
          maxLength={2}
          aria-label="Set minutes"
          value={inputMinute}
          autoComplete='off'
          onChange={(e) => setInputMinute(e.target.value)}
        /> m
        <input
          className={styles.textbox}
          id='seconds'
          maxLength={2}
          aria-label="Set seconds"
          value={inputSecond}
          autoComplete='off'
          onChange={(e) => setInputSecond(e.target.value)}
        /> s
      </div>}
      {!setting && 
        <div className={styles.Clock}>
          <div className={ringing ? styles.Ring : ''}>
            {curTime.hours}:{curTime.minutes < 10 && '0'}{curTime.minutes}:{curTime.seconds < 10 && '0'}{curTime.seconds}
          </div>
        </div>
      }
      <div className={styles.row}>
        {!setting &&
          <button
            className={styles.button}
            aria-label="Delete Timer"
            onClick={() => deleteTimerHelper()}
          >
            Delete
          </button>
        }
        {setting &&
          <button
            className={styles.button}
            aria-label="Start Timer"
            onClick={() => timeFormatHelper('Start')}
          >
            Start
          </button>
        }
        {!setting && !ringing &&
          <button
            className={styles.button}
            aria-label="Stop/Resume Timer"
            onClick={() => dispatch(stopResume())}
          >
            {running ? "Stop" : "Resume"}
          </button>
        }
        {!setting &&
          <button
            className={styles.button}
            aria-label="Reset Timer"
            onClick={() => timeFormatHelper('Reset')}
          >
            Reset
          </button>
        }
      </div>
    </div>
  );
}

export default Timer;