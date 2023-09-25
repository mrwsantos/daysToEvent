import { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";

import { SpeakerHigh, SpeakerSlash, SpeakerX } from "phosphor-react";
import DataContext from "../context/DataContext";

import styles from "../styles/components/Sound.module.scss";

const Sound = () => {
  const { eventDate } = useContext(DataContext);
  const [sound, setSound] = useState({} as any);
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const recordingsFromLocalStorage = JSON.parse(
      localStorage.getItem("event@recordings") || "[]"
    );

    if (recordingsFromLocalStorage?.length) {
      const recording = getRandomRecord(recordingsFromLocalStorage);
      setSound(recording);
      return;
    }

    const baseURL = "https://xeno-canto.org/api/2/recordings?";
    const queries = {
      query: 'loc:"São Paulo" q:A len:">120"',
      page: "1",
      group: "birds",
    };

    const url = baseURL.concat(new URLSearchParams(queries).toString());

    (async () => {
      try {
        const { data } = await axios.get(url);
        const { recordings } = data;

        if (!recordings?.length) {
          return;
        }

        const recording = getRandomRecord(recordings);

        localStorage.setItem("event@recordings", JSON.stringify(recordings));
        setSound(recording);
      } catch (err) {
        console.error(`Ocorreu um erro ao obter áudio: ${err}`);
        localStorage.removeItem("event@recordings");
      }
    })();
  }, [eventDate]);

  function getRandomRecord(recordings: any[]) {
    const randomIndex = Math.floor(Math.random() * recordings.length);
    const recording = recordings[randomIndex];

    const uploadIdRegex = /\/([A-Z]+)\//g;
    const uploadId = recording?.sono?.small?.match(uploadIdRegex);

    if (!uploadId) {
      return;
    }

    recording.uploadId = uploadId[0];

    return recording;
  }

  function handleMuteUnmute() {
    if (!audioRef.current) {
      return;
    }

    audioRef.current.play();
    setIsMuted(!isMuted);
  }

  if (!sound?.uploadId) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <audio
        ref={audioRef}
        muted={isMuted}
        autoPlay={true}
        preload="metadata"
        src={`//xeno-canto.org/sounds/uploaded/${sound?.uploadId}/${sound["file-name"]}`}
      ></audio>
      <button className={styles.speaker} onClick={handleMuteUnmute}>
        {(isMuted && <SpeakerX size={32} weight="thin" />) || (
          <SpeakerHigh size={32} weight="thin" />
        )}
      </button>
    </div>
  );
};

export default Sound;
