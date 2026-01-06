import React from "react";
import { buttonVariants } from "../button";

const AuthButton = ({
  isPending,
  btnPending,
  btnLabel,
}: {
  isPending: boolean;
  btnPending: string;
  btnLabel: string;
}) => {
  return (
    <button
      type="submit"
      disabled={isPending}
      className={buttonVariants({
        size: "lg",
        className:
          "flex items-center gap-1 w-full py-2 mt-6 font-bold transition-colors duration-200",
      })}
    >
      {isPending ? btnPending : btnLabel}
    </button>
  );
};

export default AuthButton;
