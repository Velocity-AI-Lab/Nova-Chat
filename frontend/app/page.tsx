"use client";

import { ChatInput } from "@/components/chatInput";
import { MessageBubble } from "@/components/messageBubble";
import { Sidebar } from "@/components/sidebar";
import { useConversations } from "@/hooks/useConverstaion";

export default function Home() {
  // get the useConversation hook
  const {
    conversations,
    loader,
    createConversation,
    getConversation,
    deleteConversation,
    updateConversation,
  } = useConversations();

  return (
    <>
      <div className="flex h-screen">
        <Sidebar
          conversations={[]}
          activeId={null}
          onSelect={() => {}}
          onDelete={() => {}}
          onNewChat={() => {}}
        />

        <main className="flex-1 flex flex-col">
          <div className="flex-1 flex items-center justify-center overflow-y-auto thin-scroll px-4 py-6">
            <div className=" text-center">
              <h2 className="font-spaceGrotesk text-3xl text-foreground">
                What&apos;s on your mind today?
              </h2>
              <p className="mt-1 text-sm text-ink-soft font-inter">
                Training, nutrition, recovery — ask away.
              </p>
            </div>
          </div>

          <div className="mx-auto w-full">
            <ChatInput onSend={() => {}} disabled={false} />
          </div>
        </main>
      </div>
    </>
  );
}
