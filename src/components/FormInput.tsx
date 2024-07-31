import { ReactNode } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import { Loader } from "./Loader";

interface FormInputProps {
  name: string;
  placeholder: string;
  label?: string;
  type: string;
  error?: FieldError | undefined;
  icon?: ReactNode;
  register: UseFormRegister<any>;
  isLoading?: boolean;
  required?: boolean;
}

export const FormInput = ({
  name,
  placeholder,
  label,
  type,
  error,
  icon,
  register,
  isLoading,
  required,
}: FormInputProps) => {
  return (
    <div className="flex flex-col flex-1 gap-1">
      {label && (
        <div className="flex gap-1 items-center">
          <label className="text-md text-slate-500 font-medium">{label}</label>
          {required && <span className="text-red-500">*</span>}
        </div>
      )}

      <div
        className={`flex gap-x-2 items-center border ${
          error ? "border-red-500" : "border-gray-200"
        } px-3 rounded-md font-medium text-[#081225] bg-[#f5f5f5]`}
      >
        {icon}
        <input
          className={`w-full p-2 rounded-md placeholder:text-slate-500 outline-0 bg-transparent`}
          placeholder={placeholder}
          type={type}
          {...register(name)}
          disabled={isLoading}
        />
        {isLoading && <Loader />}
      </div>
      {error && <span className="text-red-500">{error.message}</span>}
    </div>
  );
};
