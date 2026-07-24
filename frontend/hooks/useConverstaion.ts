"use client";

import { Conversation } from "@/types/types";

import { useState, useEffect } from "react";

// define storage key for consistent key
const STORAGE_KEY = "nova-conversations";

export const useConversations = () => {
  // store the conversation in a state
  const [conversation, setConversation] = useState<Conversation[]>([]);
  // set loading state while fetching the data
  const [loader, setLoader] = useState<boolean>(false);

  // on first mount, check localStorage for any conversations saved from a previous session
  useEffect(() => {
    // load the previous convesations
    const rawData = localStorage.getItem(STORAGE_KEY);
    // check if the prevoius conversation exists or not, if yes then set the conversation in state
    if (rawData) {
      try {
        setConversation(JSON.parse(rawData));
      } catch {
        setConversation([]);
      }
    }
    setLoader(true);
  }, []);

  // Helper function to update the state and local storage
  const persist = (updated: Conversation[]) => {
    // update the react state with new conversation
    setConversation(updated);
    // update the local storage with new conversation
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  // Now CRUD operation -
  // Get conversation -
  const getConversation = (conversationId: string) => {
    return conversation.find((convo) => convo.id === conversationId);
  };

  // Create a new conversation
  const createConversation = (
    conversationId: string,
    userMessage: string,
    reply: string,
  ) => {
    // create the new conversation
    const newConversation: Conversation = {
      id: conversationId,
      messages: [
        {
          role: "user",
          content: userMessage,
        },
        {
          role: "model",
          content: reply,
        },
      ],
      title: userMessage.slice(0, 40),
      updatedAt: Date.now(),
    };
    persist([newConversation, ...conversation]);
  };

  // Update Conversation
  const updateConversation = (
    // get the params
    conversationId: string,
    userMessage: string,
    reply: string,
  ) => {
    // get all the conversation through converasation id
    const result = conversation.map((convo) => {
      // if the conversation id matches with current conversation id then append the new message of both user and model
      if (convo.id === conversationId) {
        return {
          ...convo,
          messages: [
            // spread old messages from convo
            ...convo.messages,
            { role: "user", content: userMessage },
            { role: "model", content: reply },
          ],
          updatedAt: Date.now(),
        } as Conversation;
      } else {
        // if not then return as it is conversation, dont change anything
        return convo;
      }
      // after that update the state and local storage
    });
    persist(result);
  };

  // Delete Conversation
  const deleteConversation = (conversationId: string) => {
    // filter that chat with matching conversation id
    const filtered = conversation.filter(
      (convo) => convo.id !== conversationId,
    );
    // update the state and local storage
    persist(filtered);
  };

  // Now return the conversation but in descending order
  return {
    conversations: [...conversation].sort((a, b) => b.updatedAt - a.updatedAt),
    loader,
    getConversation,
    createConversation,
    updateConversation,
    deleteConversation,
  };
};
