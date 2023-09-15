import React, { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

export const DataStorage = ({ children }) => {
  const [eventName, setEventName] = useState("Loft of the Eye - Airbnb");
  const [eventImages, setEventImages] = useState([
    "https://a0.muscache.com/im/pictures/10abb945-6fe1-469e-9b45-69280da4b6ee.jpg?im_w=1440",
    "https://a0.muscache.com/im/pictures/de07cce1-7c85-4829-8db9-88d91de03fb6.jpg?im_w=1440",
    "https://a0.muscache.com/im/pictures/5f8798e5-af53-4a0e-84e0-5eeaf799f5d1.jpg?im_w=1440",
    "https://a0.muscache.com/im/pictures/de07cce1-7c85-4829-8db9-88d91de03fb6.jpg?im_w=1440",
    "https://a0.muscache.com/im/pictures/9e6593a4-1dd2-4f0c-92df-3dfa8f821821.jpg?im_w=1440",
    "https://a0.muscache.com/im/pictures/165f3827-9bdd-4dc2-99f0-eb67aa3cf4b2.jpg?im_w=1440",
    "https://a0.muscache.com/im/pictures/eed75d0a-cc21-435b-b171-32f1fa8ffc24.jpg?im_w=1440",
    "https://a0.muscache.com/im/pictures/a0941354-1716-4e62-9ad0-0d4eba4be357.jpg?im_w=1440",
    "https://a0.muscache.com/im/pictures/b47657ce-bd37-434c-885e-af9d7a2246ed.jpg?im_w=1440",
    "https://a0.muscache.com/im/pictures/32ce7bea-090e-4b3d-bd17-fbd5ab7e879c.jpg?im_w=1440",
    "https://a0.muscache.com/im/pictures/333f85df-f538-4ae7-8726-47bff6d445e7.jpg?im_w=1440",
    "https://a0.muscache.com/im/pictures/a5633203-f7ae-4219-aa8a-0272c0ddbb07.jpg?im_w=1440",
    "https://a0.muscache.com/im/pictures/f7a6a64f-baea-4de5-816e-2fd10cd32e04.jpg?im_w=1440",
    "https://a0.muscache.com/im/pictures/902e84cb-9632-4245-bbbb-2a51f25b0b63.jpg?im_w=1440"
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
