import { NextApiRequest, NextApiResponse } from "next";
import webPush from "web-push";
import {
  getRegistrations,
  registrationsFilePath,
  saveRegistrations,
} from "./register";
import moment from "moment";

// const { publicKey, privateKey } = webPush.generateVAPIDKeys();

// webPush.setVapidDetails(
//   process.env.WEB_PUSH_SUBJECT ?? "https://localhost:3000",
//   process.env.WEB_PUSH_PUBLIC_KEY ?? publicKey,
//   process.env.WEB_PUSH_PRIVATE_KEY ?? privateKey
// );

webPush.setVapidDetails(
  process.env.NODE_ENV === "development"
    ? "https://localhost:3000"
    : "https://days-to-event.vercel.app",
  "BKcKYys1FBTmXurs23DWjSM1HiaW0ethg0c5Yl2IqBGvpFe6gkrtFbaLOGn6vQ8Z46h_mxW8pzKjJm-0aAQdwwM",
  "lSkbBZJtG8Jjd2TfBEbHMZ3GZhuaN9m5C8Sh1PE-jA0"
);

interface SendNotificationRequest extends NextApiRequest {
  body: {
    message: string;
  };
}

export default function handler(
  request: SendNotificationRequest,
  response: NextApiResponse
) {
  if (request.method == "POST") {
    const registrations = getRegistrations(registrationsFilePath);

    if (!registrations) {
      return response.status(404).json({
        message: "file not found",
      });
    }

    const catchRegistrations: string[] = [];

    const sendResult = registrations.map(async (subscription) => {
      try {
        const todayDate = moment();
        const eventDate = moment("2023-09-29T15:00:00.000Z");
        const daysLeft = eventDate.diff(todayDate, "days").toString();

        if (daysLeft === "0" || daysLeft === "-1") {
          return;
        }

        let message = "";

        switch (daysLeft) {
          case "2":
            message = `Já fez as malas? Faltam apenas ${daysLeft} dias para sua viagem.`;
            break;
          case "-2":
            message =
              "O que achou da estadia? Espero que todos tenham gostado!";
            break;
          default:
            message = `Faltam ${daysLeft} dias para sua viagem.`;
        }

        if (request.body.message) {
          message = request.body.message;
        }

        const { statusCode } = await webPush.sendNotification(
          subscription,
          message
        );

        response.statusCode = statusCode;
      } catch (err: any) {
        console.error(err);
        if ("statusCode" in err && "endpoint" in err) {
          if (err.statusCode === 410) {
            catchRegistrations.push(err.endpoint);
          }
        } else {
          console.error("err", err);
          response.statusCode = 500;
          response.end();
        }
      }
    });

    (async () => {
      await Promise.all(sendResult);
    })();

    const removeInvalidRegistration = registrations.filter(
      (registration) => !catchRegistrations.includes(registration.endpoint)
    );

    saveRegistrations(registrationsFilePath, removeInvalidRegistration);

    return response.end();
  }
}
