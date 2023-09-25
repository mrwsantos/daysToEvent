import { NextApiRequest, NextApiResponse } from "next";
import webPush from "web-push";

const { publicKey, privateKey } = webPush.generateVAPIDKeys();

webPush.setVapidDetails(
  process.env.WEB_PUSH_SUBJECT ?? "https://localhost:3000",
  process.env.WEB_PUSH_PUBLIC_KEY ?? publicKey,
  process.env.WEB_PUSH_PRIVATE_KEY ?? privateKey
);

type ResponseData = {
  publicKey: string;
};

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse<ResponseData>
) {
  if (request.method !== "GET") {
    return response.status(405).end();
  }

  return response.status(200).json({
    publicKey: process.env.WEB_PUSH_PUBLIC_KEY ?? publicKey,
  });
}
