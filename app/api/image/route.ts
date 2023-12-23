import { NextResponse } from "next/server";
import OpenAI from "openai";
// import { OpenAIStream, StreamingTextResponse } from "ai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

// EdgeランタイムはApp Routerと同じレスポンスタイプをサポートしているため
export const runtime = "edge";

export async function POST(req: Request) {
  // requestからpromptを抽出
  const { prompt, amount, resolution } = await req.json();
  if (!prompt) {
    return new NextResponse("Prompt are required", { status: 400 });
  }

  const response = await openai.images.generate({
    prompt,
    n: Number(amount),
    size: resolution,
  });

  return NextResponse.json(response);
}
