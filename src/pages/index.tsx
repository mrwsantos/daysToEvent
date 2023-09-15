import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import styles from "../styles/components/Main.module.scss";

import DataContext from "../context/DataContext";

//CONTEXTO -------------
import Head from "next/head";
import Counter from "./components/Counter";
import {
  Backpack,
  Warning,
  Camera,
  MapPin,
} from "@phosphor-icons/react";
import data from "../database/checklist.json";
import Timeline from "./components/Timeline";
import CheckList from "./components/CheckList";

const Main = () => {
  const [shouldRender, setShouldRender] = useState(false);
  const { eventName, eventImages, eventLink } = useContext(DataContext);

  const today = moment().get("D");
  const dynamicBackground = eventImages[today % eventImages.length];

  useEffect(() => {
    setShouldRender(true);
  }, []);

  return shouldRender ? (
    <>
      <Head>
        <title>Dias para o evento</title>
        <html lang="pt" />
        <meta
          name="description"
          content="Days to an event, a birthday, a trip, a wedding, or a meeting."
        />
      </Head>
      <div className={styles.mainWrapper}>
        <div className={styles.intro}>
          <header>
            <h1>{eventName}</h1>
          </header>
          <Counter />
          <Timeline />
        </div>

        <div className={styles.options}>
          <ul className={styles.menu}>
            <li className={`${styles.menu__item} ${styles.active}`}>
              <Backpack size={24} color="white" />
            </li>
            <li className={styles.menu__item}>
              <Warning size={24} color="white" />
            </li>
            <li className={styles.menu__item}>
              <Camera size={24} color="white" />
            </li>
            <li className={styles.menu__item}>
              <MapPin size={24} color="white" />
            </li>
          </ul>
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.sidebar__container}>
            <header className={styles.sidebar__header}>
              <h2>Items para não esquecer</h2>
            </header>

            {data.sections.length &&
              data.sections.map((section, index) => (
                <div key={index} className={styles.section}>
                  <h3 className={styles.section__title}>{section.title}</h3>
                  <CheckList data={section.checklist} />
                </div>
              ))}
          </div>
        </aside>

        {dynamicBackground && <div className={styles.background} style={{
          backgroundImage: `url(${dynamicBackground})`
        }}></div>}
      </div>
    </>
  ) : null;
};

export default Main;
