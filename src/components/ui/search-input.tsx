"use client";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <input
      type="text"
      placeholder="Search songs or artists..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full max-w-xl border-2 border-cosy-border bg-white px-5 py-3.5 text-base placeholder:text-gray-400 focus:border-cosy-red focus:outline-none"
    />
  );
}
