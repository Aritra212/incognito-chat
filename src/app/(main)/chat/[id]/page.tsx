import {
  fetchChatsByConversationId,
  getPartnerByConversationId,
} from "@/utils/data-access/chats";
import ChatHeader from "./chat-header";
import { IChatData, IUser } from "@/common/common.interface";
import MessagesWrapper from "./messages-wrapper";
import MessageCard from "./message-card";
import SendMessage from "./send-message";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function ChatRoom({ params }: PageProps) {
  const { id } = await params;

  const [chatResult, partnerResult] = await Promise.all([
    fetchChatsByConversationId(id),
    getPartnerByConversationId(id),
  ]);

  // Handle potential errors from the data fetching
  if ("error" in chatResult) {
    return <div>Error loading chat messages: {chatResult.error}</div>;
  }

  if ("error" in partnerResult) {
    return <div>Error loading chat partner: {partnerResult.error}</div>;
  }

  return (
    <div className="pr-6">
      <div className="sticky top-0 z-20 pb-2 bg-gradient-to-b from-input/5 to-transparent backdrop-blur-3xl rounded-2xl">
        <ChatHeader partner={partnerResult.partner as unknown as IUser} />
      </div>
      <MessagesWrapper
        data={chatResult.data}
        className="space-y-10 mx-auto pb-28 min-h-[74vh]"
      >
        {(chatResult.data as unknown as IChatData[]).map((message) => (
          <MessageCard
            key={message.chat_id}
            chatData={message}
            isCurrentUser={
              message.sender_id.user_id !==
              (partnerResult.partner as unknown as IUser).user_id
            }
          />
        ))}
      </MessagesWrapper>
      <SendMessage conv_id={id} />
    </div>
  );
}
