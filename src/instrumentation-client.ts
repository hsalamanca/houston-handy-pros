import { initBotId } from "botid/client/core";

// Paths that attach BotID challenge headers on matching fetch/XHR requests.
// Must match the Route Handlers that call checkBotId().
initBotId({
  protect: [
    { path: "/api/booking", method: "POST" },
    { path: "/api/contact", method: "POST" },
  ],
});
