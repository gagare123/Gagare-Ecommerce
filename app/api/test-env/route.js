export const runtime = "nodejs";

export async function GET() {
  return Response.json({
    hasEventKey: !!process.env.INNGEST_EVENT_KEY,
    hasSigningKey: !!process.env.INNGEST_SIGNING_KEY,
  });
}
