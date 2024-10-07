"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase.config";
import FileTile from "./dashboard/(components)/FileTile";

export default function Home() {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = (e: any) => {
    e.preventDefault();
    console.log(search);
  };

  const fetchSuggestions = async (search: string) => {
    search = search.toLowerCase();
    if(search === "") {
      setSuggestions([]);
      return;
    }
    const q = query(
      collection(db, "files"),
      where("visibility", "==", "public"),
      where("fileSlug", ">=", search),
      where("fileSlug", "<=", search + "\uf8ff")
    );
    const querySnapshot = await getDocs(q);
    const tempFiles: any = [];
    querySnapshot.forEach((doc) => {
      tempFiles.push({ id: doc.id, ...doc.data() });
    });
    console.log(tempFiles);
    setSuggestions(tempFiles);
  };

  useEffect(() => {
    fetchSuggestions(search);
  }, [search]);

  return (
    <div className="flex justify-center min-h-screen my-10">
      <div className="relative max-w-md w-full">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {suggestions.length > 0 && (
          <ul className="absolute w-full bg-white rounded-md shadow-md mt-1">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion}
                className="p-2 hover:bg-gray-100"
                onClick={() => {
                  setSearch(suggestion);
                  // Handle suggestion selection (e.g., navigate to a specific page)
                }}
              >
                <FileTile file={suggestion} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
