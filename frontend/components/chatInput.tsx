"use client";

import { useState } from "react";

export const ChatInput = ({
  onSend,
  disabled,
}: {
  onSend: (text: string) => void;
  disabled: boolean;
}) => {
  // decalre the state
  const [prompt, setPrompt] = useState<string>("");

  // write the function onsend to send the actuall prompt text to the gemini
  const submit = () => {
    // first trim the white space
    const trimmedMsg = prompt.trim();
    // check if the message already sent or chatInput is empty
    if (!trimmedMsg || disabled) return;
    // send the message
    onSend(trimmedMsg);
    // set the chatInput empty
    setPrompt("");
  };

  return (
    <>
      <div className=" bg-background px-4 py-3">
        <div className=" mx-auto max-w-4xl flex items-end gap-2 rounded-xl border border-line bg-surface px-3 py-2">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit();
              }
            }}
            placeholder="Ask me anything..."
            rows={3}
            className="min-h-18 max-h-52  flex-1 resize-none bg-transparent py-1.5 text-sm text-foreground outline-none placeholder:text-ink-soft"
            style={{ fieldSizing: "content" }}
          />
          <button
            onClick={submit}
            disabled={disabled || !prompt.trim()}
            aria-label="Send message"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-coral text-white transition-opacity disabled:opacity-30"
          >
            ↑
          </button>
        </div>
        <div></div>
      </div>
    </>
  );
};
