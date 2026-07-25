import { Message } from "@/types/types";

export const MessageBubble = ({ message }: { message: Message }) => {
  // check if the message comming is from user or model
  const isUser = message.role === "user";

  return (
    <>
      {/* make a container */}
      <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
        {/* actuall message box */}
        <div
          className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
            isUser
              ? "bg-moss/20 backdrop-blur-md border border-moss/40 text-foreground rounded-br-sm"
              : "bg-surface text-ink border border-line rounded-bl-sm"
          }`}
        >
          {message.content}
        </div>
      </div>
    </>
  );
};
