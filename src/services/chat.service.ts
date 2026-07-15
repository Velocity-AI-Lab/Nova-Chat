import { gemini } from "../config/gemini.";
import { getSystemPrompt } from "../prompts/prompt.router";
import type { Message } from "../types/message.types";

// Temporary in-memory conversation store.
// Key = conversationId
// Value = complete chat history for that conversation.
// NOTE: This is only for the MVP. Later this will be replaced by MongoDB.
const conversations = new Map<string, Message[]>();

export const getGeminiChatService = async (
  conversationId: string | undefined,
  message: string,
) => {
  // STEP 1:
  // If this is the user's first message, generate a new conversation ID.
  // Otherwise continue the existing conversation.
  if (!conversationId) {
    conversationId = crypto.randomUUID();
  }

  // STEP 2:
  // Try to retrieve previous chat history for this conversation.
  let history = conversations.get(conversationId);

  // STEP 3:
  // If no history exists, initialize a new conversation.
  if (!history) {
    history = [];
    conversations.set(conversationId, history);
  }

  // STEP 4:
  // Save the user's latest message into the conversation history.
  // This allows Gemini to maintain conversational context.
  history.push({
    role: "user",
    content: message,
  });

  // STEP 5:
  // Convert our internal Message format into Gemini's expected format.
  const contents = history.map((msg) => ({
    role: msg.role,
    parts: [
      {
        text: msg.content,
      },
    ],
  }));

  // STEP 6:
  // Build a dynamic system prompt.
  // The router includes only the prompts relevant to the user's message,
  // reducing prompt size compared to sending every prompt every time.
  const systemPrompt = getSystemPrompt(message);

  // Debug logs for development.
  console.log("History Messages:", history.length);
  console.log("Contents:", contents.length);
  console.log("System Prompt Size:", systemPrompt.length);

  // Measure Gemini response time.
  console.time("Gemini");

  try {
    // STEP 7:
    // Send the conversation and system prompt to Gemini.
    const response = await gemini.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction: systemPrompt,
        httpOptions: {
          timeout: 15000,
          retryOptions: { attempts: 2 },
        },
      },
    });

    console.timeEnd("Gemini");

    // STEP 8:
    // Extract Gemini's reply.
    const reply = response.text ?? "";

    // STEP 9:
    // Store Gemini's response in the conversation history so
    // future requests retain conversational context.
    history.push({
      role: "model",
      content: reply,
    });

    // STEP 10:
    // Return both the conversation ID and the generated reply.
    return {
      conversationId,
      reply,
    };
  } catch (err) {
    console.timeEnd("Gemini");

    console.error("Gemini API error:", err);

    // Return a fallback message instead of exposing internal errors.
    return {
      conversationId,
      reply:
        "I'm having trouble responding right now — please try again in a moment.",
    };
  }
};
