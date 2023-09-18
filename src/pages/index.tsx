import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import styles from "../styles/components/Main.module.scss";

import DataContext from "../context/DataContext";

//CONTEXTO -------------
import Head from "next/head";
import Counter from "./components/Counter";
import { Backpack, Warning, Camera, MapPin } from "@phosphor-icons/react";
import data from "../database/checklist.json";
import Timeline from "./components/Timeline";
import CheckList from "./components/CheckList";
import Forecast from "./components/Forecast";
import Sound from "./components/Sound";

type SideContentName = "backpack" | "pictures" | "map";

const Main = () => {
  const [shouldRender, setShouldRender] = useState(false);
  const { eventName, eventImages, eventLink } = useContext(DataContext);

  const [sidebarOpened, setSidebarOpened] = useState(false);
  const [sideContent, setSideContent] = useState<SideContentName>("backpack");

  const today = moment().get("D");
  const dynamicBackground = eventImages[today % eventImages.length];

  useEffect(() => {
    setShouldRender(true);
  }, []);

  function handleSideBar(type: SideContentName) {
    if (sidebarOpened) {
      setSideContent(type);

      if (sideContent === type) setSidebarOpened(false);
    } else {
      setSideContent(type);
      setSidebarOpened(true);
    }
  }

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
          <div className={styles.content}>
            <Counter />
            <Forecast />
          </div>
          <div className={styles.footer}>
            <Sound />
            <Timeline />
          </div>
        </div>

        <div className={styles.options}>
          <ul className={styles.menu}>
            <li
              className={`${styles.menu__item} ${
                sidebarOpened && sideContent === "backpack" ? styles.active : ""
              }`}
            >
              <button onClick={() => handleSideBar("backpack")}>
                <Backpack size={24} color="white" />
              </button>
            </li>
            <li className={styles.menu__item}>
              <Warning size={24} color="white" />
            </li>
            <li
              className={`${styles.menu__item}
            ${sidebarOpened && sideContent === "pictures" ? styles.active : ""}`}
            >
              <button onClick={() => handleSideBar("pictures")}>
                <Camera size={24} color="white" />
              </button>
            </li>
            <li
              className={`${styles.menu__item}
            ${sidebarOpened && sideContent === "map" ? styles.active : ""}`}
            >
              <button onClick={() => handleSideBar("map")}>
                <MapPin size={24} color="white" />
              </button>
            </li>
          </ul>
        </div>

        {sidebarOpened && (
          <aside className={styles.sidebar}>
            <div className={styles.sidebar__container}>
              {sideContent === "backpack" && (
                <>
                  <header className={styles.sidebar__header}>
                    <h2>Items para não esquecer</h2>
                  </header>

                  {data.sections.length &&
                    data.sections.map((section, index) => (
                      <div key={index} className={styles.section}>
                        <h3 className={styles.section__title}>
                          {section.title}
                        </h3>
                        <CheckList data={section.checklist} />
                      </div>
                    ))}
                </>
              )}
              {sideContent === "map" && (
                <>
                  <header className={styles.sidebar__header}>
                    <h2>Localização</h2>
                  </header>

                  <div className={styles.section}>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3652.660898241824!2d-47.274852724664974!3d-23.72380067868861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjPCsDQzJzI1LjciUyA0N8KwMTYnMjAuMiJX!5e0!3m2!1spt-BR!2sbr!4v1695000941376!5m2!1spt-BR!2sbr"
                      width="280"
                      height="500"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                    ></iframe>
                  </div>
                </>
              )}
              {sideContent === "pictures" && (
                <>
                  <header className={styles.sidebar__header}>
                    <h2>Fotos da estadia</h2>
                  </header>

                  <p className={styles.section}>
                    Infelizmente não há nada ainda para mostrar por aqui. Volte novamente mais tarde.
                  </p>
                </>
              )}
            </div>
          </aside>
        )}

        {dynamicBackground && (
          <div
            className={styles.background}
            style={{
              backgroundImage: `url(${dynamicBackground})`,
            }}
          ></div>
        )}
      </div>
    </>
  ) : null;
};

export default Main;
