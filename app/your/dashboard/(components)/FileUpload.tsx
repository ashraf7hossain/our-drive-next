"use client";
import { useState } from "react";
import { auth } from "@/firebase.config";
import { FileData } from "@/models/fileData";
import { uploadFileToStorage, saveFileMetadata } from "@/utils/file.utils";
import OurModal from "@/app/(components)/OurModal";
import { useFileContext } from "@/contexts/FileContext";

interface FileUploadProps {
  onUploadSuccess?: (fileData: any) => void; // Optional callback to handle successful uploads
}

// FileUpload Component
const FileUpload: React.FC<FileUploadProps> = ({ onUploadSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const { addFile } = useFileContext();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  function hideModal() {
    setIsModalOpen(false);
  }
  function showModal() {
    setIsModalOpen(true);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadFile = async () => {
    if (!file || !auth?.currentUser) {
      throw Error("File or user not found");
    }

    const userId = auth.currentUser.uid;
    setUploading(true);

    try {
      const fileType = file.type.split("/")[1];
      const fileSlug = file.name.toLocaleLowerCase();
      const downloadUrl = await uploadFileToStorage(file, userId, setProgress);

      const fileData: FileData = {
        name: file.name,
        fileSlug: fileSlug,
        userName: auth.currentUser.displayName ?? "Anonymous",
        userId: userId,
        visibility: "private",
        uploadedAt: new Date(),
        url: downloadUrl,
        fileType: fileType,
      };

      await saveFileMetadata(userId, fileData);

      addFile(fileData);
      hideModal();

      if (onUploadSuccess) {
        onUploadSuccess(fileData);
      }

      console.log("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container p-6 mx-auto">
      <button
        className="bg-blue-200 px-4 py-2 text-blue rounded inline-block"
        onClick={showModal}
        type="button"
      >
        Upload
      </button>
      {isModalOpen && (
        <OurModal onClose={hideModal}>
          <div className="bg-blue-200 px-4 py-2 text-blue rounded inline-block">
            <label htmlFor="file-upload" className="cursor-pointer">
              add file
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              id="file-upload"
              className="hidden"
            />
          </div>
          <button
            className="ms-5 bg-blue-200 px-4 py-2 text-blue rounded inline-block"
            onClick={handleUploadFile}
          >
            Upload
          </button>
          <p>{file && file.name}</p>
          <div className="progress">{uploading && <p>{progress}%</p>}</div>
          {uploading && (
            <div>
              <div className="progress-wrapper w-[300px] my-5 border border-rounded bg-gray-200 h-[8px] flex">
                <div
                  className="progress-bar bg-blue-500 h-[8px]"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}
        </OurModal>
      )}
    </div>
  );
};

export default FileUpload;
