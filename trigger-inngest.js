import dotenv from "dotenv";
import { Inngest } from "inngest";

dotenv.config();

const EVENT_KEY = process.env.INNGEST_EVENT_KEY;

if (!EVENT_KEY) {
  console.error("❌ Missing INNGEST_EVENT_KEY in .env");
  process.exit(1);
}

// Detect common mistake: Signing Key instead of Event Key
if (EVENT_KEY.includes("sk_") || EVENT_KEY.length > 150) {
  console.warn("⚠️ This looks like a SIGNING key, not an EVENT key.");
  console.warn("⚠️ Go to Inngest → Project → Settings → API Keys → Event Key");
}

const inngest = new Inngest({
  id: "quickcart-app",
  eventKey: EVENT_KEY,
});

async function triggerEvent() {
  try {
    const res = await inngest.send({
      name: "test-event",
      data: {
        foo: "bar",
        timestamp: new Date().toISOString(),
      },
    });

    console.log("✅ Event sent successfully:");
    console.log(res);
  } catch (error) {
    console.error("❌ Error sending event:");
    console.error(error.message || error);
  }
}

triggerEvent();
