"use client";
import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { redirect, useRouter } from "next/navigation";
import { handleSignOut } from "@/utils/auth.utils";

const Profile = () => {
  const [isSideMenuOpen, setSideMenuOpen] = useState(false);
  const router = useRouter();

  const toggleSideMenu = () => {
    setSideMenuOpen(!isSideMenuOpen);
  };

  const menuList = [
    {
      name: "Dashboard",
      onClick: () => {
        router.push("/your/dashboard");
      },
    },
    {
      name: "Settings",
      onclick: () => {

      },
    },
    {
      name: "Profile",
      onclick: () => {
        redirect("/your/profile");
      },
    },
    {
      name: "sign out",
      onclick: () => {
        handleSignOut();
        router.push("/auth/signin");
      },
    },
  ];

  return (
    <div className="container px-6 mx-auto">
      <div className="flex h-screen">
        {/* Side Menu */}
        <div
          className={`fixed top-1/2 transform -translate-y-1/2 left-0 h-1/2 bg-gray-800 text-white transition-transform transform ${
            isSideMenuOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:relative md:w-64`}
        >
          <div className="p-6">
            <h2 className="text-xl font-bold">Side Menu</h2>
            <ul className="mt-4 space-y-2">
              {menuList.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={item.onclick}
                    type="button"
                    className="block px-4 py-2 text-white hover:bg-gray-700"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 md:ml-64 bg-gray-100 p-6">
          {/* Hamburger Button */}
          <button
            className="menu-hider md:hidden absolute z-20 flex items-center justify-center w-10 h-10 bg-gray-800 text-white"
            onClick={toggleSideMenu}
          >
            {isSideMenuOpen ? (
              <AiOutlineClose size={24} />
            ) : (
              <FiMenu size={24} />
            )}
          </button>

          {/* Profile Content */}
          <div className="container mx-auto">
            <h1 className="text-3xl font-semibold mb-6">Profile Page</h1>
            <p>
              This is the profile page content. Adjust the side menu by clicking
              the hamburger button on mobile devices.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
