import React from "react";
import styles from "./Clock.module.css";

interface Props {
  setPlayingAnimation: any;
}

export const Clock = ({ setPlayingAnimation }: Props) => {
  const initialState = "";
  const [hours, setHours] = React.useState(initialState);
  const [minutes, setMinutes] = React.useState(initialState);
  const [seconds, setSeconds] = React.useState(initialState);
  const titleFormat = "00:00:00";

  const [started, setStarted] = React.useState(false);
  const [showInstructions, setShowInstructions] = React.useState(false);
  const [audio] = React.useState(new Audio("/audio/alarm.mp3"));
  const [playing, setPlaying] = React.useState(false);

  var doc = document.getElementById("site_title");

  React.useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  React.useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, []);

  const onChangeHours = (e: any) => {
    var value = e.target.value;
    var convertedValue = Number(value);

    if (!Number.isNaN(Number(value))) {
      if (convertedValue > 24) {
        setHours("24");
      } else {
        setHours(value);
      }
    }
  };

  const onChangeMinutes = (e: any) => {
    var value = e.target.value;
    var convertedValue = Number(value);

    if (!Number.isNaN(Number(value))) {
      if (convertedValue > 59) {
        setMinutes("59");
      } else {
        setMinutes(value);
      }
    }
  };

  const onChangeSeconds = (e: any) => {
    var value = e.target.value;
    var convertedValue = Number(value);

    if (!Number.isNaN(Number(value))) {
      if (convertedValue > 59) {
        setSeconds("59");
      } else {
        setSeconds(value);
      }
    }
  };

  const intervalRef = React.useRef<any>(null);

  const isValid = () => {
    return (
      (hours && hours !== initialState && Number(hours) > 0) ||
      (minutes && minutes !== initialState && Number(minutes) > 0) ||
      (seconds && seconds !== initialState && Number(seconds) > 0)
    );
  };

  const startTimer = () => {
    if (isValid()) {
      const convertedHours = Number(hours) * 60 * 60 * 1000;
      const convertedMinutes = Number(minutes) * 60 * 1000;
      const convertedSeconds = Number(seconds) * 1000;

      const countDownTime =
        new Date().getTime() +
        convertedHours +
        convertedMinutes +
        convertedSeconds;

      setStarted(true);

      intervalRef.current = setInterval(() => {
        const now = new Date().getTime();

        const distance = countDownTime - now;

        const nHours = Math.floor(
          (distance % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
        );
        const nMinutes = Math.floor(
          (distance % (60 * 60 * 1000)) / (1000 * 60)
        );
        const nSeconds = Math.floor((distance % (60 * 1000)) / 1000);

        if (distance < 0) {
          stopTimer();
          playRinger();
        } else {
          setHours(formatNumber(nHours));
          setMinutes(formatNumber(nMinutes));
          setSeconds(formatNumber(nSeconds));
          if (doc) {
            doc.innerText =
              formatNumber(nHours) +
              ":" +
              formatNumber(nMinutes) +
              ":" +
              formatNumber(nSeconds);
          }
        }
      });
    } else {
      setHours(initialState);
      setMinutes(initialState);
      setSeconds(initialState);
      setShowInstructions(true);
      setTimeout(() => {
        setShowInstructions(false);
      }, 5000);
    }
  };

  const stopTimer = () => {
    setStarted(false);
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setHours(initialState);
    setMinutes(initialState);
    setSeconds(initialState);
    if (doc) {
      doc.innerText = titleFormat;
    }
  };

  const resetTimer = () => {
    setStarted(false);
    setHours(initialState);
    setMinutes(initialState);
    setSeconds(initialState);
    if (doc) {
      doc.innerText = titleFormat;
    }
  };

  const pauseTimer = () => {
    setStarted(false);
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const formatNumber = (value: number) => {
    if (value < 10) {
      return "0" + value.toString();
    }
    return value.toString();
  };

  const setTime = (hours: string, minutes: string, seconds: string) => {
    setHours(hours);
    setMinutes(minutes);
    setSeconds(seconds);
  };

  const playRinger = () => {
    setPlaying(true);
    setPlayingAnimation(true);
    setTimeout(() => {
      setPlayingAnimation(false);
    }, 5000);
  };

  return (
    <section className={styles.root}>
      <div className={styles.options}>
        <button
          className={styles.specificTime}
          onClick={() => {
            setTime("01", "00", "00");
          }}
          disabled={started ? true : false}
        >
          1 hr
        </button>
        <button
          className={styles.specificTime}
          onClick={() => {
            setTime("00", "45", "00");
          }}
          disabled={started ? true : false}
        >
          45 mins
        </button>
        <button
          className={styles.specificTime}
          onClick={() => {
            setTime("00", "30", "00");
          }}
          disabled={started ? true : false}
        >
          30 mins
        </button>
        <button
          className={styles.specificTime}
          onClick={() => {
            setTime("00", "15", "00");
          }}
          disabled={started ? true : false}
        >
          15 mins
        </button>
        <button
          className={styles.specificTime}
          onClick={() => {
            setTime("00", "05", "00");
          }}
          disabled={started ? true : false}
        >
          5 mins
        </button>
      </div>
      <div className={styles.timer}>
        <div className={styles.column}>
          <input
            type="text"
            value={hours}
            onChange={onChangeHours}
            maxLength={2}
            placeholder="00"
            className={styles.numbers}
            disabled={started ? true : false}
          />
          <p className={styles.numberTitle}>Hours</p>
        </div>
        <div className={styles.separator}></div>
        <div className={styles.column}>
          <input
            type="text"
            value={minutes}
            onChange={onChangeMinutes}
            maxLength={2}
            placeholder="00"
            className={styles.numbers}
            disabled={started ? true : false}
          />
          <p className={styles.numberTitle}>Minutes</p>
        </div>
        <div className={styles.separator}></div>
        <div className={styles.column}>
          <input
            type="text"
            value={seconds}
            onChange={onChangeSeconds}
            maxLength={2}
            placeholder="00"
            className={styles.numbers}
            disabled={started ? true : false}
          />
          <p className={styles.numberTitle}>Seconds</p>
        </div>
      </div>

      {!started ? (
        <div className={styles.controls}>
          <button
            className={`${styles.controlButton} ${styles.start}`}
            onClick={startTimer}
          >
            Start
          </button>
          <button
            className={`${styles.controlButton} ${styles.reset}`}
            onClick={resetTimer}
          >
            Reset
          </button>
        </div>
      ) : (
        <div className={styles.controls}>
          <button
            className={`${styles.controlButton} ${styles.pause}`}
            onClick={pauseTimer}
          >
            Pause
          </button>
          <button
            className={`${styles.controlButton} ${styles.stop}`}
            onClick={stopTimer}
          >
            Stop
          </button>
        </div>
      )}

      {showInstructions && (
        <p className={styles.instruction}>You need to set or pick a time.</p>
      )}
    </section>
  );
};
