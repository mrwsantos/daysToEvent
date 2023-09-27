import { NextApiRequest, NextApiResponse } from "next";
import webPush from "web-push";
import moment from "moment-timezone";
import { prisma } from "@/lib/prisma";

const TIME_ZONE = "America/Sao_Paulo";

const { publicKey, privateKey } = webPush.generateVAPIDKeys();

webPush.setVapidDetails(
  process.env.WEB_PUSH_SUBJECT ?? "https://localhost:3000",
  process.env.WEB_PUSH_PUBLIC_KEY ?? publicKey,
  process.env.WEB_PUSH_PRIVATE_KEY ?? privateKey
);

interface SendNotificationRequest extends NextApiRequest {
  body: {
    title: string;
    message: string;
  };
}

export default async function handler(
  request: SendNotificationRequest,
  response: NextApiResponse
) {
  if (request.method !== "POST") {
    return response.status(405).end();
  }
  const registrations = await prisma.registrations.findMany();

  if (!registrations) {
    return response.status(400).json({
      message: "No registrations found.",
    });
  }

  const catchRegistrations: string[] = [];

  const todayDate = moment.tz(TIME_ZONE).get("day");
  const eventDate = moment.tz("2023-09-29T15:00:00.000Z", TIME_ZONE).get("day");
  const daysLeft = eventDate - todayDate;

  let title = "Tá chegando a horaaa";
  let message = "";

  const sendResultPromises = registrations.map(async (registration) => {
    const { endpoint, p256dh, auth } = registration;

    const subscription: any = {
      endpoint: endpoint,
      keys: {
        p256dh,
        auth,
      },
    };

    if (daysLeft === 0 || daysLeft === -1) {
      return;
    }

    switch (daysLeft) {
      case 2:
        message = `Já fez as malas? Faltam apenas ${daysLeft} dias para sua viagem.`;
        break;
      case -2:
        message = "O que achou da estadia? Espero que todos tenham gostado!";
        break;
      default:
        message = `Faltam ${daysLeft} dias para sua viagem.`;
    }

    if (request.body.message) {
      message = request.body.message;
    }

    if (request.body.title) {
      title = request.body.title;
    }

    const data = JSON.stringify({
      title,
      message,
    });

    try {
      const { statusCode } = await webPush.sendNotification(subscription, data);
      response.statusCode = statusCode;
      return subscription;
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
      return subscription;
    }
  });

  const subscriptions = await Promise.all(sendResultPromises);

  catchRegistrations.forEach(async (endpoint) => {
    await prisma.registrations.delete({
      where: {
        endpoint,
      },
    });
  });

  return response.json({
    subscriptions,
  });
}
