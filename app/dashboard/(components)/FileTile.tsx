import Image from "next/image";
import { useState } from "react";
import { truncateText } from "@/utils/text.utils";
import { auth } from "@/firebase.config";
import { updateVisibility } from "@/utils/file.utils";
import { SlOptionsVertical } from "react-icons/sl";

function FileTile({ file }: any) {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleVisibility = () => {
    if (!auth.currentUser) {
      return;
    }

    const userId = auth.currentUser.uid;
    updateVisibility(
      file.id,
      userId,
      file.visibility === "public" ? "private" : "public"
    );
    setShowMenu(false);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 relative group">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* File icon */}
          <div className="bg-gray-200 p-2 rounded-lg">
            <Image
              src={`/assets/icons/${ file.fileType }.png`}
              width={30}
              height={30}
              alt="file icon"
            />
          </div>
          <div>
            {/* File name */}
            <p className="font-bold text-lg">{truncateText(file.name, 20)}</p>
            <p className="text-sm text-gray-500">
              Uploaded: {file.uploadedAt.toDate().toLocaleString()}
            </p>
          </div>
        </div>

        {/* Three dots menu */}
        <div className="relative">
          <button className="focus:outline-none" onClick={toggleMenu}>
            <SlOptionsVertical />
          </button>

          {/* Dropdown menu */}
          {showMenu && (
            <div className="absolute right-0 mt-2 w-32 bg-white flex flex-col justify-center rounded-md shadow-lg z-10">
              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                View
              </a>
              <button className="block px-4 py-2 text-sm text-red-900 bg-red-100">
                Delete
              </button>
              <button
                onClick={toggleVisibility}
                className="block px-4 py-2 text-sm text-green-900 bg-green-100"
              >
                {file.visibility === "private" ? "Make public" : "Make private"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default FileTile;
