import Image from "next/image";
import { useState } from "react";
import { truncateText } from "@/utils/text.utils";
import { FileData } from "@/models/fileData";
function FileTile({ file }: { file: FileData }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 relative group">
      <a href={file.url}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* File icon */}
            <div className="bg-gray-200 p-2 rounded-lg">
              <Image
                src={`/assets/icons/${file.fileType}.png`}
                width={30}
                height={30}
                alt={file.fileType}
              />
            </div>
            <div>
              {/* File name */}
              <p className="font-bold text-lg">{truncateText(file.name, 20)}</p>
              <p className="text-sm text-gray-500">
                Uploaded: {file.uploadedAt?.toLocaleString()}
              </p>
            </div>
          </div>

        </div>
      </a>
    </div>
  );
}
export default FileTile;
