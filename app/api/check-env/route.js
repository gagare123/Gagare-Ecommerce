export async function GET() {
  return new Response(JSON.stringify({
    hasEvent: !!process.env.INNGEST_EVENT_KEY,
    hasSigning: !!process.env.INNGEST_SIGNING_KEY,
  }), { status: 200 });
}
