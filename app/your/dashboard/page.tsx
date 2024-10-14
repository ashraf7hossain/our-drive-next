"use client";
import FileUpload from "./(components)/FileUpload";
import FileList from "./(components)/FileList";
import { FileProvider } from "@/contexts/FileContext";

function Dashboard() {

  return (
    <main className="container p-6 mx-auto">
      <h1 className="text-green text-3xl tex-bold">Your drive</h1>
      <FileProvider>
        <FileUpload />
        <FileList />
      </FileProvider>
    </main>
  );
}

export default Dashboard;
