import Image from "next/image";
import { MessageBubble } from "@/components/messageBubble";
import { ChatInput } from "@/components/chatInput";

export default function Home() {
  return (
    <>
      <div className="p-4 space-y-2">
        <MessageBubble
          message={{
            role: "user",
            content: "Hey Nova, how much protein do I need?",
          }}
        />
        <MessageBubble
          message={{
            role: "model",
            content:
              "Roughly 1.6–2.2g per kg of bodyweight if you're training regularly.",
          }}
        />
      </div>
      <ChatInput />
    </>
  );
}
