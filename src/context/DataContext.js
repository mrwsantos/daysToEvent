import React, { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

export const DataStorage = ({ children }) => {
  const [eventName, setEventName] = useState("Cabana em Ibiúna - Airbnb");
  const [eventImages, setEventImages] = useState([
    "https://a0.muscache.com/im/pictures/10abb945-6fe1-469e-9b45-69280da4b6ee.jpg?im_w=960",
    "https://a0.muscache.com/im/pictures/de07cce1-7c85-4829-8db9-88d91de03fb6.jpg?im_w=960",
    "https://a0.muscache.com/im/pictures/f9ce385e-6cce-4a62-bab9-983aa46fb5ed.jpg?im_w=960",
  ]);
  const [eventLink, setEventLink] = useState(
    "https://www.airbnb.com/trips/v1/09bf28bd-d9cf-4f43-841d-720f93c1aa5c/ro/RESERVATION_USER_CHECKIN/HM42EYB99Y?c=.pi80.pkdmlyYWxpdHkvc2hhcmVfaXRpbmVyYXJ5&euid=f5d4a217-3386-7ae1-686a-ee0cca75a00d"
  );
  const [eventDate, setEventDate] = useState("2023-09-29T15:00:00.000Z");

  return (
    <DataContext.Provider
      value={{
        eventName,
        setEventName,
        eventImages,
        setEventImages,
        eventLink,
        setEventLink,
        eventDate,
        setEventDate,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
