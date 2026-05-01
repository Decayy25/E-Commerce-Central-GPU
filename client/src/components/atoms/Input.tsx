import { Fragment } from "react";
import type { InputProps } from "../../types/TypeUI";

export default function Input(props: InputProps) {
  const {
    name,
    type = "text",
    placeholder = "Title",
    value,
    onChange,
    className = "w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600",
  } = props;
  return (
    <Fragment>
      <div>
        <input
          name={name}
          type={type}
          className={className}
          onChange={onChange}
          placeholder={placeholder}
          value={value}
        />
      </div>
    </Fragment>
  );
}
