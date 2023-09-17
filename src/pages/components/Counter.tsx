import React, { useContext } from "react";
import DataContext from "../../context/DataContext";
import styles from "./../../styles/components/Counter.module.scss";

const Counter = () => {
  const { eventDate } = useContext(DataContext);
  const [timeLeft, setTimeLeft] = React.useState<any>();

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [eventDate]);

  const calculateTimeLeft = () => {
    let year = new Date().getFullYear();
    let difference = +new Date(`10/01/${year}`) - +new Date();

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)) - 1,
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    setTimeLeft(timeLeft);
    return timeLeft;
  };

  if (!timeLeft) {
    return <div className={styles.empty}></div>;
  }

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.sheet}>
          <div className={styles.days}>
            <div className={styles.daysLeft}>
              <div>{timeLeft.days.toString().padStart(2, "0")}</div>
              <div>{timeLeft.days > 1 ? "DIAS" : "DIA"}</div>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.sheet}>
              <div className={styles.hours}>
                {timeLeft.hours.toString().padStart(2, "0")}{" "}
                {timeLeft.hours > 1 ? "HORAS" : "HORA"}
              </div>
            </div>
            <div className={styles.sheet}>
              <div className={styles.minutes}>
                {timeLeft.minutes} {timeLeft.minutes > 1 ? "MINUTOS" : "MINUTO"}
              </div>
            </div>
            <div className={styles.sheet}>
              <div className={styles.seconds}>
                {timeLeft.seconds.toString().padStart(2, "0")}{" "}
                {timeLeft.seconds > 1 ? "SEGUNDOS" : "SEGUNDO"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Counter;
