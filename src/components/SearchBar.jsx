"use client";

import { useEffect, useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch(query.trim());
    }, 500);
    return () => clearTimeout(timeout);
  }, [query, onSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
    // if (query.trim()) onSearch(query);
  };

  return (
    <div className="mb-4 flex gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
        className="border p-2 rounded flex-1"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 rounded">
        Search
      </button>
    </div>
  );
}
