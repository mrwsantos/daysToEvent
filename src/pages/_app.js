import "../styles/normalize.css"; // Importe o normalize.css aqui
import "../styles/globals.css"; // Importe o normalize.css aqui

import { DataStorage } from "../context/DataContext";

function MyApp({ Component, pageProps }) {
  return (
    <DataStorage>
      <Component {...pageProps}></Component>
    </DataStorage>
  );
}

export default MyApp;
