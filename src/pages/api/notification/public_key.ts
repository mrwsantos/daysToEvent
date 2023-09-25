import { NextApiRequest, NextApiResponse } from "next";
import webPush from "web-push";

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

type ResponseData = {
  publicKey: string;
};

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse<ResponseData>
) {
  if (request.method == "POST") {
    return response.status(200).json({
      publicKey: "BKcKYys1FBTmXurs23DWjSM1HiaW0ethg0c5Yl2IqBGvpFe6gkrtFbaLOGn6vQ8Z46h_mxW8pzKjJm-0aAQdwwM",
    });
  }
}
