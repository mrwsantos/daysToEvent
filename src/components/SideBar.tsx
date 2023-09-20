import React, { useContext, useState } from "react";
import styles from "./../styles/components/Main.module.scss";

import {
  Backpack,
  Link,
  Camera,
  MapPin,
  CaretDoubleUp,
  GooglePhotosLogo,
} from "@phosphor-icons/react";
import data from "../database/checklist.json";
import CheckList from "./CheckList";
import { isMobile } from "react-device-detect";
import DataContext from "@/context/DataContext";

type SideContentName = "backpack" | "pictures" | "map" | "links";

const SideBar = () => {
  const [mobileMenuExpanded, setMobileMenuExpanded] = useState(false);
  const { sidebarOpened, setSidebarOpened } = useContext(DataContext);
  const [sideContent, setSideContent] = useState<SideContentName>("backpack");

  function handleSideBar(type: SideContentName) {
    if (sidebarOpened) {
      setSideContent(type);

      if (sideContent === type) setSidebarOpened(false);
    } else {
      setSideContent(type);
      setSidebarOpened(true);
    }
  }

  return (
    <>
      <div
        className={`${styles.options} ${
          mobileMenuExpanded ? styles.optionsMenuExpanded : ""
        }`}
      >
        {isMobile && (
          <span
            className={styles.iconExpanded}
            onClick={() => {
              setMobileMenuExpanded((prev) => !prev);
              setSidebarOpened(false);
            }}
          >
            <CaretDoubleUp size={24} />
          </span>
        )}
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
            <button onClick={() => handleSideBar("links")}>
              <Link size={24} color="white" />
            </button>
          </li>
          <li
            className={`${styles.menu__item}
            ${
              sidebarOpened && sideContent === "pictures" ? styles.active : ""
            }`}
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

      <aside
        className={`${styles.sidebar} ${
          sidebarOpened ? styles.sidebarOpened : ""
        }`}
      >
        <div className={styles.sidebar__container}>
          {sideContent === "backpack" && (
            <>
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
                  className={styles.sidebar__iframeMap}
                ></iframe>
              </div>
            </>
          )}
          {sideContent === "links" && (
            <>
              <header className={styles.sidebar__header}>
                <h2>Links Úteis</h2>
              </header>

              <div className={styles.section}>
                <ul className={styles.sectionLinksList}>
                  <li>
                    <a href="https://splid.net/j/QK2TEJWCA" target="_blank">
                      <img
                        src="https://play-lh.googleusercontent.com/1hdsMuYsLnfB6yM2u3q6o2ITJSSoSBPtItcUMw38damDejNROLuA12Zfv5ivb959zVg"
                        alt="Splid"
                      />{" "}
                      Grupo no Splid
                    </a>
                  </li>
                  <li>
                    <a href="https://photos.app.goo.gl/MHxC2H1D9zC45eyY6" target="_blank">
                      <GooglePhotosLogo size={24} /> Google Photos
                    </a>
                  </li>
                  <li>
                    <a href="https://www.airbnb.com.br/trips/v1/09bf28bd-d9cf-4f43-841d-720f93c1aa5c/ro/RESERVATION_USER_CHECKIN/HM42EYB99Y" target="_blank">
                      <img
                        src="https://static-00.iconduck.com/assets.00/airbnb-icon-512x512-d9grja5t.png"
                        alt="Airbnb link"
                      />
                      Reserva no Airbnb
                    </a>
                  </li>
                </ul>
              </div>
            </>
          )}
          {sideContent === "pictures" && (
            <>
              <header className={styles.sidebar__header}>
                <h2>Fotos da estadia</h2>
              </header>

              <p className={styles.section}>
                Infelizmente não há nada ainda para mostrar por aqui. Volte
                novamente mais tarde.
              </p>
            </>
          )}
        </div>
      </aside>
    </>
  );
};

export default SideBar;
