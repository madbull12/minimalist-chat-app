import ChatForm from '@/components/ChatForm'
import Message from '@/components/Message';
import Messages from '@/components/Messages'
import { db } from '@/lib/db'
import { MessageProps } from '@/types';

const getChatMessages = async() => {
  const res = await db.zrange("chat:messages",0,100);
  return res;
}

export default async function Home() {
  const messages = await getChatMessages() as MessageProps[];
  return (
    <main className='p-4 max-w-7xl mx-auto'>
      <Messages>
        {messages.map((message,i)=>(
          <Message key={i} text={message.text} />
        ))}
      </Messages>
      <ChatForm />
    </main>
  )
}
