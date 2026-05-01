import React from "react";
import Input from "../atoms/Input";
import type { FormFieldProps } from "../../types/TypeUI";

export const FormField: React.FC<FormFieldProps> = ({ icon, ...props }) => (
  <div className="relative w-full">
    <Input {...props} />
    <span className="absolute right-5 top-1/2 -translate-y-1/2 text-var(--Radeon--) text-xl pointer-events-none drop-shadow-sm">
      {icon}
    </span>
  </div>
);
