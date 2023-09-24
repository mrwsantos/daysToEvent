import { NextApiRequest, NextApiResponse } from "next";
import { registrationsFilePath, saveRegistrations } from "./register";

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method == "POST") {
    saveRegistrations(registrationsFilePath, []);

    response.redirect(302, "/");

    // return response.status(204).end();
  }
}
