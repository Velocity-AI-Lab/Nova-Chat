import { corePrompt } from "./core.prompt";
import { mensHealthPrompt } from "./domain/mensHealth.prompt";
import { nutritionPrompt } from "./domain/nutrition.prompt";
import { recoveryPrompt } from "./domain/recovery.prompt";
import { sexualHealthPrompt } from "./domain/sexualHealth.prompt";
import { supplementsPrompt } from "./domain/supplements.prompt";
import { womensHealthPrompt } from "./domain/womensHealth.prompt";
import { workoutPrompt } from "./domain/workout.prompt";

export const getSystemPrompt = (message: string) => {
  const text = message.toLowerCase();

  let prompt = corePrompt;

  if (
    text.includes("diet") ||
    text.includes("nutrition") ||
    text.includes("protein") ||
    text.includes("calories")
  ) {
    prompt += nutritionPrompt;
  }

  if (
    text.includes("workout") ||
    text.includes("excercise") ||
    text.includes("gym")
  ) {
    prompt += workoutPrompt;
  }

  if (
    text.includes("recovery") ||
    text.includes("sleep") ||
    text.includes("rest")
  ) {
    prompt += recoveryPrompt;
  }

  if (
    text.includes("creatine") ||
    text.includes("whey") ||
    text.includes("supplemenets")
  ) {
    prompt += supplementsPrompt;
  }
  if (
    text.includes("testosterone") ||
    text.includes("prostate") ||
    text.includes("penis")
  ) {
    prompt += mensHealthPrompt;
  }

  if (
    text.includes("pcos") ||
    text.includes("pregnancy") ||
    text.includes("menopause") ||
    text.includes("period")
  ) {
    prompt += womensHealthPrompt;
  }

  if (
    text.includes("sex") ||
    text.includes("libido") ||
    text.includes("sti") ||
    text.includes("ejaculation") ||
    text.includes("mastrubation") ||
    text.includes("premature ejaculation") ||
    text.includes("contraception")
  ) {
    prompt += sexualHealthPrompt;
  }

  return prompt;
};
