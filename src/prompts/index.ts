import { isComputedPropertyName } from "typescript";
import { behaviorPrompt } from "./behaviour.prompt";
import { identityPrompt } from "./identity.prompt";
import { medicalSafetyPrompt } from "./medicalSafety.prompt";
import { memoryPrompt } from "./memory.prompt";
import { mensHealthPrompt } from "./mensHealth.prompt";
import { missionPrompt } from "./mission.prompt";
import { nutritionPrompt } from "./nutrition.prompt";
import { reasoningPrompt } from "./reasoning.prompt";
import { recoveryPrompt } from "./recovery.prompt";
import { sexualHealthPrompt } from "./sexualHealth.prompt";
import { supplementsPrompt } from "./supplements.prompt";
import { womensHealthPrompt } from "./womensHealth.prompt";
import { workoutPrompt } from "./workout.prompt";
import { communicationPrompt } from "./communication.prompt";
import { formattingPrompt } from "./formatting.prompt";
import { limitationsPrompt } from "./limitations.prompt";

export const healthSystemPrompt = `${identityPrompt} ${missionPrompt} ${behaviorPrompt} ${memoryPrompt} ${reasoningPrompt} ${nutritionPrompt} ${workoutPrompt} ${recoveryPrompt} ${supplementsPrompt} ${sexualHealthPrompt} ${mensHealthPrompt} ${womensHealthPrompt} ${medicalSafetyPrompt} ${communicationPrompt} ${formattingPrompt} ${limitationsPrompt}`;
