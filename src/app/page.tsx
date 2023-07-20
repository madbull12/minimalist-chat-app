import ChatForm from '@/components/ChatForm'
import Message from '@/components/Message';
import Messages from '@/components/Messages'
import URLPreviewCard from '@/components/URLPreviewCard';
import { db } from '@/lib/db'
import { MessageProps } from '@/types';
import Link from 'next/link';

const getChatMessages = async() => {
  const res = await db.zrange("chat:messages",0,100);
  return res;
}

export default async function Home() {
  const messages = await getChatMessages() as MessageProps[];
  return (
    <main className='p-4 max-w-7xl mx-auto'>
      {/* <Messages>
        {messages.map((message,i)=>{
          const { text } = message;
          const urlRegex = /(https?:\/\/[^\s]+)/g;
          const urls = text.match(urlRegex);
          return (
            <div className="w-auto rounded-lg bg-secondary text-secondary-foreground p-2">
            {text.split(urlRegex).map((text, index) =>
              // Wrap URLs in Link tags
              urls && urls.includes(text) ? (
                <>
                  <Link
                    key={index}
                    className="underline"
                    href={text}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {text}
                  </Link>
                  <URLPreviewCard url={urls[0]} />
                  
                </>
              ) : (
                text
              )
            )}
          </div>
          )
          })}
      </Messages> */}
      <Messages initialMessages={messages} />
      <ChatForm />
    </main>
  )
}
