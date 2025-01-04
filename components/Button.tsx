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
    "border-2 rounded-2xl border-red py-2 px-4 my-4 flex flex-1 flex-row justify-center";

  const variantStyles = {
    default: "",
    filled: "bg-white text-black",
  };

  const styles = `${defaultStyles} ${variantStyles[variant]}`;

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
