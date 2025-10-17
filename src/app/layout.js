"use client";

import "./globals.css";
import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "next/navigation";

export default function RootLayout({ children }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = async (searchQuery) => {
    setQuery(searchQuery);
    if (searchQuery.trim() === "") {
      router.push("/");
      return;
    }
    // переходимо на головну з параметром пошуку
    router.push(`/?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100">
        {/* 🔍 Завжди видимий пошук */}
        <header className="bg-white shadow p-4 sticky top-0 z-50">
          <h1
            className=" cursor-pointer text-2xl font-bold mb-2 text-center"
            onClick={() => router.push("/")}
          >
            🎬 Kinopoisk
          </h1>
          <div className="max-w-lg mx-auto">
            <SearchBar onSearch={handleSearch} />
          </div>
        </header>

        {/* Основний контент сторінки */}
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
