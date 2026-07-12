import { gemini } from "../config/gemini.";
import { healthSystemPrompt } from "../prompts";
import { behaviorPrompt } from "../prompts/behaviour.prompt";
import { communicationPrompt } from "../prompts/communication.prompt";
import { formattingPrompt } from "../prompts/formatting.prompt";
import { identityPrompt } from "../prompts/identity.prompt";
import { limitationsPrompt } from "../prompts/limitations.prompt";
import { medicalSafetyPrompt } from "../prompts/medicalSafety.prompt";
import { memoryPrompt } from "../prompts/memory.prompt";
import { mensHealthPrompt } from "../prompts/mensHealth.prompt";
import { missionPrompt } from "../prompts/mission.prompt";
import { nutritionPrompt } from "../prompts/nutrition.prompt";
import { reasoningPrompt } from "../prompts/reasoning.prompt";
import { recoveryPrompt } from "../prompts/recovery.prompt";
import { sexualHealthPrompt } from "../prompts/sexualHealth.prompt";
import { supplementsPrompt } from "../prompts/supplements.prompt";
import { womensHealthPrompt } from "../prompts/womensHealth.prompt";
import { workoutPrompt } from "../prompts/workout.prompt";
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

  console.log("History Message:", history.length);

  // console.log("identity", identityPrompt.length);
  // console.log("behavior", behaviorPrompt.length);
  // console.log("medicalSafety", medicalSafetyPrompt.length);
  // console.log("memory", memoryPrompt.length);
  // console.log("mensHealth", mensHealthPrompt.length);
  // console.log("mission", missionPrompt.length);
  // console.log("nutrition", nutritionPrompt.length);
  // console.log("reasoning", reasoningPrompt.length);
  // console.log("recovery", recoveryPrompt.length);
  // console.log("sexualHealth", sexualHealthPrompt.length);
  // console.log("supplements", supplementsPrompt.length);
  // console.log("womensHealth", womensHealthPrompt.length);
  // console.log("workout", workoutPrompt.length);
  // console.log("communication", communicationPrompt.length);
  // console.log("formatting", formattingPrompt.length);
  // console.log("limitations", limitationsPrompt.length);
  console.time("Gemini");

  const payload = JSON.stringify(contents);

  console.log("Contents:", contents.length);
  console.log("Payload Size:", payload.length);
  console.log("System Prompt:", healthSystemPrompt.length);

  const response = await gemini.models.generateContent({
    model: "gemini-3.5-flash",
    contents,
    config: {
      systemInstruction: healthSystemPrompt,
    },
  });

  console.timeEnd("Gemini");
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
