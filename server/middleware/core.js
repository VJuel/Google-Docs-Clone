export default defineEventHandler((event) => {
  setResponseHeaders(event, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  });

  // Gérer les requêtes OPTIONS en renvoyant une réponse vide
  if (event.method === "OPTIONS") {
    // Gérer les requêtes OPTIONS
    return "";
  }
});
