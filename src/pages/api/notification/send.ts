import { NextApiRequest, NextApiResponse } from "next";
import webPush from "web-push";
import {
  getRegistrations,
  registrationsFilePath,
  saveRegistrations,
} from "./register";
import moment from "moment";

const { publicKey, privateKey } = webPush.generateVAPIDKeys();

webPush.setVapidDetails(
  process.env.WEB_PUSH_SUBJECT ?? "https://localhost:3000",
  process.env.WEB_PUSH_PUBLIC_KEY ?? publicKey,
  process.env.WEB_PUSH_PRIVATE_KEY ?? privateKey
);

export default async function handler(
  request: NextApiRequest,
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

    await Promise.all(sendResult);

    const removeInvalidRegistration = registrations.filter(
      (registration) => !catchRegistrations.includes(registration.endpoint)
    );

    saveRegistrations(registrationsFilePath, removeInvalidRegistration);

    return response.end();
  }
}
