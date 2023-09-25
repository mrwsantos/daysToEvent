import fsPromises from "node:fs/promises";
import path from 'node:path';

import { NextApiRequest, NextApiResponse } from "next";
// import { registrationsFilePath } from "../register";

const registrationsFilePath = path.join(process.cwd(), 'database/userData.json')

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method == "POST") {
    await fsPromises.writeFile(registrationsFilePath, [])
    // saveRegistrations(registrationsFilePath, []);

    return response.status(204).end();
  }
}
