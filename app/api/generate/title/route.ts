import { NextRequest } from "next/server";

export async function POST(
  request: NextRequest,
) {
  const { prompt } = await request.json();

  const response = await fetch("https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-orpo-141b-A35b-v0.1", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.HF_TOKEN}`,
      'Content-Type': 'application/json',
      ['x-use-cache']: "0"
    },
    body: JSON.stringify({
      // inputs: `Generate and return only a music title based on the following prompt: ${prompt}`,
      inputs: `Generate a music title in Russian language based on the following prompt: ${prompt}, return only the title between quotes.`,
      parameters: {
        num_return_sequences: 1,
        return_full_text: false,
        do_sample: false,
      }
    }),
  })
  .then((response: any) => {
    if (response.status !== 200) return Response.json({ status: 500, ok: false, message: response.statusText })

    return response.json()
  })
  .then((response) => {
    let title = response?.[0]?.generated_text;
    // regex to keep only string between quotes
    title = title?.match(/"(.*?)"/)?.[0];
    
    return {
      title: title,
    }
  })
  .catch((error) => {
    return {
      error: error.message,
    }
  })

  if ("error" in response) {
    return Response.json({ status: 500, ok: false, message: response.error })
  }

  return Response.json({
    title: response?.title,
  })
  
}