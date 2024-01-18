"use client";

import { useEffect, useRef } from "react";

interface InputInterface {
  name: string;
  value: string;
  disabled?: boolean;
  focus?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export default function Input({
  name,
  value,
  disabled = false,
  focus = false,
  onChange,
}: InputInterface) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (focus && inputRef.current) {
      inputRef.current.focus();
    }
  });

  return (
    <div className="inputContainer">
      <label htmlFor={name.replace(/\s/g, "")}>{name}</label>
      <input
        type="text"
        id={name.replace(/\s/g, "")}
        onChange={onChange}
        value={value}
        disabled={disabled}
        ref={inputRef}
      />
    </div>
  );
}
