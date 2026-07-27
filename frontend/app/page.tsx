"use client";

import { MessageBubble } from "@/components/messageBubble";
import { ChatInput } from "@/components/chatInput";
import { Sidebar } from "@/components/sidebar";

export default function Home() {
  return (
    <>
      {/* <div className="p-4 space-y-2">
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
      <ChatInput /> */}
      <Sidebar
        conversations={[
          {
            id: "1",
            title: "How to prepare for React interview and become richie rich",
            messages: [],
            updatedAt: Date.now(),
          },
          {
            id: "2",
            title: "Creatine benefits explained",
            messages: [],
            updatedAt: Date.now(),
          },
        ]}
        activeId="1"
        onSelect={(id) => console.log("selected", id)}
        onDelete={(id) => console.log("deleted", id)}
        onNewChat={() => console.log("new chat")}
      />
    </>
  );
}
