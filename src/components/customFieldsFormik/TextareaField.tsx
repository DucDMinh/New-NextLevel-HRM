import React from "react";
import { twMerge } from "tailwind-merge";
import { get, isString } from "lodash";
import { Textarea, TextareaProps } from "../ui/textarea";
import { Label } from "../ui/label";
import { AdditionalFormikProps } from "@/interfaces/common";

interface TextareaFieldProps extends TextareaProps {
  label?: string | React.ReactNode;
  required?: boolean;
  classNameLabel?: string;
  classNameContainer?: string;
  helperText?: string | React.ReactNode;
}
const TextareaField = (props: TextareaFieldProps & AdditionalFormikProps) => {
  const {
    label,
    classNameLabel,
    classNameContainer,
    form,
    field,
    className,
    required,
    helperText,
    ...restPropsTextarea
  } = props;
  const { name, onBlur, onChange, value } = field;
  const { errors, touched } = form;

  const msgError = get(touched, name) && (get(errors, name) as string);

  return (
    <div className={twMerge("grid w-full items-center gap-1.5", classNameContainer)}>
      {label && (
        <div className="label">
          <Label
            htmlFor={name}
            className={twMerge("mb-1", required && "required", classNameLabel)}
          >
            {label}
          </Label>
        </div>
      )}

      <Textarea
        id={name}
        name={name}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        className={twMerge(className, msgError && "border-red-500")}
        {...restPropsTextarea}
      />

      {helperText && (
        <span className="text-[13px] text-muted-foreground">{helperText}</span>
      )}
      <span className="invalid-text">{isString(msgError) ? msgError : ""}</span>
    </div>
  );
};

export default TextareaField;
