import FileUpload from "@/app/dashboard/(components)/FileUpload";
import FileList from "./(components)/FileList";

function Dashboard() {

  return (
    <main className="container p-6 mx-auto">
      <h1 className="text-green text-3xl tex-bold">Your drive</h1>
      <FileUpload />
      <FileList />
    </main>
  );
}

export default Dashboard;
