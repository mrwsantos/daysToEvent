import { useState, useEffect, useContext } from "react";
import axios from "axios";

import {
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  Snowflake,
  Sun,
  Wind,
} from "@phosphor-icons/react";
import DataContext from "../context/DataContext";

import styles from "../styles/components/Forecast.module.scss";
import moment from "moment";

function getIcon(weatherId: string) {
  if (/^80[1-9]/g.test(weatherId)) {
    return <CloudSun size={32} />;
  }

  if (/^2[0-9]/g.test(weatherId)) {
    return <CloudLightning size={32} />;
  }

  if (/^3[0-9]/g.test(weatherId)) {
    return <CloudRain size={32} />;
  }

  if (/^5[0-9]/g.test(weatherId)) {
    return <CloudSnow size={32} />;
  }

  if (/^6[0-9]/g.test(weatherId)) {
    return <Snowflake size={32} />;
  }

  if (/^7[0-9]/g.test(weatherId)) {
    return <Wind size={32} />;
  }

  if (/^8[0-9]/g.test(weatherId)) {
    return <Sun size={32} />;
  }

  return null;
}

const APP_ID = process.env.NEXT_PUBLIC_WEATHER_API_APP_KEY as string;

const Forecast = () => {
  const { eventDate } = useContext(DataContext);
  const [forecast, setForecast] = useState({} as any);

  useEffect(() => {
    const baseURL = "https://api.openweathermap.org/data/2.5/forecast?";
    const queries = {
      appid: APP_ID,
      lang: "pt_br",
      units: "metric",
      lat: "-23.7242643",
      lon: "-47.2745313",
    };

    const url = baseURL.concat(new URLSearchParams(queries).toString());

    (async () => {
      try {
        const { data } = await axios.get(url);

        const forecastForTheDayOfTheEvent = data?.list?.filter(
          (item: any) =>
            moment(eventDate).format("L") === moment(item?.dt_txt).format("L")
        );

        if (forecastForTheDayOfTheEvent?.length) {
          setForecast({ ...data, list: forecastForTheDayOfTheEvent });
          return;
        }
      } catch (err) {
        console.error(`Ocorreu um erro ao consultar previsão do tempo: ${err}`);
      }
    })();
  }, [eventDate]);

  if (!forecast?.list?.length) {
    return null;
  }

  const { city, list } = forecast;

  return (
    <div className={styles.wrapper}>
      <h5 className={styles.title}>
        Previsão para o dia {moment(list[0]?.dt_txt).format("DD")} em{" "}
        {city?.name}
      </h5>

      <div className={styles.forecast}>
        {list?.map((item: any) => {
          const { dt, dt_txt, weather, main } = item;

          const hour = moment(dt_txt).get("h");
          const weatherId = weather[0]?.id?.toString();
          const weatherDescription = weather[0]?.description;
          const temp = main?.temp_max;

          if (![9, 15, 18].includes(hour)) {
            return null;
          }

          const morning = hour === 9;
          const afternoon = hour === 15;
          const night = hour === 18;

          return (
            <div key={dt} className={styles.weather}>
              {morning && (
                <div className={styles.block}>
                  {getIcon(weatherId)}
                  <h6 className={styles.period}>Manhã</h6>
                  <p className={styles.celsius}>{Math.round(temp)}°C</p>
                  <small className={styles.description}>
                    {weatherDescription}
                  </small>
                </div>
              )}
              {afternoon && (
                <div className={styles.block}>
                  {getIcon(weatherId)}
                  <h6 className={styles.period}>Tarde</h6>
                  <p className={styles.celsius}>{Math.round(temp)}°C</p>
                  <small className={styles.description}>
                    {weatherDescription}
                  </small>
                </div>
              )}
              {night && (
                <div className={styles.block}>
                  {getIcon(weatherId)}
                  <h6 className={styles.period}>Noite</h6>
                  <p className={styles.celsius}>{Math.round(temp)}°C</p>
                  <small className={styles.description}>
                    {weatherDescription}
                  </small>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;
