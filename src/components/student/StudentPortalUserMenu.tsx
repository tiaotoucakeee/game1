"use client";

import { useEffect, useRef, useState } from "react";
import { useGame } from "@/lib/game-state";

export function StudentPortalUserMenu({ displayName }: { displayName: string }) {
  const { setStudentLoggedIn } = useGame();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  function handleSwitchAccount() {
    setOpen(false);
    setStudentLoggedIn(false);
    window.location.href = "/student";
  }

  return (
    <div ref={rootRef} className="student-portal__user-menu">
      <button
        type="button"
        className={`student-portal__user${open ? " is-open" : ""}`}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="student-portal__avatar">{displayName.slice(0, 1)}</span>
        <span>{displayName}</span>
      </button>

      {open ? (
        <div className="student-portal__user-dropdown" role="menu">
          <button
            type="button"
            className="student-portal__user-dropdown-item"
            role="menuitem"
            onClick={handleSwitchAccount}
          >
            切换账号
          </button>
        </div>
      ) : null}
    </div>
  );
}
