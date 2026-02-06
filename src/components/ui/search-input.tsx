"use client";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <input
      type="text"
      placeholder="Rechercher une musique ou un artiste..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full max-w-lg rounded-full border-0 bg-white px-5 py-3 text-sm shadow-sm ring-1 ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-cosy-red focus:outline-none"
    />
  );
}
