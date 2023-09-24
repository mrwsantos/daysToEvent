import React, { MouseEvent, useEffect, useState } from "react";
import { Modal } from "./Modal";

import styles from "../styles/components/NotificationModal.module.scss";
import { Bell, CircleNotch } from "@phosphor-icons/react";
import axios from "axios";

const base64ToUint8Array = (base64: string) => {
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const b64 = (base64 + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(b64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

async function askNotificationPermission() {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    console.log("This browser does not support notifications.");
  } else {
    return await Notification.requestPermission();
  }
}

export function NotificationModal() {
  const [shouldAskPermission, setShouldAskPermission] = useState(false);
  const [loading, setloading] = useState(false);

  const [registration, setRegistration] =
    useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    // if (typeof window !== "undefined" && "serviceWorker" in navigator) {
    //   navigator.serviceWorker.ready.then(async (registration) => {
    //     const subscription = await registration.pushManager.getSubscription();
    //     const { permission } = Notification;

    //     if (!subscription && permission !== "denied") {
    //       setShouldAskPermission(true);
    //     }

    //     setRegistration(registration);
    //   });
    // }
  }, []);

  async function subscribeButtonOnClick(
    event: MouseEvent<HTMLButtonElement>
  ): Promise<void> {
    event.preventDefault();
    setloading(true);

    if (registration === null) {
      console.error("web push not subscribed");
      return;
    }

    const permission = await askNotificationPermission();

    if (permission === "denied") {
      setloading(false);
      closeModal();
      return;
    }

    try {
      const {
        data: { publicKey },
      } = await axios.get("/api/notification/public_key");

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: base64ToUint8Array(publicKey),
      });

      await axios.post("/api/notification/register", {
        subscription,
      });

      setloading(false);
      closeModal();
    } catch (err) {
      setloading(false);
      console.error(`subscription failed: ${err}`);
    }
  }

  function closeModal() {
    setShouldAskPermission(false);
  }

  return (
    <Modal isOpen={false} portalClassName={styles.wrapper}>
      <div className={styles.content}>
        <Bell size={32} color="#333333" />
        <h2 className={styles.title}>Notificações</h2>
        <p className={styles.description}>
          Precisamos da sua permissão para enviar notificações
        </p>
        <button className={styles.button} onClick={subscribeButtonOnClick}>
          {(loading && (
            <CircleNotch size={22} color="#ffffff">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                dur="1s"
                from="0 0 0"
                to="360 0 0"
                repeatCount="indefinite"
              ></animateTransform>
            </CircleNotch>
          )) ||
            "Permitir"}
        </button>
      </div>
    </Modal>
  );
}
