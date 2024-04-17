import { Form } from "@/components/form";
import Image from "next/image";

export default function Home() {
  return (
    <section className="min-h-screen p-12 lg:p-24 bg-stone-950 relative z-[1]">
      <Form>
        <header>
          <h1 className="text-white font-bold text-3xl">
            Start making music with AI
          </h1>
          <h2 className="text-white/70 font-medium mt-2 text-lg">
            <span className="text-white font-semibold">In-browser</span>{" "}
            text-to-music generation
          </h2>
        </header>
      </Form>
      <div className="w-[400px] h-[400px] bg-gradient-to-br from-amber-300 to-amber-600 absolute left-0 top-0 -z-[1] blur-[230px]" />
    </section>
  );
}
