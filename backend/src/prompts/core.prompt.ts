import { behaviorPrompt } from "./core/behaviour.prompt";
import { communicationPrompt } from "./core/communication.prompt";
import { formattingPrompt } from "./core/formatting.prompt";
import { identityPrompt } from "./core/identity.prompt";
import { medicalSafetyPrompt } from "./core/medicalSafety.prompt";

export const corePrompt = `${behaviorPrompt} ${communicationPrompt} ${formattingPrompt} ${identityPrompt} ${medicalSafetyPrompt}`;
