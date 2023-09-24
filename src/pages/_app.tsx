import "../styles/normalize.css"; // Importe o normalize.css aqui
import "../styles/globals.css"; // Importe o normalize.css aqui

import { DataStorage } from "../context/DataContext";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DataStorage>
      <Component {...pageProps}></Component>
    </DataStorage>
  );
}

export default MyApp;
