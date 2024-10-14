// FileContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";
import { FileData } from "@/models/fileData";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase.config";

interface FileContextType {
  files: FileData[];
  addFile: (file: FileData) => void;
  fetchFiles: (userId: string) => Promise<void>;
}

const FileContext = createContext<FileContextType | undefined>(undefined);

export const FileProvider = ({ children }: { children: ReactNode }) => {
  const [files, setFiles] = useState<FileData[]>([]);

  const addFile = (file: FileData) => {
    setFiles((prevFiles) => [...prevFiles, file]);
  };

  const fetchFiles = async (userId: string) => {
    const fileRefs = await collection(db, `users/${userId}/documents`);

    const querySnapshot = await getDocs(fileRefs);

    let tempFiles: any = [];

    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      tempFiles.push({ id: doc.id, ...doc.data() });
    });
    setFiles(tempFiles);
  };

  return (
    <FileContext.Provider value={{ files, addFile, fetchFiles }}>
      {children}
    </FileContext.Provider>
  );
};

export const useFileContext = () => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error("useFileContext must be used within a FileProvider");
  }
  return context;
};
