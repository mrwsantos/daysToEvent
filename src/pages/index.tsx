import React, { useState, useEffect, useContext } from "react";
import moment from "moment";

import DataContext from "../context/DataContext";
import { isMobile } from "react-device-detect";

//CONTEXTO -------------
import Head from "next/head";
import Counter from "../components/Counter";

import Timeline from "../components/Timeline";
import Forecast from "../components/Forecast";
import Sound from "../components/Sound";
import SideBar from "@/components/SideBar";

import styles from "../styles/components/Main.module.scss";
import { NotificationModal } from "@/components/NotificationModal";

const Main = () => {
  const [shouldRender, setShouldRender] = useState(false);
  const { eventName, eventImages, sidebarOpened, eventFinished } =
    useContext(DataContext);

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
        <div
          className={styles.intro}
          style={{ paddingRight: !isMobile && sidebarOpened ? "340px" : "" }}
        >
          <header>
            <h1>{eventName}</h1>
          </header>
          {eventFinished ? (
            <>
              <h1 className={styles.eventFinished}>
                {isMobile ? (
                  <>
                    Evento <span>Finalizado! :)</span>
                  </>
                ) : (
                  "Evento finalizado! :)"
                )}
              </h1>
              <Sound />
            </>
          ) : (
            <>
              <div className={styles.content}>
                <Counter />
                <Forecast />
              </div>
              <div className={styles.footer}>
                <Sound />
                <Timeline />
              </div>
            </>
          )}
        </div>

        <SideBar />

        {dynamicBackground && (
          <div
            className={styles.background}
            style={{
              backgroundImage: `url(${dynamicBackground})`,
            }}
          ></div>
        )}

        <NotificationModal />
      </div>
    </>
  ) : null;
};

export default Main;
