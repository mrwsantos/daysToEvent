import React, { useContext } from "react";
import DataContext from "../../context/DataContext";
import styles from "./../../styles/components/Counter.module.scss";

const Counter = () => {
  const { eventDate } = useContext(DataContext);
  const [timeLeft, setTimeLeft] = React.useState<any>();
  const [loading, setLoading] = React.useState(true);

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
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    setTimeLeft(timeLeft);
    return timeLeft;
  };

  React.useEffect(() => {
    setLoading(false);
  }, [timeLeft]);

  return (
    <>
      {loading ? (
        <h1>Carregando...</h1>
      ) : (
        <>
          <div className={styles.row}>
            <div className={styles.sheet}>
              {timeLeft && timeLeft.days}
              <h3>DIAS</h3>
            </div>
          </div>
          <div className={styles.wrapper}>
            <div className={styles.row}>
              <div className={styles.sheet}>
                {timeLeft && timeLeft.hours}
                <h3>HORAS</h3>
              </div>
              <div className={styles.sheet}>
                {timeLeft && timeLeft.minutes}
                <h3>MINUTOS</h3>
              </div>
              <div className={styles.sheet}>
                {timeLeft && timeLeft.seconds}
                <h3>SEGUNDOS</h3>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Counter;
