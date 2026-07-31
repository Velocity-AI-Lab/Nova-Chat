"use client";

import { ChatInput } from "@/components/chatInput";
import { MessageBubble } from "@/components/messageBubble";
import { Sidebar } from "@/components/sidebar";
import { useConversations } from "@/hooks/useConverstaion";
import { Message } from "@/types/types";
import { useState } from "react";

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
  // states
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [draftMessage, setDraftMessage] = useState<Message | null>(null);

  // Derived Values
  const activeConversation = activeId ? getConversation(activeId) : null;

  // handle select function
  const handleSelect = (conversationId: string) => {
    setActiveId(conversationId);
  };

  // handle new chat function
  const handleNewChat = () => {
    setActiveId(null);
    setIsThinking(false);
    setDraftMessage(null);
  };

  // handle delete conversation function
  const handleDelete = (conversationId: string) => {
    // delete the conersation
    deleteConversation(conversationId);
    // check if the current conversation is active or not
    if (conversationId === activeId) {
      setActiveId(null);
      setIsThinking(false);
      setDraftMessage(null);
    }
  };

  return (
    <>
      <div className="flex h-screen">
        <Sidebar
          conversations={conversations}
          activeId={activeId}
          onSelect={handleSelect}
          onDelete={handleDelete}
          onNewChat={handleNewChat}
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
