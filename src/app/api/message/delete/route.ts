import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";

export  async function DELETE(req: Request) {
  try {
    const { score } = await req.json()

    await pusherServer.trigger('chat_messages', 'chat_event',null)

    await db.zremrangebyscore("chat:messages", score, score);
    return new Response("OK");
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }

    return new Response("Internal Server Error", { status: 500 });
  }
}
