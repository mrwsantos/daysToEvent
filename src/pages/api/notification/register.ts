import fs, { PathOrFileDescriptor } from "node:fs";
import path from "node:path";
import { NextApiRequest, NextApiResponse } from "next";
import { PushSubscription } from "web-push";

interface SendNotificationRequest extends NextApiRequest {
  body: {
    subscription: PushSubscription;
  };
}

const fileName =
  process.env.NODE_ENV === "development"
    ? "registrations.dev.json"
    : "registrations.json";

export const registrationsFilePath = path.resolve("src", "database", fileName);

export function getRegistrations(
  registrationsFilePath: PathOrFileDescriptor
): PushSubscription[] | void {
  try {
    const data = fs.readFileSync(registrationsFilePath, {
      encoding: "utf-8",
      flag: "r",
    });

    const registrations = JSON.parse(data.toString() || "[]");

    return registrations;
  } catch (error) {
    saveRegistrations(registrationsFilePath, []);
    console.error(error);
  }
}

export function saveRegistrations(
  registrationsFilePath: PathOrFileDescriptor,
  subscription: PushSubscription[] | []
) {
  fs.writeFile(
    registrationsFilePath,
    JSON.stringify(subscription, null, 2),
    (err: NodeJS.ErrnoException | null) => {
      if (err) throw err;
    }
  );
}

export default async function handler(
  request: SendNotificationRequest,
  response: NextApiResponse
) {
  if (request.method == "POST") {
    const { subscription } = request.body;
    const registrations = getRegistrations(registrationsFilePath);

    if (!registrations) {
      return response.status(404).json({
        message: "file not found",
      });
    }

    const subscriptionAlreadyExists = registrations.some(
      (registration) => registration.endpoint === subscription.endpoint
    );

    if (!subscriptionAlreadyExists) {
      saveRegistrations(registrationsFilePath, [
        ...registrations,
        subscription,
      ]);
      return response.status(201).end();
    }

    return response.status(204).end();
  }
}
