import { google } from "googleapis";

const oauth2Client = new google.auth.OAuth2(
  process.env.YOUR_CLIENT_ID,
  process.env.YOUR_CLIENT_SECRET,
  process.env.YOUR_REDIRECT_URL, // Par exemple, http://localhost:3000/api/auth/callback
);

export default defineEventHandler(async (event) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/drive",
      "https://www.googleapis.com/auth/documents",
    ],
  });

  // Rediriger l'utilisateur vers Google pour l'authentification
  return sendRedirect(event, authUrl);
});
