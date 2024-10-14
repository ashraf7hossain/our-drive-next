export interface FileData {
  id?: string;
  name: string;
  fileSlug: string;
  userName: string;
  userId: string;
  visibility: "private" | "public"; // assuming visibility can be either private or public
  uploadedAt: Date;
  url: string;
  fileType: string;
}