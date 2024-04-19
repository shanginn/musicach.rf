import { useMemo, useState } from "react"
import { useUpdateEffect } from "react-use";

import { LENGTHS, STYLES, MOODS, MUSIC_PROMPTS } from "@/utils";

export const useGeneration = () => {
    const [form, setForm] = useState({
    prompt: "80s pop track with bassy drums and synth",
    length: LENGTHS[0].value,
    style: STYLES[5].value,
    mood: MOODS[4].value
  });
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{ cover: string | null, title: string | null }>({
    cover: null,
    title: null,
  });
  const [timeCoverGenerated, setTimeCoverGenerated] = useState(0);

  const formattedPrompt = useMemo(() => {
    const stylePrompt = STYLES.find((style) => style.value === form.style)?.prompt;
    const moodPrompt = MOODS.find((mood) => mood.value === form.mood)?.prompt;

    return `${form.prompt} ${stylePrompt} ${moodPrompt ?? ""}`;
  }, [form])

  useUpdateEffect(() => {
    if (results.cover && results.title) {
      setLoading(false);
    }
  }, [results])

  const generate = async () => {
    setLoading(true);
    let new_results = {
      cover: null,
      title: null,
      track: null
    }

    fetch("/api/generate/cover", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: formattedPrompt
      })
    }).then((res) => res.json())
    .then((res: any) => {
      new_results.cover = res.image
      setResults({
        ...new_results,
      })
    })

    // fetch("/api/generate/title", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     prompt: form.prompt
    //   })
    // }).then((res) => res.json())
    // .then((res: any) => {
    //   new_results.title = res.title
    //   setResults({
    //     ...new_results,
    //   })
    // })
  }

  const randomize = () => {
    setForm({
      length: LENGTHS[Math.floor(Math.random() * LENGTHS.length)].value,
      style: STYLES[Math.floor(Math.random() * STYLES.length)].value,
      mood: MOODS[Math.floor(Math.random() * MOODS.length)].value,
      prompt: MUSIC_PROMPTS[Math.floor(Math.random() * MUSIC_PROMPTS.length)]
    })
  }

  return {
    form,
    setForm,
    formattedPrompt,
    generate,
    results,
    loading,
    setResults,
    randomize
  }
}