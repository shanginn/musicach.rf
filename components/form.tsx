"use client";
import Image from "next/image";
import {
  AutoTokenizer,
  MusicgenForConditionalGeneration,
  BaseStreamer,
} from "@xenova/transformers";

import { Prompt } from "@/components/prompt";
import { Length } from "@/components/length";
import { Styles } from "@/components/styles";
import { Moods } from "@/components/moods";
import { useGeneration } from "@/components/hooks/useGeneration";
import { useState, useRef, useEffect } from "react";
import { encodeWAV, MODEL_ID } from "@/utils";
import classNames from "classnames";

class CallbackStreamer extends BaseStreamer {
  [x: string]: any;
  constructor(callback_fn: any) {
    super();

    this.callback_fn = callback_fn;
  }

  put(value: any) {
    return this.callback_fn(value);
  }

  end() {
    return this.callback_fn();
  }
}

export const Form = ({ children }: { children: React.ReactNode }) => {
  const [modelLoaded, setModelLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Loading model (656MB)...");
  const [loadProgress, setLoadProgress] = useState({});
  const [track, setTrack] = useState("");

  const {
    form,
    setForm,
    formattedPrompt,
    generate,
    results,
    loading,
    randomize,
    setResults,
  } = useGeneration();

  const modelPromise = useRef(null);
  const tokenizerPromise = useRef(null);

  useEffect(() => {
    modelPromise.current ??= MusicgenForConditionalGeneration.from_pretrained(
      MODEL_ID,
      {
        progress_callback: (data: any) => {
          if (data.status !== "progress") return;
          setLoadProgress((prev) => ({ ...prev, [data.file]: data }));
        },
        dtype: {
          text_encoder: "q8",
          decoder_model_merged: "q8",
          encodec_decode: "fp32",
        },
        device: "wasm",
      }
    );
    //@ts-ignore
    tokenizerPromise.current ??= AutoTokenizer.from_pretrained(MODEL_ID);
  }, []);

  useEffect(() => {
    const items = Object.values(loadProgress);
    if (items.length !== 5) return; // 5 files to load
    let loaded = 0;
    let total = 0;
    for (const data of Object.values(loadProgress)) {
      // @ts-ignore
      loaded += data.loaded;
      // @ts-ignore
      total += data.total;
    }
    const progress = loaded / total;
    setProgress(progress);
    setStatusText(
      progress === 1
        ? "Ready!"
        : `Loading In-Browser model (${(
            progress * 100
          ).toFixed()}% of 656MB)...`
    );
    if (progress === 1) {
      setTimeout(() => setModelLoaded(true), 1500);
    }
  }, [loadProgress]);

  const generateMusic = async () => {
    const tokenizer: any = await tokenizerPromise.current;
    const model: any = await modelPromise.current;

    if (!tokenizer || !model) return null;

    const max_length = Math.min(
      Math.max(Math.floor(form.length * 50), 1) + 4,
      model?.generation_config?.max_length ?? 1500
    );

    const streamer = new CallbackStreamer((value: string) => {
      const percent = value === undefined ? 1 : value[0].length / max_length;
      setStatusText(`Generating (${(percent * 100).toFixed()}%)...`);
      setProgress(percent);
    });

    const inputs = tokenizer(formattedPrompt);

    const audio_values = await model.generate({
      ...inputs,
      max_length,
      streamer,
    });

    setStatusText("Encoding audio...");

    const sampling_rate = model.config.audio_encoder.sampling_rate;
    const wav = encodeWAV(audio_values.data, sampling_rate);
    const blob = new Blob([wav], { type: "audio/wav" });
    setTrack(URL.createObjectURL(blob));
    setStatusText("Done!");
  };

  return (
    <main className="grid grid-cols-1 gap-20 lg:grid-cols-2 lg:gap-20 relative">
      <div className="grid grid-cols-1 gap-10">
        {children}
        <Prompt
          value={form.prompt}
          onChange={(value) => setForm({ ...form, prompt: value })}
          onRandomize={randomize}
        />
        <Length
          value={form.length}
          onChange={(value) => setForm({ ...form, length: value })}
        />
        <Styles
          value={form.style}
          onChange={(value) => setForm({ ...form, style: value })}
        />
        <Moods
          value={form.mood}
          onChange={(value) => setForm({ ...form, mood: value })}
        />
      </div>
      <div className="max-lg:pb-12">
        <div className="w-full sticky top-0">
          <div className="border rounded-xl p-6 bg-stone-900/40 border-white/5">
            <p className="text-amber-200 font-semibold text-xs uppercase mb-3">
              Generated prompt
            </p>
            <p className="text-white text-xl font-semibold">
              &quot;{formattedPrompt}&quot;
            </p>
          </div>
          <button
            className={classNames(
              "rounded-xl bg-stone-900/90 border-white/5 border px-6 py-3 font-semibold text-base text-white mt-6 hover:brightness-125 transition-all duration-200",
              {
                "animate-pulse": loading,
                "opacity-50 !cursor-not-allowed": !modelLoaded,
              }
            )}
            disabled={loading || !modelLoaded}
            onClick={() => {
              if (loading || !modelLoaded) return;
              setResults({ cover: null, title: null });
              setTrack("");
              generate();
              generateMusic();
            }}
          >
            {!modelLoaded ? "Waiting for model loaded" : "Generate music"}
          </button>
          {(loading || results?.title || results?.cover) && (
            <div className="mt-6 space-y-6 flex flex-col">
              {results.cover ? (
                <Image
                  src={results.cover}
                  alt="Cover art"
                  className="w-[300px] h-[300px] object-contain bg-amber-950 rounded-xl mx-auto"
                  width={300}
                  height={300}
                />
              ) : (
                <div className="w-[300px] h-[300px] bg-stone-900 animate-pulse rounded-xl mx-auto"></div>
              )}
              {results.title ? (
                <p className="text-center text-white font-bold text-3xl">
                  {results.title}
                </p>
              ) : (
                <div className="w-[450px] h-8 bg-stone-900 animate-pulse rounded-xl mx-auto"></div>
              )}
              {modelLoaded &&
                (track !== "" ? (
                  <div className="mx-auto">
                    <audio controls src={track} />
                  </div>
                ) : (
                  <div className="mx-auto w-full max-w-sm border rounded-xl p-6 bg-amber-900/10 border-white/10 overflow-hidden transition-all duration-200">
                    <p className="text-sm text-left mb-4 uppercase font-medium">
                      {statusText}
                    </p>
                    <div className="bg-gray-200 h-2.5 w-full rounded-full overflow-hidden">
                      <div
                        className="from-amber-500 to-orange-500 bg-gradient-to-r h-full"
                        style={{ width: `${100 * progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
      <div
        className={classNames(
          "fixed lg:right-10 w-[calc(100%-24px)] max-lg:top-6 lg:bottom-10 max-lg:left-1/2 max-lg:-translate-x-1/2 z-20 lg:w-full max-w-sm border rounded-xl p-6 bg-stone-950 lg:bg-amber-900/10 border-white/10 overflow-hidden transition-all duration-200",
          {
            "opacity-0 pointer-events-none translate-y-full": modelLoaded,
          }
        )}
      >
        <p className="text-sm text-left mb-4 uppercase font-medium">
          {statusText}
        </p>
        <div className="bg-gray-200 h-2.5 w-full rounded-full overflow-hidden">
          <div
            className="from-amber-500 to-orange-500 bg-gradient-to-r h-full"
            style={{ width: `${100 * progress}%` }}
          ></div>
        </div>
      </div>
    </main>
  );
};
