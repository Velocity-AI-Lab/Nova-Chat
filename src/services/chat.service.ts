import { gemini } from "../config/gemini.";
import { healthSystemPrompt } from "../prompts";
import type { Message } from "../types/message.types";

// Create a Map to store the chat
const conversations = new Map<string, Message[]>();

export const getGeminiChatService = async (
  conversationId: string | undefined,
  message: string,
) => {
  // Step 1 - Check if the conversation id exists or not, if not create new one
  if (!conversationId) {
    conversationId = crypto.randomUUID();
  }
  // Step 2 - if conversation id exist then get the existing chat
  let history = conversations.get(conversationId);
  // Step 3 - if previous chat doesn't exists then create new chat
  if (!history) {
    history = [];
    conversations.set(conversationId, history);
  }
  // Step 4 - add the message to chat like push the chat
  history.push({
    role: "user",
    content: message,
  });
  // Step 5 - convert chat into Gemini format
  const contents = history.map((msg) => ({
    role: msg.role,
    parts: [
      {
        text: msg.content,
      },
    ],
  }));
  // Step 6 - Call Gemini

  const response = await gemini.models.generateContent({
    model: "gemini-3.5-flash",
    contents,
    config: {
      systemInstruction: healthSystemPrompt,
    },
  });

  // Step 7 - Extract the reply from gemini response
  const reply = response.text ?? "";
  // Step 8 - push reply to the chat
  history.push({
    role: "model",
    content: reply,
  });
  // step 9 - return the data
  return {
    conversationId,
    reply,
  };
};
