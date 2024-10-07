"use client";
import { useEffect, useState } from "react";
import { auth } from "@/firebase.config";
import { db } from "@/firebase.config";
import { collection, getDocs, query } from "firebase/firestore";
import FileTile from "./FileTile";
import { onAuthStateChanged } from "firebase/auth";

function FileList() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchUsersFiles = async (userId: string) => {
    console.log(auth?.currentUser);
    const fileRefs = await collection(db, `users/${userId}/documents`);

    const querySnapshot = await getDocs(fileRefs);
    
    let tempFiles: any = [];
    
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      tempFiles.push({ id: doc.id, ...doc.data() });
    });
    setFiles(tempFiles);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log("User is signed in:", user);
        fetchUsersFiles(user.uid); // Fetch files for the authenticated user
      } else {
        console.log("No user is signed in.");
        setLoading(false);
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  return (
    <>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Your Files</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {files.length > 0 ? (
            files.map((file: any) => <FileTile key={file.id} file={file} />)
          ) : (
            <p>{loading ? "Loading..." : "No files found"}</p>
          )}
        </div>
      </div>
    </>
  );
}

export default FileList;
