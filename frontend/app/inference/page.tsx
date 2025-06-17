import NavBar from "../components/NavBar";
import PromptForm from "../components/PromptForm";

export default function InferPage() {
  return (
    <>
      <NavBar />
      <main className="py-10 px-4 max-w-4xl mx-auto">
        <PromptForm />
      </main>
    </>
  );
}
