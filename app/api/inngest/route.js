export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { serve } from "inngest/next";
import {
  inngest,
  createUserOrder,
  syncUserCreation,
  syncUserUpdation,
  syncUserDeletion,
} from "@/config/inngest";

export const { GET, POST } = serve({
  client: inngest,
  functions: [
    syncUserCreation,
    syncUserUpdation,
    syncUserDeletion,
    createUserOrder,
  ],
});
