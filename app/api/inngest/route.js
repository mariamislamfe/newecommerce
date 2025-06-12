import { serve } from "inngest/next";
import { inngest, syncUserCreation, syncUserUpdation, syncUserDeletion } from "@/config/inngest";

// Serve Inngest functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [syncUserCreation, syncUserUpdation, syncUserDeletion],
});
