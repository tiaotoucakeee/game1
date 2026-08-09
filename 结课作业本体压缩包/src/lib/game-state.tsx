"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ClueId, EndingId, GameState, GraduateVerifyStatus, VerificationLine, VerificationStatus } from "@/types/game";
import { CLUE_TO_LINE, resolveProjectCode } from "@/data/game";
import { isQueryableProjectCode } from "@/data/audit-project-query";
import { isAuditEmbedContext } from "@/lib/audit-embed";

const STORAGE_KEY = "cuc-arg-game-state";
const AUDIT_SESSION_KEY = "audit-session-active";
const STUDENT_SESSION_KEY = "student-session-active";
const GAME_STATE_VERSION = 12;
const REMEMBER_MS = 7 * 24 * 60 * 60 * 1000;

const defaultState: GameState = {
  clues: [],
  auditLoggedIn: false,
  auditRememberUntil: null,
  studentLoggedIn: false,
  studentRememberUntil: null,
  studentPersona: null,
  cyaLoggedIn: false,
  aniChatComplete: false,
  ending: null,
  archiveDeleted: false,
  searchedChengYe: false,
  devIntroTasksRevealed: false,
  chengYeSearchCompleted: false,
  devIntroMailUnlocked: false,
  m01ScrolledToBottom: false,
  strollThanksMailUnlocked: false,
  auditTerminalUnlocked: false,
  graduateVerifyMap: {},
  projectQueryHistory: [],
  stateVersion: GAME_STATE_VERSION,
};

function isAuditEmbedFrame(): boolean {
  return isAuditEmbedContext();
}

function resolveAuditSession(merged: GameState): GameState {
  const now = Date.now();

  if (merged.auditRememberUntil && now > merged.auditRememberUntil) {
    merged = { ...merged, auditLoggedIn: false, auditRememberUntil: null };
  } else if (merged.auditLoggedIn && !merged.auditRememberUntil) {
    if (isAuditEmbedFrame()) {
      // iframe 内页与父页共享 localStorage，但不共享 sessionStorage
      if (typeof window !== "undefined") {
        sessionStorage.setItem(AUDIT_SESSION_KEY, "1");
      }
    } else {
      const sessionActive =
        typeof window !== "undefined" &&
        sessionStorage.getItem(AUDIT_SESSION_KEY) === "1";
      if (!sessionActive) {
        merged = { ...merged, auditLoggedIn: false };
      }
    }
  }

  if (merged.studentRememberUntil && now > merged.studentRememberUntil) {
    merged = { ...merged, studentLoggedIn: false, studentRememberUntil: null, studentPersona: null };
  } else if (merged.studentLoggedIn && !merged.studentRememberUntil) {
    const sessionActive =
      typeof window !== "undefined" &&
      sessionStorage.getItem(STUDENT_SESSION_KEY) === "1";
    if (!sessionActive) {
      merged = { ...merged, studentLoggedIn: false, studentPersona: null };
    }
  }

  return merged;
}

function readStoredState(): GameState {
  if (typeof window === "undefined") return defaultState;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw) as Partial<GameState>;
    let merged = { ...defaultState, ...parsed };

    if ((parsed.stateVersion ?? 0) < GAME_STATE_VERSION) {
      const m01Earned =
        (parsed.stateVersion ?? 0) >= 4 && parsed.m01ScrolledToBottom === true;
      merged.m01ScrolledToBottom = m01Earned;
      merged.devIntroMailUnlocked = m01Earned;
      merged.chengYeSearchCompleted = false;
      merged.devIntroTasksRevealed = false;
      merged.searchedChengYe = false;
      merged.auditRememberUntil = parsed.auditRememberUntil ?? null;
      merged.studentRememberUntil = parsed.studentRememberUntil ?? null;
      merged.auditTerminalUnlocked = parsed.auditTerminalUnlocked ?? false;
      merged.graduateVerifyMap = parsed.graduateVerifyMap ?? {};
      merged.projectQueryHistory = parsed.projectQueryHistory ?? [];
      merged.strollThanksMailUnlocked = parsed.strollThanksMailUnlocked ?? false;
      merged.studentPersona =
        parsed.studentPersona ?? (merged.studentLoggedIn ? "player" : null);
      if (merged.cyaLoggedIn && !merged.studentLoggedIn) {
        merged.studentLoggedIn = true;
        merged.studentPersona = "cheng_ye";
        merged.cyaLoggedIn = false;
      }
      if (
        merged.studentLoggedIn &&
        !merged.studentRememberUntil &&
        (parsed.stateVersion ?? 0) < 7
      ) {
        merged.studentRememberUntil = Date.now() + REMEMBER_MS;
      }
      merged.stateVersion = GAME_STATE_VERSION;
      return resolveAuditSession(merged);
    }

    const m01Earned = parsed.m01ScrolledToBottom === true;
    merged.m01ScrolledToBottom = m01Earned;
    merged.devIntroMailUnlocked = m01Earned;

    const chengYeEarned = parsed.chengYeSearchCompleted === true;
    merged.chengYeSearchCompleted = chengYeEarned;
    merged.devIntroTasksRevealed = chengYeEarned;
    merged.searchedChengYe = chengYeEarned;
    merged.auditRememberUntil = parsed.auditRememberUntil ?? null;
    merged.studentRememberUntil = parsed.studentRememberUntil ?? null;
    merged.auditTerminalUnlocked = parsed.auditTerminalUnlocked ?? false;
    merged.strollThanksMailUnlocked = parsed.strollThanksMailUnlocked ?? false;
      merged.graduateVerifyMap = parsed.graduateVerifyMap ?? {};
      merged.projectQueryHistory = parsed.projectQueryHistory ?? [];
      merged.stateVersion = GAME_STATE_VERSION;

    return resolveAuditSession(merged);
  } catch {
    return defaultState;
  }
}

interface GameContextValue extends GameState {
  addClue: (id: ClueId) => void;
  hasClue: (id: ClueId) => boolean;
  setAuditLoggedIn: (v: boolean) => void;
  loginAudit: (remember: boolean) => void;
  loginStudent: (remember: boolean, persona?: "player" | "cheng_ye") => void;
  setStudentLoggedIn: (v: boolean) => void;
  setCyaLoggedIn: (v: boolean) => void;
  setAniChatComplete: (v: boolean) => void;
  setEnding: (e: EndingId) => void;
  setArchiveDeleted: (v: boolean) => void;
  setSearchedChengYe: (v: boolean) => void;
  setDevIntroMailUnlocked: (v: boolean) => void;
  setStrollThanksMailUnlocked: (v: boolean) => void;
  setAuditTerminalUnlocked: (v: boolean) => void;
  setGraduateVerify: (studentId: string, status: GraduateVerifyStatus) => void;
  addProjectQueryHistory: (projectCode: string) => void;
  syncFromStorage: () => void;
  resetGame: () => void;
  verification: VerificationStatus;
}

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<GameState>(readStoredState);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setState(readStoredState());
    setReady(true);
  }, []);

  useEffect(() => {
    function syncFromStorage() {
      setState(readStoredState());
    }

    function onStorage(event: StorageEvent) {
      if (event.key === STORAGE_KEY) syncFromStorage();
    }

    function onPageShow(event: PageTransitionEvent) {
      if (event.persisted) syncFromStorage();
    }

    window.addEventListener("storage", onStorage);
    window.addEventListener("pageshow", onPageShow);
    window.addEventListener("focus", syncFromStorage);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("pageshow", onPageShow);
      window.removeEventListener("focus", syncFromStorage);
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, ready]);

  const addClue = useCallback((id: ClueId) => {
    setState((s) => (s.clues.includes(id) ? s : { ...s, clues: [...s.clues, id] }));
  }, []);

  const hasClue = useCallback((id: ClueId) => state.clues.includes(id), [state.clues]);

  const setSearchedChengYe = useCallback((v: boolean) => {
    setState((s) => {
      if (v) {
        if (s.searchedChengYe && s.chengYeSearchCompleted && s.devIntroTasksRevealed) {
          return s;
        }
        return {
          ...s,
          searchedChengYe: true,
          devIntroTasksRevealed: true,
          chengYeSearchCompleted: true,
        };
      }
      if (!s.searchedChengYe) return s;
      return { ...s, searchedChengYe: false };
    });
  }, []);

  const verification = useMemo((): VerificationStatus => {
    const lines: VerificationLine[] = ["identity", "project", "ai", "account"];
    const result: VerificationStatus = {
      identity: false,
      project: false,
      ai: false,
      account: false,
    };
    for (const clue of state.clues) {
      const line = CLUE_TO_LINE[clue];
      if (line) result[line] = true;
    }
    // account line needs cya_truth specifically
    result.account = state.clues.includes("cya_truth");
    return result;
  }, [state.clues]);

  const addProjectQueryHistory = useCallback((projectCode: string) => {
    const resolved = resolveProjectCode(projectCode);
    if (!isQueryableProjectCode(resolved)) return;
    setState((s) => {
      const filtered = s.projectQueryHistory.filter((code) => code !== resolved);
      return {
        ...s,
        projectQueryHistory: [resolved, ...filtered].slice(0, 8),
      };
    });
  }, []);

  const value: GameContextValue = {
    ...state,
    addClue,
    hasClue,
    setAuditLoggedIn: (v) =>
      setState((s) => {
        if (!v) {
          sessionStorage.removeItem(AUDIT_SESSION_KEY);
          return { ...s, auditLoggedIn: false, auditRememberUntil: null };
        }
        return { ...s, auditLoggedIn: true };
      }),
    loginAudit: (remember) => {
      if (remember) {
        sessionStorage.removeItem(AUDIT_SESSION_KEY);
        setState((s) => ({
          ...s,
          auditLoggedIn: true,
          auditRememberUntil: Date.now() + REMEMBER_MS,
        }));
        return;
      }
      sessionStorage.setItem(AUDIT_SESSION_KEY, "1");
      setState((s) => ({
        ...s,
        auditLoggedIn: true,
        auditRememberUntil: null,
      }));
    },
    loginStudent: (remember, persona = "player") => {
      if (remember) {
        sessionStorage.removeItem(STUDENT_SESSION_KEY);
        setState((s) => ({
          ...s,
          studentLoggedIn: true,
          studentRememberUntil: Date.now() + REMEMBER_MS,
          studentPersona: persona,
        }));
        return;
      }
      sessionStorage.setItem(STUDENT_SESSION_KEY, "1");
      setState((s) => ({
        ...s,
        studentLoggedIn: true,
        studentRememberUntil: null,
        studentPersona: persona,
      }));
    },
    setStudentLoggedIn: (v) =>
      setState((s) => {
        if (!v) {
          sessionStorage.removeItem(STUDENT_SESSION_KEY);
          return {
            ...s,
            studentLoggedIn: false,
            studentRememberUntil: null,
            studentPersona: null,
          };
        }
        return { ...s, studentLoggedIn: true, studentPersona: s.studentPersona ?? "player" };
      }),
    setCyaLoggedIn: (v) => setState((s) => ({ ...s, cyaLoggedIn: v })),
    setAniChatComplete: (v) => setState((s) => ({ ...s, aniChatComplete: v })),
    setEnding: (e) => setState((s) => ({ ...s, ending: e })),
    setArchiveDeleted: (v) => setState((s) => ({ ...s, archiveDeleted: v })),
    setSearchedChengYe,
    setDevIntroMailUnlocked: (v) =>
      setState((s) => ({
        ...s,
        devIntroMailUnlocked: v,
        m01ScrolledToBottom: v ? true : s.m01ScrolledToBottom,
      })),
    setStrollThanksMailUnlocked: (v) =>
      setState((s) => (s.strollThanksMailUnlocked === v ? s : { ...s, strollThanksMailUnlocked: v })),
    setAuditTerminalUnlocked: (v) =>
      setState((s) => {
        const next = { ...s, auditTerminalUnlocked: v };
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          /* ignore */
        }
        return next;
      }),
    setGraduateVerify: (studentId, status) =>
      setState((s) => ({
        ...s,
        graduateVerifyMap: { ...s.graduateVerifyMap, [studentId]: status },
      })),
    addProjectQueryHistory,
    syncFromStorage: () => setState(readStoredState()),
    resetGame: () => {
      sessionStorage.removeItem(AUDIT_SESSION_KEY);
      sessionStorage.removeItem(STUDENT_SESSION_KEY);
      setState(defaultState);
    },
    verification,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
}
