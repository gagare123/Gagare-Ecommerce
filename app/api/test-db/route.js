// app/api/test-db/route.js
import connectDb from "@/config/db";

export async function GET() {
  try {
    await connectDb();
    return Response.json({ status: "DB Connected" });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
