import { Clock } from "./components/Clock";
import styles from "./App.module.css";
import Logo from "./assets/svg/Logo";
import React from "react";

export const App = () => {
  const [playingAnimation, setPlayingAnimation] = React.useState(false);

  return (
    <div
      className={`${styles.root} ${playingAnimation ? styles.animation : ""}`}
    >
      <a href="https://ashilramjee.com" target="_blank" rel="noreferrer">
        <Logo className={styles.logo} />
      </a>
      <Clock setPlayingAnimation={setPlayingAnimation} />
      <div className={styles.copyright}>
        <p>
          <i>&copy; Copyright. Ashil Ramjee. 2022. All Rights Reserved.</i>
        </p>
      </div>
    </div>
  );
};

export default App;
