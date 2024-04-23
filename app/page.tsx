import { Form } from "@/components/form";
import Image from "next/image";
import generach_img from "@/assets/generach.jpeg";
import mystaro_img from "@/assets/mystaro.jpeg";
import sistent_img from "@/assets/sistent.jpeg";

export default function Home() {
  return (
      <section className="h-screen p-8 lg:px-24 lg:py-8 bg-stone-950 relative z-[1] overflow-y-auto">
          <Form>
              <header>
                  <h1 className="text-white font-bold text-3xl">
                      Создавайте музыку бесплатно
                  </h1>
                  <h2 className="text-white/70 font-medium mt-2 text-lg">
                      <span className="text-white font-semibold">с искуственным интеллектом</span>{" "}
                      у вас в браузере!
                  </h2>
              </header>
          </Form>
          <div
              className="w-full lg:w-[400px] h-[250px] lg:h-[400px] bg-gradient-to-br from-amber-300 to-amber-600 absolute left-0 top-0 -z-[1] blur-2xl lg:blur-[230px] max-lg:opacity-60"/>
          <footer className="inset-x-0 text-white mt-20">
              <div className="max-w-screen-xl mx-auto flex justify-around items-center">
                  <a target="_blank" href="https://генерач.рф/?start=muz" className="text-center">
                      <Image src={generach_img} alt="Создание любых картинок по вашему запросу"
                             className="w-16 h-16 mx-auto mb-2 rounded-full"
                             width="64" height="64"
                      />
                      <span className="text-xs">Создание любых картинок</span>
                  </a>
                  <a target="_blank" href="https://t.me/mystaro_bot" className="text-center">
                      <Image src={mystaro_img} alt="Гадание на картах таро"
                             className="w-16 h-16 mx-auto mb-2 rounded-full"
                             width="64" height="64"
                      />
                      <span className="text-xs">Гадание на картах таро</span>
                  </a>
                  <a target="_blank" href="https://t.me/sistent_bot?start=muz" className="text-center">
                      <Image src={sistent_img} alt="Транскрипция звонков"
                             className="w-16 h-16 mx-auto mb-2 rounded-full"
                             width="64" height="64"
                      />
                      <span className="text-xs">Транскрипция звонков</span>
                  </a>
              </div>
          </footer>
      </section>
  );
}
