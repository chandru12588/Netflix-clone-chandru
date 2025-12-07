import React from "react";

export default function TextInput({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
}) {
  return (
    <div className="flex flex-col gap-1 mb-4">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full bg-zinc-800 bg-opacity-60 border rounded-sm px-4 py-3 text-sm outline-none text-white placeholder-zinc-400
        ${error ? "border-red-500" : "border-zinc-600 focus:border-white"}`}
      />
      {error && (
        <span className="text-xs text-red-500 mt-1">
          {error}
        </span>
      )}
    </div>
  );
}
