import { Form } from "@/components/form";
import Image from "next/image";

export default function Home() {
  return (
    <section className="min-h-screen p-12 lg:p-24 bg-stone-950">
      <Form>
        <header>
          <h1 className="text-white font-bold text-3xl">
            Start making music with AI
          </h1>
          <h2 className="text-white/70 font-medium mt-2 text-lg">
            In-browser text-to-music generation
          </h2>
        </header>
      </Form>
    </section>
  );
}
