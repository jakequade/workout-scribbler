import Link from "next/link";
import { ButtonHTMLAttributes, PropsWithChildren, useMemo } from "react";

type Props = {
  href?: string;
  onClick?: () => void;
  variant?: "filled" | "default";
};

export const Button = ({
  href,
  variant = "default",
  children,
  onClick,
}: PropsWithChildren<Props>) => {
  const defaultStyles =
    "border-2 rounded-2xl hover:opacity-50 px-4 my-4 flex flex-1 flex-row justify-center py-2";

  const variantStyles = {
    default: "border-neutral-50 text-neutral-50 ",
    filled: "bg-white text-black",
  };

  const styles = `${variantStyles[variant]} ${defaultStyles}`;

  return href ? (
    <Link className={styles} href={href}>
      {children}
    </Link>
  ) : (
    <button onClick={onClick} className={styles}>
      {children}
    </button>
  );
};
