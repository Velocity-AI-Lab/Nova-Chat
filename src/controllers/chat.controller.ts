import type { Request, Response } from "express";
import { asyncHandler } from "../utils/aysynchandler";
import { getGeminiChatService } from "../services/chat.service";
import { ApiResponse } from "../utils/apiResponse";

export const getGeminiChat = asyncHandler(
  async (req: Request, res: Response) => {
    // get the conversation Id and message from user
    const { conversationId, content } = req.body;
    // check if both exists or not, if not throw error
    if (!conversationId) {
      return res.status(400).json({
        error: "Conversation Id is required",
      });
    }
    if (!content) {
      return res.status(400).json({
        error: "Content is required",
      });
    }
    // call the service
    const geminiResponse = await getGeminiChatService(conversationId, content);
    // give back the response to the client
    res
      .status(200)
      .json(new ApiResponse(200, "Chat fetched successfully", geminiResponse));
  },
);
