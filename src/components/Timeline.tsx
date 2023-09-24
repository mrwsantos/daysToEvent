import React, { useContext } from "react";
import { v4 as randomUUIDv4 } from "uuid";
import moment from "moment";

import DataContext from "../context/DataContext";

import styles from "./../styles/components/Timeline.module.scss";

const Timeline = () => {
  const { eventDate } = useContext(DataContext);
  const today = moment().get("D");
  const dayOfTheEvent = moment(eventDate).get("D");
  const calendar = Array(dayOfTheEvent).fill("•");

  return (
    <ul
      className={styles.timeline}
      style={{
        gridTemplateColumns: `repeat(${calendar.length}, 1fr)`,
      }}
    >
      {calendar.map((bullet, index) => {
        index = index + 1;

        const isPast = index < today;
        const isToday = index === today;
        const isLast = index === dayOfTheEvent;

        if (index === today - 1) {
          return <div key={randomUUIDv4()} style={{
            visibility: "hidden"
          }}>{bullet}</div>;
        }

        return (
          <li
            key={randomUUIDv4()}
            className={`${styles.timeline__item} ${
              isToday ? styles.active : ""
            } ${isLast ? styles.last : ""} ${isPast ? styles.past : ""}`}
          >
            {isToday && index.toString().padStart(2, "0")}
            {!isToday && !isLast && bullet}
            {isLast && index.toString().padStart(2, "0")}
          </li>
        );
      })}
    </ul>
  );
};

export default Timeline;
