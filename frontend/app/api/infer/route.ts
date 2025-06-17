import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI();

export async function POST(req: NextRequest) {
  const { prompt, model } = await req.json();

  if (!prompt || !model) {
    return NextResponse.json({ error: "Missing prompt or model" }, { status: 400 });
  }

  // Stream for OpenAI models
  if (model.startsWith("gpt-")) {
    const stream = await openai.chat.completions.create({
      model,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      stream: true,
    });

    const encoder = new TextEncoder();
    const streamBody = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content;
          if (content) controller.enqueue(encoder.encode(content));
        }
        controller.close();
      },
    });

    return new NextResponse(streamBody, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  }

  // HF fallback
  const hfRes = await fetch("http://localhost:8001/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, model }),
  });

  const data = await hfRes.json();
  return NextResponse.json({ result: data.result });
}
