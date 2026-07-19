import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

type CucButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "default" | "main";
  external?: boolean;
  className?: string;
  arrow?: "dark" | "white" | "none";
};

export function CucButton({
  href,
  children,
  variant = "default",
  external = true,
  className,
  arrow = "dark",
}: CucButtonProps) {
  const isMain = variant === "main";
  const arrowSrc =
    arrow === "white"
      ? "/cuc-anima/images/right-arrow-white.svg"
      : arrow === "dark"
        ? "/cuc-anima/images/right-arrow.svg"
        : null;

  const classes = cn(
    "group relative inline-flex items-center overflow-hidden px-6 py-4 text-base font-medium transition-colors",
    isMain
      ? "bg-cuc-red text-white"
      : "bg-white text-cuc-text",
    className,
  );

  const content = (
    <>
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {arrowSrc && (
          <Image src={arrowSrc} alt="" width={14} height={14} className="h-3.5 w-auto" />
        )}
      </span>
      <span
        className={cn(
          "absolute inset-y-0 left-0 z-0 w-0 origin-left transition-all duration-300 ease-out group-hover:w-full",
          isMain ? "bg-cuc-red-dark" : "bg-[#ddd]",
        )}
      />
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
