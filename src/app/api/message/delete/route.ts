import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";

export  async function DELETE(req: Request) {
  try {
    const { score }:{ score:number } = await req.json();

    const data = {
        score
    }

    await pusherServer.trigger('chat_messages', 'delete_chat',data)

    await db.zrem("chat_messages",score);
    return new Response("OK");
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }

    return new Response("Internal Server Error", { status: 500 });
  }
}
