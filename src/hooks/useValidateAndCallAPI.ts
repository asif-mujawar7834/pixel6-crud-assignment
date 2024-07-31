import { useEffect } from "react";
import { UseFormSetValue, UseFormTrigger } from "react-hook-form";
import { ZodObject, ZodRawShape, ZodString } from "zod";
import { customerType } from "../redux/reducers/CustomerSlice";

export const useValidateAndCallAPI = (
  body: string,
  schema: ZodObject<ZodRawShape> | ZodString,
  value: string,
  fieldName: string,
  url: string,
  setValue: UseFormSetValue<{
    name: string;
    email: string;
    panNumber: string;
    pincode: string;
    phone: string;
    address1: string;
    state: string;
    city: string;
    id?: number | undefined;
    address2?: string | undefined;
  }>,
  setIsLoading: React.Dispatch<
    React.SetStateAction<{
      panNumber: boolean;
      pincode: boolean;
    }>
  >,
  updateFields: string[],
  valueToExtractFromAPIResponse: string[],
  trigger: UseFormTrigger<{
    panNumber: string;
    name: string;
    email: string;
    phone: string;
    address1: string;
    pincode: string;
    state: string;
    city: string;
    address2?: string | undefined;
    id?: number | undefined;
  }>
) => {
  useEffect(() => {
    const isPanValid = schema.safeParse(value);
    if (isPanValid.success) {
      const getPanDetails = async () => {
        try {
          setIsLoading((prev) => ({ ...prev, [fieldName]: true }));
          const res = await fetch(url, {
            method: "POST",
            body,
          });
          if (!res.ok) {
            throw new Error("Something went wrong while fetching pan details");
          }
          const data = await res.json();
          updateFields.map((field, i) => {
            setValue(
              field as keyof customerType,
              (field as keyof customerType) === "name"
                ? data[valueToExtractFromAPIResponse[i]]
                : data[field][0][valueToExtractFromAPIResponse[i]]
            );
            trigger(field as keyof customerType);
          });
        } catch (e) {
          console.error(e);
        } finally {
          setIsLoading((prev) => ({ ...prev, [fieldName]: false }));
        }
      };
      getPanDetails();
    }
  }, [value]);
};
