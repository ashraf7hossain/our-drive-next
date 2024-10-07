import { db, storage } from "@/firebase.config";
import { collection, doc, runTransaction, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const uploadFileToStorage = (
  file: File,
  userId: string,
  setProgress: any
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, `files/${userId}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        reject(error);
      },
      async () => {
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadUrl);
      }
    );
  });
};

const saveFileMetadata = async (userId: string, fileData: any) => {
  const fileRef = doc(collection(db, "files"));
  const fileId = fileRef.id;

  const userFileRef = doc(db, `users/${userId}/documents`, fileId);

  try {
    await setDoc(fileRef, { ...fileData });
    await setDoc(userFileRef, { ...fileData });
  } catch (error: any) {
    throw new Error("Error saving file metadata: " + error.message);
  }
};

export const updateVisibility = async (
  fileId: string,
  userId: string,
  newVisibility: string
) => {
  try {
    // Start a Firestore transaction
    await runTransaction(db, async (transaction) => {
      const fileDocRef = doc(db, "files", fileId);
      const userFileDocRef = doc(db, `users/${userId}/documents`, fileId);

      transaction.update(fileDocRef, { visibility: newVisibility });
      transaction.update(userFileDocRef, { visibility: newVisibility });
    });

    console.log(`Visibility updated to ${newVisibility} for file ${fileId}`);
  } catch (error) {
    console.error("Error updating visibility:", error);
    throw new Error("Visibility update failed");
  }
};

export { uploadFileToStorage, saveFileMetadata };
