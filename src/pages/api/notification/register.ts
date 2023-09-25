import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { PushSubscription } from "web-push";

interface SendNotificationRequest extends NextApiRequest {
  body: {
    subscription: PushSubscription;
  };
}

export default async function handler(
  request: SendNotificationRequest,
  response: NextApiResponse
) {
  if (request.method !== "POST") {
    return response.status(405).end();
  }

  const { subscription } = request.body;

  if (!subscription) {
    return response.status(400)
  }

  const {
    endpoint,
    keys: { p256dh, auth },
  } = subscription;

  const registrationAlreadyExists = await prisma.registrations.findUnique({
    where: {
      endpoint,
    },
  });

  if (registrationAlreadyExists) {
    return response.status(400).json({
      message: 'Registration already exists.'
    })
  }

  const registration = await prisma.registrations.create({
    data: {
      endpoint,
      p256dh,
      auth,
    },
  });

  return response.status(201).json(registration);
}
