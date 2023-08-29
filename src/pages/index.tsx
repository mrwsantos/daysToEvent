import React, { useState, useEffect, useContext } from "react";
import styles from "../styles/components/Main.module.scss";

import DataContext from "../context/DataContext";

//CONTEXTO -------------
import Head from "next/head";
import Counter from "./components/Counter";

const Main = () => {
  const [shouldRender, setShouldRender] = useState(false);
  const { eventName, eventImages, eventLink } = useContext(DataContext);

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
        <h1>Faltam</h1>
        <Counter />
        <h4>para nossa estadia na {eventName}</h4>

        <a href={eventLink} target="_blank">
          Ver detalhes
        </a>
      </div>
    </>
  ) : null;
};

export default Main;
