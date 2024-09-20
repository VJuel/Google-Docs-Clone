// server/api/googleDocs.js
import { google } from "googleapis";
import { parseCookies } from "h3";

export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event);
  const accessToken = cookies.auth_token;

  if (!accessToken) {
    throw createError({ statusCode: 401, message: "Non authentifié" });
  }

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: accessToken });

  const docs = google.docs({ version: "v1", auth: oauth2Client });

  const response = await docs.documents.create({
    requestBody: {
      title: "Mon Nouveau Document",
    },
  });

  return { documentId: response.data.documentId };
});
