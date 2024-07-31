import { ReactNode } from "react";

interface SubmitButtonProps {
  children: ReactNode;
  disabled?: boolean;
  isSubmitting?: boolean;
}
export const SubmitButton = ({ children }: SubmitButtonProps) => {
  return (
    <button
      className="font-medium text-white p-3 rounded-md bg-black"
      type="submit"
    >
      {children}
    </button>
  );
};
