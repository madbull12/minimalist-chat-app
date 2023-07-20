import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { messageValidator } from "@/lib/validations/message";

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    const messageData = {
        text
    }

    const parsedMessage = messageValidator.parse(messageData);

    const timestamp = Date.now();
      // // notify all connected chat room clients
      await pusherServer.trigger('chat_messages', 'chat_event',parsedMessage)
    await db.zadd(`chat:messages`, {
      score: timestamp,
      member: JSON.stringify(parsedMessage),
    });

    return new Response("OK");
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }

    return new Response("Internal Server Error", { status: 500 });
  }
}
