export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { serve } from "inngest/next";
import { cxreateUserOder, inngest } from "@/config/inngest";
import {
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
    cxreateUserOder,
  ],
});
