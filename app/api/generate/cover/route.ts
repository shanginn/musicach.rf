import { NextRequest } from "next/server";

export async function POST(
  request: NextRequest,
) {
  const { prompt } = await request.json();

  const response = await fetch("https://api-inference.huggingface.co/models/CiroN2022/cd-md-music", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.HF_TOKEN}`,
      'Content-Type': 'application/json',
      ['x-use-cache']: "0"
    },
    body: JSON.stringify({
      inputs: prompt,
    }),
  })
  .then((response: any) => {
    if (response.status !== 200) return Response.json({ status: 500, ok: false, message: response.statusText })

    return response.arrayBuffer()
  })
  .then((response) => {
    return Buffer.from(response)
  })
  .catch((error) => {
    return {
      error: error.message,
    }
  })

  if ("error" in response) {
    return Response.json({ status: 500, ok: false, message: response.error })
  }

  // buffer to blob
  const image = Buffer.from(response).toString('base64')

  return Response.json({
    image: "data:image/png;base64," + image,
  })
  
}