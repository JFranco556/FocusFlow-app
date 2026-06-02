"use client";

import { useState } from "react";
import AddTaskModal from "./AddTaskModal";

interface Props {
  userId: string;
}

export default function FloatingActionButton({ userId }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-[80px] right-margin-mobile w-14 h-14 bg-secondary text-on-secondary rounded-2xl shadow-lg flex items-center justify-center hover:opacity-90 transition-opacity active:scale-90 z-40"
      >
        <span className="material-symbols-outlined text-[28px]">add</span>
      </button>

      {isOpen && (
        <AddTaskModal userId={userId} onClose={() => setIsOpen(false)} />
      )}
    </>
  );
}
