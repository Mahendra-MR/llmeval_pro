import NavBar from "../components/NavBar";
import UploadClient from "@client/UploadClient";

export default function UploadPage() {
  return (
    <>
      <NavBar />
      <main className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="text-xl font-bold mb-6">Upload Evaluation Results</h2>
        <UploadClient />
      </main>
    </>
  );
}
