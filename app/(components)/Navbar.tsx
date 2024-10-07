"use client";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/firebase.config";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // For hamburger and close icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const menuOptions = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Your",
      link: "/your/dashboard",
    },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUser(user);
        console.log("User is signed in:", user);
      } else {
        console.log("No user is signed in.");
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  return (
    <header className="bg-blue-600 text-white w-full">
      {/* Navbar */}
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link href="/">Our Drive</Link>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6">
          {menuOptions.map((option) => (
            <Link
              key={option.name}
              href={option.link}
              className="hover:text-blue-300"
            >
              {option.name}
            </Link>
          ))}
          {isLoggedIn ? (
            <div className="avatar">
              <div className="w-10 rounded-full">
                <Link href="/your/profile">
                  <Image
                    src={user?.photoURL || ""}
                    alt="Avatar"
                    width={200}
                    height={200}
                  ></Image>
                </Link>
              </div>
            </div>
          ) : (
            <Link href="/auth/signin">
              Sign in
            </Link>
          )}
        </nav>

        {/* Mobile Hamburger Icon */}
        <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </div>
      </div>

      {/* Mobile Sidebar Menu */}
      <div
        className={`md:hidden fixed top-0 left-0 h-full w-64 bg-blue-600 p-4 transform z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex justify-between items-center mb-8">
          <div className="text-2xl font-bold">
            <a href="#">Brand</a>
          </div>
          <FaTimes size={24} className="cursor-pointer" onClick={toggleMenu} />
        </div>
        <nav className="flex flex-col space-y-4">
          {menuOptions.map((option) => (
            <Link
              key={option.name}
              href={option.link}
              className="hover:text-blue-300"
              onClick={toggleMenu}
            >
              {option.name}
            </Link>
          ))}
          <div className="avatar">
            <div className="w-10 rounded-full">
              <Image
                src={user?.photoURL || ""}
                alt="Avatar"
                width={200}
                height={200}
              ></Image>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
