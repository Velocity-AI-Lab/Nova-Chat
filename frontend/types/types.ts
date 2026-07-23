// Here we define types for role, messages, and conversation

export type Role = "user" | "model";

export type Message = {
  role: Role;
  content: string;
};

export type Conversation = {
  id: string;
  title: string;
  messages: Message[];
  updatedAt: number;
};
