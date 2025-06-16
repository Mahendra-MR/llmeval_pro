import NavBar from "./components/NavBar";
import EvalTable from "./components/EvalTable";

export default function Home() {
  return (
    <>
      <NavBar />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Recent Evaluations</h2>
        <EvalTable />
      </main>
    </>
  );
}
