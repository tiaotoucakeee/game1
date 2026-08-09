/** 检测 macOS / iPadOS（Safari 桌面布局与 Mac 相近） */
export function isMacOS(): boolean {
  if (typeof navigator === "undefined") return false;
  const platform = navigator.platform ?? "";
  if (/Mac/i.test(platform)) return true;
  return /Macintosh|Mac OS X/i.test(navigator.userAgent);
}
