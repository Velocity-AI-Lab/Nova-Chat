// "use client";

// import { Conversation } from "@/types/types";
// import { PanelLeft, Trash2 } from "lucide-react";
// import { useState } from "react";

// export const Sidebar = ({
//   conversations,
//   activeId,
//   onSelect,
//   onDelete,
//   onNewChat,
// }: {
//   conversations: Conversation[];
//   activeId: string | null;
//   onSelect: (conversationId: string) => void;
//   onDelete: (conversationId: string) => void;
//   onNewChat: () => void;
// }) => {
//   // adding a state for sidebar opening and closing functionality
//   const [isOpen, setIsOpen] = useState<boolean>(false);

//   return (
//     <>
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className=" fixed top-4 left-4 z-30 flex h-9 w-9 items-center justify-center rounded-lg bg-surface border border-line text-foreground"
//         aria-label="Toggle sidebar"
//       >
//         <PanelLeft size={20} strokeWidth={1} />
//       </button>

//       <aside
//         className={`max-w-2xl h-screen fixed md:static top-0 left-0 z-50 w-72 flex flex-col bg-surface-sunken border-r border-line transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
//       >
//         {/* logo */}
//         <div className="flex items-center justify-between px-4 pt-5 pb-3">
//           <span className="font-display text-3xl font-medium">Nova</span>
//         </div>
//         {/* recent chats */}
//         <nav className="flex-1 overflow-y-auto thin-scroll px-3 pb-4">
//           <p className="px-2.5 pb-1.5 text-xs font-medium uppercase tracking-wide text-ink-soft">
//             Recent
//           </p>
//           {/* list all the conversations */}
//           <ul>
//             {conversations.map((convo) => (
//               <li className="group relative" key={convo.id}>
//                 {/* Single conversation active tab */}
//                 <button
//                   onClick={() => onSelect}
//                   className={`w-full truncate rounded-md px-2.5 py-2 text-left text-sm transition-colors ${convo.id === activeId ? "bg-moss/20 text-foreground font-medium" : "text-ink-soft hover:bg-moss/10 hover:text-foreground"}`}
//                 >
//                   {convo.title || "New Conversation"}
//                 </button>
//                 {/* delete button for single conversation */}
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation(); // This cancels the behaiviour of delete and select the conversation at the same time
//                     onDelete(convo.id);
//                   }}
//                   aria-label="Delete conversation"
//                   className="absolute right-1.5 top-1.5 hidden rounded px-1.5 py-0.5 text-xs text-ink-soft hover:text-coral group-hover:block"
//                 >
//                   <Trash2 strokeWidth={1} />
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </nav>
//       </aside>
//     </>
//   );
// };

// "use client";

// import { Conversation } from "@/types/types";
// import { useState } from "react";
// import { PanelLeft, Plus, Trash2 } from "lucide-react";

// export const Sidebar = ({
//   conversations,
//   activeId,
//   onSelect,
//   onDelete,
//   onNewChat,
// }: {
//   conversations: Conversation[];
//   activeId: string | null;
//   onSelect: (conversationId: string) => void;
//   onDelete: (conversationId: string) => void;
//   onNewChat: () => void;
// }) => {
//   // isOpen means: expanded on desktop, visible-as-overlay on mobile
//   const [isOpen, setIsOpen] = useState<boolean>(false);

//   return (
//     <>
//       {/* mobile-only trigger — shows when the sidebar is closed, to open it */}
//       {!isOpen && (
//         <button
//           onClick={() => setIsOpen(true)}
//           className="md:hidden fixed top-4 left-4 z-30 flex h-9 w-9 items-center justify-center rounded-lg bg-surface border border-line text-foreground"
//           aria-label="Open sidebar"
//         >
//           <PanelLeft size={20} />
//         </button>
//       )}

//       {/* mobile backdrop — only relevant when open on mobile */}
//       <div
//         className={`fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity ${
//           isOpen
//             ? "opacity-100 pointer-events-auto"
//             : "opacity-0 pointer-events-none"
//         }`}
//         onClick={() => setIsOpen(false)}
//       />

//       {/* sidebar itself — mobile: slides fully off-screen when closed
//           desktop: stays in place, but collapses to a narrow icon strip when closed */}
//       <aside
//         className={`fixed md:static top-0 left-0 z-40 h-screen flex flex-col bg-surface-sunken border-r border-line
//         transition-all duration-300
//         ${isOpen ? "translate-x-0 w-72" : "-translate-x-full w-72 md:w-16 md:translate-x-0"}`}
//       >
//         {/* header row — toggle + new chat, icons always visible, text only when expanded */}
//         <div className="flex items-center gap-2 px-3 pt-5 pb-3">
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             aria-label="Toggle sidebar"
//             className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-foreground hover:bg-moss/10"
//           >
//             <PanelLeft size={18} />
//           </button>
//           {isOpen && (
//             <span className="font-display text-base font-medium text-foreground">
//               Nova
//             </span>
//           )}
//         </div>

//         <div className="px-3 pb-3">
//           <button
//             onClick={onNewChat}
//             aria-label="New chat"
//             className={`flex items-center gap-2 rounded-lg bg-moss/20 backdrop-blur-md border border-moss/40 text-foreground hover:bg-moss/30 transition-colors ${
//               isOpen
//                 ? "w-full px-3 py-2.5 text-sm font-medium"
//                 : "h-8 w-8 justify-center"
//             }`}
//           >
//             <Plus size={16} />
//             {isOpen && "New chat"}
//           </button>
//         </div>

//         {/* recent conversations — only shown when expanded */}
//         {isOpen && (
//           <nav className="flex-1 overflow-y-auto thin-scroll px-3 pb-4">
//             <p className="px-2.5 pb-1.5 text-xs font-medium uppercase tracking-wide text-ink-soft">
//               Recent
//             </p>

//             {conversations.length === 0 && (
//               <p className="px-1 pt-2 text-sm text-ink-soft">
//                 No conversations yet.
//               </p>
//             )}

//             <ul className="space-y-0.5">
//               {conversations.map((convo) => (
//                 <li key={convo.id} className="group relative">
//                   <button
//                     onClick={() => onSelect(convo.id)}
//                     className={`w-full truncate rounded-md px-2.5 py-2 text-left text-sm transition-colors ${
//                       convo.id === activeId
//                         ? "bg-moss/20 text-foreground font-medium"
//                         : "text-ink-soft hover:bg-moss/10 hover:text-foreground"
//                     }`}
//                   >
//                     {convo.title || "New conversation"}
//                   </button>
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       onDelete(convo.id);
//                     }}
//                     aria-label="Delete conversation"
//                     className="absolute right-1.5 top-1.5 hidden rounded px-1.5 py-0.5 text-xs text-ink-soft hover:text-coral group-hover:block"
//                   >
//                     <Trash2 strokeWidth={1} />
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </nav>
//         )}
//       </aside>
//     </>
//   );
// };

// -------------- New Code ---------------
"use client";

import { Conversation } from "@/types/types";
import { PanelLeft, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

// components with props both functional and data props and it types
export const Sidebar = ({
  conversations,
  activeId,
  onSelect,
  onDelete,
  onNewChat,
}: {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (conversationId: string) => void;
  onDelete: (conversationId: string) => void;
  onNewChat: () => void;
}) => {
  // Add th functionality that the sidebar can open and close for mobile devices
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // check if the screen width of mobile or desktop
  useEffect(() => {
    // get the window width if in desktop
    const isDesktop = window.innerWidth > 768;

    // check if the window size is of desktop then set the isOpen to true
    if (isDesktop) {
      setIsOpen(true);
    }
  }, []);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 z-40 h-screen flex flex-col bg-surface-sunken border-r border-line transition-all duration-300 ${isOpen ? "translate-x-0 w-72" : "-translate-x-full w-72 md:w-16 md:translate-x-0"}`}
      >
        <div className="flex items-center justify-between mt-7 mx-4">
          {isOpen && (
            <Link
              href={"/"}
              className="font-bitCount text-3xl hover:text-coral transition-all duration-200 ease-in-out"
            >
              Nova
            </Link>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="transition-all duration-100 hover:cursor-pointer hover:bg-moss/20 p-2 rounded-lg"
          >
            <PanelLeft size={18} strokeWidth={1} />
          </button>
        </div>

        {/* New Chat */}

        <div
          className={`flex items-center justify-center gap-3 mt-4 py-1.5 cursor-pointer border-moss/60 border mx-auto rounded-lg bg-moss/10 transition-all duration-200 ease-in-out hover:bg-moss/20 ${isOpen ? "px-16" : "px-2"}`}
        >
          <button onClick={onNewChat} className="cursor-pointer">
            <Plus size={18} strokeWidth={1} />
          </button>
          {isOpen && (
            <span className="font-spaceGrotesk text-md">New Chat</span>
          )}
        </div>

        {/* Recent Conversations */}
        {isOpen && (
          <nav className="mt-6 ">
            <p className="mx-4 pb-1.5 text-xs font-spaceGrotesk uppercase tracking-wide text-ink-soft">
              Recent
            </p>

            {conversations.length === 0 && (
              <p className="mx-4 pt-2 text-sm text-ink-soft">
                No conversations yet.
              </p>
            )}

            {/* All Conversations */}
            <ul className="space-y-2 mx-4">
              {conversations?.map((convo) => (
                <li
                  key={convo?.id}
                  className={`group flex items-center px-2.5 py-1.5 justify-between cursor-pointer ${
                    convo.id === activeId
                      ? "bg-moss/10 text-foreground font-spaceGrotesk border border-moss/30 rounded-lg"
                      : "text-ink-soft hover:bg-moss/5 hover:text-foreground rounded-lg "
                  }`}
                >
                  <span
                    onClick={() => onSelect(convo?.id)}
                    className="truncate font-spaceGrotesk text-sm transition-all duration-150"
                  >
                    {convo?.title || "New Conversation"}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(convo.id);
                    }}
                    className="transition-all duration-150 ease-in-out hidden text-xs text-ink-soft hover:text-coral group-hover:inline-block cursor-pointer"
                  >
                    <Trash2 size={18} strokeWidth={1} />
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </aside>

      {/* mobile-only trigger — shows when the sidebar is closed, to open it */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden fixed top-4 left-4 z-30 flex h-9 w-9 items-center justify-center rounded-lg bg-surface border border-line text-foreground"
          aria-label="Open sidebar"
        >
          <PanelLeft size={18} strokeWidth={1} />
        </button>
      )}
      {/* mobile backdrop — only relevant when open on mobile */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />
    </>
  );
};
